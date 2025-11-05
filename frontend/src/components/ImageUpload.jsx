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

    // Basic client-side validation and preview generation (RSCI-4, RSCI-8)
    // RSCI-6: Restrict to JPG and PNG only
    const allowedTypes = ['image/jpeg', 'image/png']
    const maxSizeBytes = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      onError && onError('Invalid file type. Only JPG and PNG formats are allowed.')
      return
    }

    if (file.size > maxSizeBytes) {
      onError && onError('File too large. Please upload an image under 10MB.')
      return
    }

    // Create a preview URL so ImagePreview can display a thumbnail
    const previewUrl = URL.createObjectURL(file)

    onUpload && onUpload({ file, preview: previewUrl, name: file.name, type: file.type, size: file.size })
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
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
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

