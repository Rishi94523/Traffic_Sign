/**
 * ErrorDisplay Component
 * Related Jira Tickets: RSCI-9, RSCI-14
 * 
 * Displays error messages to the user
 */

import React from 'react'
import './ErrorDisplay.css'

function ErrorDisplay({ error }) {
  if (!error) {
    return null
  }

  // TODO (RSCI-9): Show clear error messages for invalid uploads
  // TODO (RSCI-14): Show error message when API fails
  
  // Placeholder - implement error display
  // - Display error message to user
  // - Style appropriately to make it clear this is an error

  return (
    <div className="error-display">
      <div className="error-container">
        {/* TODO: Add error icon and message display */}
        <p>{error}</p>
      </div>
    </div>
  )
}

export default ErrorDisplay

