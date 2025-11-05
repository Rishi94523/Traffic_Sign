/**
 * ClassificationResult Component
 * Related Jira Tickets: RSCI-12, RSCI-13
 * 
 * Displays classification results with confidence scores
 */

import React from 'react'
import './ClassificationResult.css'

function ClassificationResult({ result }) {
  if (!result) {
    return null
  }

  // TODO (RSCI-12): Display predicted sign name on UI
  // TODO (RSCI-13): Display confidence score
  
  // Placeholder - implement result display
  // - Extract classification, confidence, and all_classes from result
  // - Display the predicted sign name
  // - Display confidence score (as percentage)
  // - Optionally display all predictions with their confidence scores

  return (
    <div className="classification-result">
      <div className="result-container">
        <h3>Classification Result</h3>
        {/* TODO (RSCI-12): Add UI to display predicted sign name */}
        {/* TODO (RSCI-13): Add UI to display confidence score */}
      </div>
    </div>
  )
}

export default ClassificationResult

