/**
 * LoadingSpinner Component
 * Related Jira Ticket: RSCI-11
 * 
 * Shows loading spinner while waiting for API response
 */

import React from 'react'
import './LoadingSpinner.css'

function LoadingSpinner({ message = 'Loading...' }) {
  // TODO (RSCI-11): Implement loading spinner UI
  // - Display a spinner/loading indicator
  // - Show optional loading message
  
  return (
    <div className="loading-spinner">
      {/* TODO: Add spinner component here */}
      <p>{message}</p>
    </div>
  )
}

export default LoadingSpinner

