"""
Validation Service
Related Jira Tickets: RSCI-6, RSCI-7

This module handles file validation for uploaded images.
TODO: Implement validation logic per Jira tickets
"""

from fastapi import UploadFile, HTTPException
from typing import Tuple
import os

# Allowed file extensions for RSCI-6: JPG and PNG only
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}

# Allowed MIME types for RSCI-6: JPG and PNG only
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png"}


def validate_file_type(file: UploadFile) -> bool:
    """
    Validate file type - restrict to JPG and PNG only.
    Jira Ticket: RSCI-6
    
    Args:
        file: Uploaded file
        
    Returns:
        bool: True if file type is valid (JPG or PNG)
        
    Raises:
        HTTPException: If file type is invalid
    """
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is required for file type validation"
        )
    
    # Check file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Only JPG and PNG formats are allowed. Received: {file_ext}"
        )
    
    # Check MIME type if provided
    if file.content_type and file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid MIME type. Only image/jpeg and image/png are allowed. Received: {file.content_type}"
        )
    
    return True


def validate_file_size(file: UploadFile) -> bool:
    """
    Validate file size - reject if larger than 10 MB.
    Jira Ticket: RSCI-7
    
    Args:
        file: Uploaded file
        
    Returns:
        bool: True if file size is valid (< 10MB)
        
    Raises:
        HTTPException: If file size exceeds 10MB
    """
    # TODO (RSCI-7): Implement file size validation
    # - Read file content to get size
    # - Check if size is less than 10 MB (10 * 1024 * 1024 bytes)
    # - Raise HTTPException with appropriate error message if too large
    pass


def validate_image(file: UploadFile) -> Tuple[bool, str]:
    """
    Comprehensive image validation.
    Combines file type and size validation.
    
    Args:
        file: Uploaded file
        
    Returns:
        Tuple[bool, str]: (is_valid, error_message)
    """
    try:
        validate_file_type(file)
        # TODO: Call validate_file_size when RSCI-7 is implemented
        # validate_file_size(file)
        return True, ""
    except HTTPException as e:
        return False, e.detail
    except Exception as e:
        return False, f"Validation error: {str(e)}"

