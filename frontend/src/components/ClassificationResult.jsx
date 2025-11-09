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
  
  // RSCI-13: Determine confidence level and styling
  const getConfidenceLevel = (conf) => {
    if (conf >= 0.8) return { level: 'high', label: 'High Confidence', icon: '✓', colorClass: 'confidence-high' }
    if (conf >= 0.5) return { level: 'medium', label: 'Medium Confidence', icon: '⚠', colorClass: 'confidence-medium' }
    return { level: 'low', label: 'Low Confidence', icon: '⚠', colorClass: 'confidence-low' }
  }
  
  const confidenceInfo = getConfidenceLevel(confidence)

  return (
    <div className="classification-result">
      <div className="result-container">
        <h3>Classification Result</h3>
        
        {/* RSCI-12: Display predicted sign name prominently */}
        <div className="primary-result">
          <div className="result-label">Predicted Sign</div>
          <div className="result-value">{classification}</div>
          
          {/* RSCI-13: Display confidence score prominently with level indicator */}
          <div className={`confidence-section ${confidenceInfo.colorClass}`}>
            <div className="confidence-header">
              <div className="confidence-info">
                <div className="confidence-label">Model Confidence</div>
                <div className="confidence-percentage">{confidencePercentage}%</div>
              </div>
              <div className={`confidence-badge ${confidenceInfo.colorClass}`}>
                <span className="confidence-icon">{confidenceInfo.icon}</span>
                <span className="confidence-level-text">{confidenceInfo.label}</span>
              </div>
            </div>
            <div className="confidence-bar-wrapper">
              <div className={`confidence-bar ${confidenceInfo.colorClass}`}>
                <div 
                  className={`confidence-fill ${confidenceInfo.colorClass}`}
                  style={{ width: `${confidencePercentage}%` }}
                />
              </div>
              <div className="confidence-help-text">
                This indicates how confident the model is about this prediction. Higher confidence means more reliable results.
              </div>
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

