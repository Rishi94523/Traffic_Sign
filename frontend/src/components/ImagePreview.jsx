/**
 * ImagePreview Component
 * Related Jira Ticket: RSCI-8
 * 
 * Displays uploaded image preview and triggers classification
 */

import React from 'react'
import { classifyImage } from '../api/classificationAPI'
import './ImagePreview.css'

function ImagePreview({ image, onClassify, onError, loading, setLoading }) {
  const handleClassify = async () => {
    if (!image || !image.file) {
      onError('No image available for classification')
      return
    }

    // TODO (RSCI-8): Display uploaded image preview
    // TODO (RSCI-10): Send image to API for classification
    // TODO (RSCI-11): Show loading spinner while waiting for API
    // TODO (RSCI-14): Show error message when API fails
    
    // Placeholder - implement actual classification logic
    // - Set loading state (setLoading(true))
    // - Call classifyImage API
    // - Handle success (call onClassify with result)
    // - Handle error (call onError with error message)
    // - Set loading state to false when done
  }

  return (
    <div className="image-preview">
      <div className="preview-container">
        <h3>Image Preview</h3>
        {/* TODO (RSCI-8): Display the uploaded image preview */}
        <div className="preview-image-wrapper">
          {/* Add img tag here to display image.preview */}
        </div>
        {/* TODO (RSCI-11): Add loading spinner component */}
        <button 
          className="classify-button"
          onClick={handleClassify}
          disabled={loading}
        >
          {loading ? 'Classifying...' : 'Classify Image'}
        </button>
      </div>
    </div>
  )
}

export default ImagePreview

