/**
 * LoadingSpinner Component
 * Related Jira Ticket: RSCI-11
 * 
 * Shows loading spinner while waiting for API response
 */

import React from 'react'
import './LoadingSpinner.css'

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-spinner" data-testid="loading-spinner">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner

