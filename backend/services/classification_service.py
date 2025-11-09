"""
Classification Service
Related Jira Ticket: RSCI-10

This module handles classification logic. It supports a Gemini integration
when the GEMINI_API environment variable is set, and falls back to the
stubbed logic otherwise.
"""

from __future__ import annotations

import base64
import json
import logging
import os
import random
import re
from typing import Dict, List, Optional

import requests

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        "[%(asctime)s] [%(levelname)s] %(name)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.propagate = False


class StubbedClassificationService:
    """
    Stubbed classification service that returns fake predictions.
    This will be replaced with actual ML model integration in RSCI-10.
    """

    # Fake traffic sign classes for demonstration
    TRAFFIC_SIGNS = [
        "Speed Limit 20",
        "Speed Limit 30",
        "Speed Limit 40",
        "Speed Limit 50",
        "Speed Limit 60",
        "Speed Limit 70",
        "Speed Limit 80",
        "Stop",
        "Yield",
        "No Entry",
        "No Parking",
        "Roundabout",
        "Pedestrian Crossing",
        "School Zone",
        "Construction Ahead",
    ]

    def classify(self, image_data: bytes, mime_type: Optional[str] = None) -> Dict:
        """
        Classify a road sign image using a deterministic stubbed model.

        Args:
            image_data: Image file bytes
            mime_type: Optional mime type (unused in stub, present for parity)

        Returns:
            Dict with classification results containing:
            - classification: predicted sign name (string)
            - confidence: confidence score (float 0-1)
            - all_classes: list of all predictions with confidence scores
        """
        if not image_data or len(image_data) == 0:
            raise ValueError("Image data is empty")

        # Generate fake predictions with confidence scores
        num_predictions = min(5, len(self.TRAFFIC_SIGNS))
        selected_signs = random.sample(self.TRAFFIC_SIGNS, num_predictions)

        all_classes: List[Dict[str, float]] = []
        remaining_confidence = 1.0

        for i, sign in enumerate(selected_signs):
            if i == num_predictions - 1:
                confidence = remaining_confidence
            else:
                confidence = random.uniform(0.05, min(0.4, remaining_confidence * 0.8))
                remaining_confidence -= confidence

            all_classes.append({"sign": sign, "confidence": round(confidence, 3)})

        all_classes.sort(key=lambda x: x["confidence"], reverse=True)

        top_prediction = all_classes[0]

        return {
            "classification": top_prediction["sign"],
            "confidence": top_prediction["confidence"],
            "all_classes": all_classes,
        }

    def get_classification_history(self) -> List[Dict]:
        """
        Get classification history (stubbed).
        Jira Ticket: RSCI-14
        """
        return []


class GeminiClassificationService:
    """
    Classification service that leverages Google Gemini API.
    """

    DEFAULT_MODEL = "models/gemini-2.0-flash"

    def __init__(self, api_key: str, model: str = DEFAULT_MODEL):
        self.api_key = api_key
        self.model = model
        self.endpoint = f"https://generativelanguage.googleapis.com/v1beta/{model}:generateContent"

    def classify(self, image_data: bytes, mime_type: Optional[str]) -> Dict:
        if not image_data:
            raise ValueError("Image data is empty")

        if not mime_type:
            mime_type = "image/jpeg"

        image_base64 = base64.b64encode(image_data).decode("utf-8")

        prompt = (
            "You are an expert road-sign classification system. "
            "Return a JSON object exactly in the following format:\n"
            '{"predictions": [{"label": "Speed Limit 60", "confidence": 0.95}, '
            '{"label": "Speed Limit 50", "confidence": 0.03}, {"label": "Yield", "confidence": 0.02}]}\n'
            "Rules:\n"
            "- Provide between 3 and 5 predictions ordered from highest to lowest confidence.\n"
            "- Confidence values must be decimals between 0 and 1.\n"
            "- Labels must be concise road-sign names.\n"
            "- Return JSON only, do not include code fences or additional commentary."
        )

        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {"text": prompt},
                        {
                            "inlineData": {
                                "mimeType": mime_type,
                                "data": image_base64,
                            }
                        },
                    ],
                }
            ],
        }

        response = requests.post(
            self.endpoint,
            params={"key": self.api_key},
            json=payload,
            timeout=45,
        )
        response.raise_for_status()
        data = response.json()

        try:
            text = (
                data["candidates"][0]["content"]["parts"][0].get("text", "")
                if data.get("candidates")
                else ""
            )
        except (IndexError, KeyError) as exc:
            raise ValueError(f"Gemini response missing candidates: {exc}") from exc

        logger.info(
            "Gemini classification request successful (response tokens: %s)",
            data.get("usageMetadata", {}).get("candidatesTokenCount", "n/a"),
        )

        predictions = self._parse_predictions(text)
        if not predictions:
            raise ValueError("Gemini did not return any predictions.")

        # Sort predictions by confidence (descending)
        predictions.sort(key=lambda item: item.get("confidence", 0.0), reverse=True)
        top_prediction = predictions[0]

        return {
            "classification": top_prediction["label"],
            "confidence": top_prediction["confidence"],
            "all_classes": predictions,
        }

    @staticmethod
    def _parse_predictions(text: str) -> List[Dict]:
        """
        Attempt to parse predictions from Gemini response text.
        """
        if not text:
            return []

        cleaned = text.strip()
        # Remove code fences if present
        cleaned = re.sub(r"```(?:json)?", "", cleaned).strip()

        try:
            payload = json.loads(cleaned)
        except json.JSONDecodeError:
            # Attempt to extract JSON substring
            match = re.search(r"\{.*\}", cleaned, re.DOTALL)
            if not match:
                logger.debug("Failed to parse Gemini response: %s", cleaned)
                return []
            payload = json.loads(match.group(0))

        predictions = payload.get("predictions", [])
        normalised: List[Dict] = []
        for item in predictions:
            label = item.get("label") or item.get("sign") or item.get("name")
            confidence = item.get("confidence")
            if label is None or confidence is None:
                continue
            try:
                confidence_value = float(confidence)
            except (TypeError, ValueError):
                continue
            confidence_value = max(0.0, min(1.0, confidence_value))
            normalised.append(
                {"sign": label, "label": label, "confidence": round(confidence_value, 3)}
            )

        return normalised


class UnifiedClassificationService:
    """
    Unified service that prefers Gemini integration when available.
    """

    def __init__(self):
        self.stub = StubbedClassificationService()
        api_key = os.environ.get("GEMINI_API")
        self.gemini: Optional[GeminiClassificationService] = None

        if api_key:
            self.gemini = GeminiClassificationService(api_key=api_key)
            logger.info("Gemini classification enabled.")
        else:
            logger.info("GEMINI_API not set. Using stubbed classification service.")

    def classify(self, image_data: bytes, mime_type: Optional[str] = None) -> Dict:
        if self.gemini:
            try:
                logger.info(
                    "Sending image to Gemini model '%s' (size=%d bytes)",
                    self.gemini.model,
                    len(image_data) if image_data else 0,
                )
                return self.gemini.classify(image_data, mime_type)
            except Exception as exc:  # broad catch to avoid breaking API
                logger.warning(
                    "Gemini classification failed (%s). Falling back to stubbed results.",
                    exc,
                )

        return self.stub.classify(image_data, mime_type=mime_type)

    def get_classification_history(self) -> List[Dict]:
        return self.stub.get_classification_history()


# Global instance
classification_service = UnifiedClassificationService()
