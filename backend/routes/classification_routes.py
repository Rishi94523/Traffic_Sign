"""
Classification Routes
Related Jira Tickets: RSCI-10, RSCI-12, RSCI-13, RSCI-14

This module handles classification endpoints for road sign images.
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from services.validation_service import validate_file_type, validate_file_size
from services.classification_service import classification_service
from services.error_messages import get_error_message

router = APIRouter()


@router.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    """
    Send validated image to API for classification.
    
    Jira Ticket: RSCI-10
    
    This endpoint:
    - Accepts image file upload
    - Validates the image (type and size)
    - Sends image data to classification service
    - Returns classification results with confidence scores
    
    Args:
        file: Uploaded image file (JPG or PNG, max 10MB)
        
    Returns:
        JSONResponse with classification results:
        - classification: predicted sign name
        - confidence: confidence score (0-1)
        - all_classes: list of all predictions with confidence scores
    """
    try:
        # Validate image file (type and size)
        validate_file_type(file)
        validate_file_size(file)
        
        # Ensure file pointer is at the beginning (validate_file_size resets it, but being explicit)
        # Read image data - validation already verified the file is valid
        # Use async read for consistency with FastAPI
        image_data = await file.read()
        
        # Validate that image data is not empty (additional check after reading)
        if not image_data or len(image_data) == 0:
            error_msg = get_error_message("EMPTY_FILE")
            raise HTTPException(status_code=400, detail=error_msg)
        
        # Classify image using classification service
        result = classification_service.classify(
            image_data, mime_type=file.content_type
        )
        
        # Return classification results
        return JSONResponse(
            status_code=200,
            content={
                "classification": result["classification"],
                "confidence": result["confidence"],
                "all_classes": result["all_classes"],
                "filename": file.filename
            }
        )
        
    except HTTPException as e:
        # Re-raise HTTP exceptions (validation errors)
        raise e
    except ValueError as e:
        # Handle classification service errors
        error_msg = get_error_message("GENERIC_VALIDATION_ERROR")
        raise HTTPException(status_code=400, detail=f"{error_msg}: {str(e)}")
    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(
            status_code=500,
            detail=f"Classification failed: {str(e)}"
        )


@router.get("/results/{image_id}")
async def get_classification_result(image_id: str):
    """
    Get classification results for a specific image.
    
    Jira Tickets: RSCI-12, RSCI-13
    
    TODO: Implement result retrieval
    - Fetch stored classification results (RSCI-12)
    - Format results for display (RSCI-13)
    """
    # Placeholder implementation
    return JSONResponse(
        status_code=200,
        content={
            "image_id": image_id,
            "classification": "Speed Limit 60",
            "confidence": 0.95,
            "status": "completed"
        }
    )


@router.get("/history")
async def get_classification_history():
    """
    Get classification history.
    Jira Ticket: RSCI-14
    """
    # Placeholder implementation
    return JSONResponse(
        status_code=200,
        content={
            "history": []
        }
    )

