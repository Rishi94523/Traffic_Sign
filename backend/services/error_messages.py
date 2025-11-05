"""
Error Messages Service
Related Jira Ticket: RSCI-9

This module provides standardized, user-friendly error messages for upload validation.
"""

# Error message constants for consistent messaging
ERROR_MESSAGES = {
    "INVALID_FILE_TYPE": "Invalid file type. Only JPG and PNG image formats are allowed.",
    "INVALID_FILE_EXTENSION": "Invalid file extension. Please upload a file with .jpg, .jpeg, or .png extension.",
    "INVALID_MIME_TYPE": "Invalid file format. The file must be a JPEG or PNG image.",
    "FILE_TOO_LARGE": "File size exceeds the maximum allowed size of 10 MB. Please upload a smaller image.",
    "MISSING_FILENAME": "Filename is required. Please ensure your file has a name.",
    "GENERIC_VALIDATION_ERROR": "File validation failed. Please check that your file is a valid JPG or PNG image under 10 MB.",
}

def get_error_message(error_type: str, details: dict = None) -> str:
    """
    Get a user-friendly error message based on error type.
    
    Args:
        error_type: Type of error (key from ERROR_MESSAGES)
        details: Optional dictionary with additional details (e.g., file_size, file_type)
        
    Returns:
        str: User-friendly error message
    """
    base_message = ERROR_MESSAGES.get(error_type, ERROR_MESSAGES["GENERIC_VALIDATION_ERROR"])
    
    if details:
        # Add file size details if provided
        if "file_size_mb" in details:
            base_message += f" (File size: {details['file_size_mb']:.2f} MB)"
        if "file_type" in details:
            base_message += f" (Received: {details['file_type']})"
    
    return base_message

