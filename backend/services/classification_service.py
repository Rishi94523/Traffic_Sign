"""
Classification Service
Related Jira Ticket: RSCI-10

This module handles classification logic using a stubbed ML model.
"""

from typing import Dict, List
import random


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
        "Construction Ahead"
    ]
    
    def classify(self, image_data: bytes) -> Dict:
        """
        Classify a road sign image using stubbed model.
        
        Jira Ticket: RSCI-10
        
        Args:
            image_data: Image file bytes
            
        Returns:
            Dict with classification results containing:
            - classification: predicted sign name (string)
            - confidence: confidence score (float 0-1)
            - all_classes: list of all predictions with confidence scores
        """
        # Stubbed model classification - generates fake predictions
        # This will be replaced with actual ML model integration in RSCI-10
        
        if not image_data or len(image_data) == 0:
            raise ValueError("Image data is empty")
        
        # Generate fake predictions with confidence scores
        num_predictions = min(5, len(self.TRAFFIC_SIGNS))
        selected_signs = random.sample(self.TRAFFIC_SIGNS, num_predictions)
        
        # Create predictions with confidence scores (summing to ~1.0)
        all_classes = []
        remaining_confidence = 1.0
        
        for i, sign in enumerate(selected_signs):
            if i == num_predictions - 1:
                # Last prediction gets remaining confidence
                confidence = remaining_confidence
            else:
                # Random confidence between 0.05 and remaining_confidence
                confidence = random.uniform(0.05, min(0.4, remaining_confidence * 0.8))
                remaining_confidence -= confidence
            
            all_classes.append({
                "sign": sign,
                "confidence": round(confidence, 3)
            })
        
        # Sort by confidence (descending)
        all_classes.sort(key=lambda x: x["confidence"], reverse=True)
        
        # Get top prediction
        top_prediction = all_classes[0]
        
        return {
            "classification": top_prediction["sign"],
            "confidence": top_prediction["confidence"],
            "all_classes": all_classes
        }
    
    def get_classification_history(self) -> List[Dict]:
        """
        Get classification history (stubbed).
        Jira Ticket: RSCI-14
        """
        # Placeholder - will be implemented with actual data storage
        return []


# Global instance
classification_service = StubbedClassificationService()

