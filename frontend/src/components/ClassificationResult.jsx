/**
 * ClassificationResult Component
 * Related Jira Tickets: RSCI-12, RSCI-13
 * 
 * Displays classification results with confidence scores.
 * Shows the predicted sign name prominently so users can understand the classification result.
 */

import React from 'react'
import './ClassificationResult.css'

function ClassificationResult({ result }) {
  if (!result) {
    return null
  }

  // Extract classification data from result
  const classification = result.classification || 'Unknown'
  const confidence = result.confidence || 0
  const allClasses = result.all_classes || []
  
  // Convert confidence to percentage
  const confidencePercentage = (confidence * 100).toFixed(1)

  return (
    <div className="classification-result">
      <div className="result-container">
        <h3>Classification Result</h3>
        
        {/* RSCI-12: Display predicted sign name prominently */}
        <div className="primary-result">
          <div className="result-label">Predicted Sign</div>
          <div className="result-value">{classification}</div>
          
          {/* RSCI-13: Display confidence score with visual bar */}
          <div className="confidence-bar-wrapper">
            <div className="confidence-label">
              Confidence: {confidencePercentage}%
            </div>
            <div className="confidence-bar">
              <div 
                className="confidence-fill" 
                style={{ width: `${confidencePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Optional: Display all predictions with confidence scores */}
        {allClasses && allClasses.length > 0 && (
          <div className="all-classes">
            <h4>All Predictions</h4>
            <div className="predictions-list">
              {allClasses.map((prediction, index) => {
                const predConfidence = (prediction.confidence * 100).toFixed(1)
                return (
                  <div key={index} className="prediction-item">
                    <div className="prediction-sign">{prediction.sign}</div>
                    <div className="prediction-bar">
                      <div 
                        className="prediction-fill" 
                        style={{ width: `${predConfidence}%` }}
                      />
                    </div>
                    <div className="prediction-confidence">{predConfidence}%</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassificationResult

