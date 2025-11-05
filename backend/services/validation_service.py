"""
Validation Service
Related Jira Tickets: RSCI-6, RSCI-7

This module handles file validation for uploaded images.
TODO: Implement validation logic per Jira tickets
"""

from fastapi import UploadFile, HTTPException
from typing import Tuple
import os
from services.error_messages import get_error_message, ERROR_MESSAGES

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
        error_msg = get_error_message("MISSING_FILENAME")
        raise HTTPException(
            status_code=400,
            detail=error_msg
        )
    
    # Check file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        error_msg = get_error_message("INVALID_FILE_EXTENSION", {"file_type": file_ext})
        raise HTTPException(
            status_code=400,
            detail=error_msg
        )
    
    # Check MIME type if provided
    if file.content_type and file.content_type not in ALLOWED_MIME_TYPES:
        error_msg = get_error_message("INVALID_MIME_TYPE", {"file_type": file.content_type})
        raise HTTPException(
            status_code=400,
            detail=error_msg
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
    MAX_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB
    
    # Read file content to get size
    content = file.file.read()
    file_size = len(content)
    
    # Reset file pointer for potential future reads
    file.file.seek(0)
    
    # Check if size is less than 10 MB
    if file_size > MAX_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"File size ({file_size / (1024 * 1024):.2f} MB) exceeds maximum allowed size of 10 MB"
        )
    
    return True


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

