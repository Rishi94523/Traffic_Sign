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
        # TODO (RSCI-10): Implement stubbed model classification
        # - Use stubbed/fake model to generate predictions
        # - Return format: {"classification": "Sign Name", "confidence": 0.95, "all_classes": [...]}
        pass
    
    def get_classification_history(self) -> List[Dict]:
        """
        Get classification history (stubbed).
        Jira Ticket: RSCI-14
        """
        # Placeholder - will be implemented with actual data storage
        return []


# Global instance
classification_service = StubbedClassificationService()

