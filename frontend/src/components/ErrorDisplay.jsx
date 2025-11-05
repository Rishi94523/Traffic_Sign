/**
 * ErrorDisplay Component
 * Related Jira Tickets: RSCI-9, RSCI-14
 * 
 * Displays clear, user-friendly error messages for invalid uploads and API failures
 */

import React from 'react'
import './ErrorDisplay.css'

function ErrorDisplay({ error }) {
  if (!error) {
    return null
  }

  // RSCI-9: Show clear error messages for invalid uploads
  // RSCI-14: Show error message when API fails

  return (
    <div className="error-display" role="alert" aria-live="polite">
      <div className="error-container">
        <div className="error-icon-wrapper">
          <span className="error-icon" aria-hidden="true">⚠️</span>
        </div>
        <div className="error-content">
          <h4 className="error-title">Upload Error</h4>
          <p className="error-message">{error}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorDisplay

