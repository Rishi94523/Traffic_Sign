/**
 * ImageUpload Component - Brutalist Design
 * Related Jira Tickets: RSCI-4, RSCI-16
 * 
 * Handles image file upload functionality with drag-and-drop support
 */

import React, { useRef, useState } from 'react'
import './ImageUpload.css'
import { formatErrorMessage } from '../utils/errorMessages'

function ImageUpload({ onUpload, onError, loading, setLoading }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const processFile = (file) => {
    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']
    const maxSizeBytes = 10 * 1024 * 1024 // 10MB
    const minSizeBytes = 1

    if (!file.name || file.name.trim() === '') {
      const errorMsg = formatErrorMessage('Filename is required. Please ensure your file has a name.')
      onError && onError(errorMsg)
      return
    }
    
    if (file.size < minSizeBytes) {
      const errorMsg = formatErrorMessage('The uploaded file is empty. Please upload a valid image file.')
      onError && onError(errorMsg)
      return
    }
    
    if (!allowedTypes.includes(file.type)) {
      const errorMsg = formatErrorMessage('Invalid file type. Only JPG and PNG formats are allowed.')
      onError && onError(errorMsg)
      return
    }

    if (file.size > maxSizeBytes) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
      const errorMsg = formatErrorMessage(`File size (${fileSizeMB} MB) exceeds the maximum allowed size of 10 MB. Please upload an image under 10MB.`)
      onError && onError(errorMsg)
      return
    }

    const previewUrl = URL.createObjectURL(file)
    onUpload && onUpload({ file, preview: previewUrl, name: file.name, type: file.type, size: file.size })
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    processFile(file)
  }

  const handleClick = () => {
    if (!loading) {
      fileInputRef.current?.click()
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!loading) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)

    if (loading) {
      return
    }

    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      processFile(file)
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
      
      {/* Upload Area */}
      <div className="mb-6">
        <div 
          className={`upload-area ${isDragging ? 'drag-over' : ''}`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="upload-icon">📁</div>
            <div>
              <div className="upload-text">
                {loading ? 'PROCESSING...' : isDragging ? 'DROP IMAGE HERE' : 'DRAG & DROP IMAGE HERE'}
              </div>
              <div className="upload-hint">OR CLICK TO UPLOAD</div>
            </div>
          </div>
        </div>
        
        {/* File Type Notice */}
        <div className="upload-notice">
          <p className="upload-notice-text">
            SUPPORTED FORMATS: JPG, JPEG, PNG (MAX 10 MB)
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
