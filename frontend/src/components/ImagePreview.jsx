/**
 * ImagePreview Component
 * Related Jira Ticket: RSCI-8
 * 
 * Displays uploaded image preview and triggers classification
 */

import React from 'react'
import { classifyImage } from '../api/classificationAPI'
import LoadingSpinner from './LoadingSpinner'
import './ImagePreview.css'

function ImagePreview({ image, onClassify, onError, loading, setLoading }) {
  const handleClassify = async () => {
    if (!image || !image.file) {
      if (onError) {
        onError('No image available for classification')
      }
      return
    }

    // RSCI-11: Set loading state to show spinner
    if (setLoading) {
      setLoading(true)
    }

    try {
      // RSCI-10: Call classification API
      const result = await classifyImage(image.file)
      
      // RSCI-12, RSCI-13: Handle successful classification
      if (onClassify) {
        onClassify(result)
      }
    } catch (error) {
      // RSCI-14: Handle errors with clear error messages
      if (onError) {
        onError(error.message || 'Failed to classify image')
      }
    } finally {
      // RSCI-11: Always set loading to false when done
      if (setLoading) {
        setLoading(false)
      }
    }
  }

  return (
    <div className="image-preview">
      <div className="preview-container">
        <h3>Image Preview</h3>
        <div className="preview-image-wrapper">
          {image && image.preview && (
            <img 
              src={image.preview} 
              alt="Uploaded road sign" 
              className="preview-image"
            />
          )}
        </div>
        
        {/* RSCI-11: Show loading spinner while waiting for API */}
        {loading && (
          <LoadingSpinner message="Classifying image..." />
        )}
        
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

