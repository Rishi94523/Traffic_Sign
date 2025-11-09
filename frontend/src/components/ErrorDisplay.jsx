/**
 * ErrorDisplay Component - Brutalist Design
 * Related Jira Ticket: RSCI-9, RSCI-14
 * 
 * Displays error messages with brutalist styling
 */

import React from 'react'
import './ErrorDisplay.css'

function ErrorDisplay({ error }) {
  if (!error) {
    return null
  }

  return (
    <div className="error-display">
      <div className="error-message">
        <div className="error-title">ERROR</div>
        <div className="error-text">{error}</div>
      </div>
    </div>
  )
}

export default ErrorDisplay
