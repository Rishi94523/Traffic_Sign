/**
 * ErrorDisplay Component
 * Related Jira Tickets: RSCI-9, RSCI-14
 * 
 * Displays clear, user-friendly error messages for invalid uploads and API failures
 */

import React from 'react'
import './ErrorDisplay.css'
import { getErrorType } from '../utils/errorMessages'

function ErrorDisplay({ error }) {
  if (!error) {
    return null
  }

  // RSCI-9: Show clear error messages for invalid uploads
  // RSCI-14: Show error message when API fails
  
  // Categorize error type for better UX
  const errorType = getErrorType(error)
  const errorTitle = errorType === 'file_type' 
    ? 'Invalid File Type' 
    : errorType === 'file_size' 
    ? 'File Too Large'
    : errorType === 'empty_file'
    ? 'Empty File'
    : errorType === 'corrupted_file'
    ? 'Corrupted File'
    : errorType === 'missing_filename'
    ? 'Missing Filename'
    : errorType === 'network_error'
    ? 'Network Error'
    : 'Upload Error'

  return (
    <div className="error-display" role="alert" aria-live="polite">
      <div className="error-container">
        <div className="error-icon-wrapper">
          <span className="error-icon" aria-hidden="true">⚠️</span>
        </div>
        <div className="error-content">
          <h4 className="error-title">{errorTitle}</h4>
          <p className="error-message">{error}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorDisplay

