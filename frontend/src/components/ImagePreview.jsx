/**
 * ImagePreview Component - Brutalist Design
 * Related Jira Ticket: RSCI-8
 * 
 * Displays uploaded image preview and triggers classification
 */

import React from 'react'
import { classifyImage } from '../api/classificationAPI'
import LoadingSpinner from './LoadingSpinner'
import './ImagePreview.css'

function ImagePreview({ image, onClassify, onError, loading, setLoading, onReset }) {
  const handleClassify = async () => {
    if (!image || !image.file) {
      if (onError) {
        onError('No image available for classification')
      }
      return
    }

    if (setLoading) {
      setLoading(true)
    }

    try {
      const result = await classifyImage(image.file)
      
      if (onClassify) {
        onClassify(result)
      }
    } catch (error) {
      if (onError) {
        onError(error.message || 'Failed to classify image')
      }
    } finally {
      if (setLoading) {
        setLoading(false)
      }
    }
  }

  return (
    <div className="image-preview">
      {/* Image Preview */}
      <div className="preview-container">
        <h3 className="preview-title">IMAGE PREVIEW</h3>
        <div className="preview-image-wrapper">
          {image && image.preview && (
            <img 
              src={image.preview} 
              alt="Uploaded road sign" 
              className="preview-image"
            />
          )}
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <LoadingSpinner message="PROCESSING IMAGE..." />
      )}

      {/* Upload Controls */}
      <div className="preview-controls">
        <button 
          className="classify-button"
          onClick={handleClassify}
          disabled={loading}
        >
          {loading ? 'CLASSIFYING...' : 'CLASSIFY IMAGE'}
        </button>
        <button 
          className="reset-button"
          onClick={onReset}
          disabled={loading}
        >
          RESET / NEW UPLOAD
        </button>
      </div>
    </div>
  )
}

export default ImagePreview
