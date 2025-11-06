"""
Tests for Upload Routes
Related Jira Ticket: RSCI-7
"""

import pytest
from fastapi.testclient import TestClient
from fastapi import UploadFile
from io import BytesIO
from app import app

client = TestClient(app)


def create_test_file(filename: str, content_size_bytes: int, content_type: str = "image/jpeg") -> tuple:
    """Helper function to create test file data"""
    content = b"x" * content_size_bytes
    return (filename, BytesIO(content), content_type)


def test_upload_rejects_file_over_10mb():
    """Test that upload endpoint rejects files over 10MB (RSCI-7)"""
    # Create an 11MB file
    file_data = create_test_file("large.jpg", 11 * 1024 * 1024)
    
    response = client.post(
        "/api/upload/",
        files={"file": file_data}
    )
    
    assert response.status_code == 413
    assert "10 MB" in response.json()["detail"]


def test_upload_accepts_file_under_10mb():
    """Test that upload endpoint accepts files under 10MB"""
    # Create a 5MB file
    file_data = create_test_file("small.jpg", 5 * 1024 * 1024)
    
    response = client.post(
        "/api/upload/",
        files={"file": file_data}
    )
    
    # Should accept (even if other parts not implemented)
    # Currently returns 200, but should not be 413 (size error)
    assert response.status_code != 413


def test_upload_accepts_file_exactly_10mb():
    """Test that upload endpoint accepts files exactly 10MB"""
    file_data = create_test_file("exact.jpg", 10 * 1024 * 1024)
    
    response = client.post(
        "/api/upload/",
        files={"file": file_data}
    )
    
    # Should not be rejected for size (413)
    assert response.status_code != 413

