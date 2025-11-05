"""
Tests for Validation Service
Related Jira Ticket: RSCI-7
"""

import pytest
from fastapi import UploadFile, HTTPException
from io import BytesIO
from services.validation_service import validate_file_size


def create_test_file(filename: str, content_size_bytes: int, content_type: str = "image/jpeg") -> UploadFile:
    """Helper function to create a test UploadFile"""
    content = b"x" * content_size_bytes
    file_obj = BytesIO(content)
    return UploadFile(
        filename=filename,
        file=file_obj,
        headers={"content-type": content_type}
    )


def test_validate_file_size_accepts_valid_size():
    """Test that files under 10MB are accepted"""
    # Create a 5MB file (under limit)
    file = create_test_file("test.jpg", 5 * 1024 * 1024)
    result = validate_file_size(file)
    assert result is True


def test_validate_file_size_accepts_exactly_10mb():
    """Test that files exactly 10MB are accepted"""
    file = create_test_file("test.jpg", 10 * 1024 * 1024)
    result = validate_file_size(file)
    assert result is True


def test_validate_file_size_rejects_over_10mb():
    """Test that files over 10MB are rejected (RSCI-7)"""
    # Create an 11MB file (over limit)
    file = create_test_file("test.jpg", 11 * 1024 * 1024)
    
    with pytest.raises(HTTPException) as exc_info:
        validate_file_size(file)
    
    assert exc_info.value.status_code == 413
    assert "10 MB" in exc_info.value.detail
    assert "exceeds" in exc_info.value.detail.lower()


def test_validate_file_size_rejects_just_over_limit():
    """Test that files just over 10MB are rejected"""
    # Create a file that's 10MB + 1 byte
    file = create_test_file("test.jpg", (10 * 1024 * 1024) + 1)
    
    with pytest.raises(HTTPException) as exc_info:
        validate_file_size(file)
    
    assert exc_info.value.status_code == 413


def test_validate_file_size_preserves_file_pointer():
    """Test that file pointer is reset after validation"""
    file = create_test_file("test.jpg", 5 * 1024 * 1024)
    
    # Read some content before validation
    initial_content = file.file.read(100)
    file.file.seek(0)
    
    # Validate
    validate_file_size(file)
    
    # File should be readable again (pointer reset)
    assert file.file.readable()

