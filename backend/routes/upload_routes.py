"""
Upload Routes
Related Jira Tickets: RSCI-4, RSCI-6, RSCI-7, RSCI-16

This module handles file upload endpoints for road sign images.
TODO: Implement upload functionality per Jira tickets
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    """
    Upload a road sign image for classification.
    
    Jira Tickets: RSCI-4, RSCI-16
    
    TODO (RSCI-4): Implement image upload from local device
    TODO (RSCI-6): Restrict uploads to JPG and PNG formats only
    TODO (RSCI-7): Reject images larger than 10 MB
    TODO (RSCI-16): Add drag-and-drop support
    
    Returns:
        JSONResponse with upload status and file info
    """
    # TODO: Implement upload logic
    # - Validate file type (JPG/PNG only - RSCI-6)
    # - Validate file size (< 10MB - RSCI-7)
    # - Handle file upload (RSCI-4)
    # - Return appropriate response
    return JSONResponse(
        status_code=501,
        content={
            "message": "Not implemented - RSCI-4, RSCI-6, RSCI-7, RSCI-16",
            "filename": file.filename if file.filename else "unknown"
        }
    )


@router.get("/status")
async def upload_status():
    """
    Check upload status
    Jira Ticket: RSCI-16
    
    TODO: Implement upload status tracking
    """
    # TODO: Implement status check logic
    return JSONResponse(
        status_code=501,
        content={"message": "Not implemented - RSCI-16"}
    )

