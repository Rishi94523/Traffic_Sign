/**
 * ImageUpload Component
 * Related Jira Tickets: RSCI-4, RSCI-16
 * 
 * Handles image file upload functionality
 */

import React, { useRef } from 'react'
import './ImageUpload.css'

function ImageUpload({ onUpload, onError, loading, setLoading }) {
  const fileInputRef = useRef(null)

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    
    if (!file) {
      return
    }

    // TODO (RSCI-4): Implement image upload from local device
    // TODO (RSCI-6): Validate file type - only allow JPG and PNG
    // TODO (RSCI-7): Validate file size - reject if > 10MB
    // TODO (RSCI-9): Show error messages for invalid uploads
    // TODO (RSCI-16): Add drag-and-drop functionality
    
    // Placeholder - implement actual upload logic
    // - Create preview URL using FileReader
    // - Call onUpload with file and preview data
    // - Call onError with appropriate message if validation fails
    
    // Temporary placeholder to prevent errors
    if (onError) {
      onError('Upload functionality not implemented yet - RSCI-4')
    }
  }

  const handleClick = () => {
    if (!loading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="image-upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
        disabled={loading}
      />
      
      <div 
        className="upload-area"
        onClick={handleClick}
        style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        <div className="upload-icon">📤</div>
        <p className="upload-text">
          {loading ? 'Processing...' : 'Click to upload or drag and drop'}
        </p>
        <p className="upload-hint">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  )
}

export default ImageUpload

