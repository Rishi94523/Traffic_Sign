/**
 * LoadingSpinner Component - Brutalist Design
 * Related Jira Ticket: RSCI-11
 * 
 * Shows loading spinner while waiting for API response
 */

import React, { useState, useEffect } from 'react'
import './LoadingSpinner.css'

function LoadingSpinner({ message = 'LOADING...' }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        return prev + Math.random() * 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading-spinner" data-testid="loading-spinner">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${Math.min(progress, 90)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
