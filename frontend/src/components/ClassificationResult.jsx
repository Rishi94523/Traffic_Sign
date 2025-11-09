/**
 * ClassificationResult Component - Brutalist Design
 * Related Jira Tickets: RSCI-12, RSCI-13
 * 
 * Displays classification results with confidence scores in brutalist style
 */

import React, { useState, useEffect } from 'react'
import './ClassificationResult.css'

function ClassificationResult({ result }) {
  const [processingTime, setProcessingTime] = useState(null)
  const [confidenceBarWidth, setConfidenceBarWidth] = useState(0)

  useEffect(() => {
    // Simulate processing time
    const startTime = Date.now()
    const timer = setTimeout(() => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)
      setProcessingTime(`PROCESSED IN ${elapsed}S`)
    }, 100)

    // Animate confidence bar
    const confidence = result?.confidence || 0
    const targetWidth = (confidence * 100).toFixed(1)
    setTimeout(() => {
      setConfidenceBarWidth(targetWidth)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [result])

  if (!result) {
    return null
  }

  const classification = result.classification || 'UNKNOWN'
  const confidence = result.confidence || 0
  const allClasses = result.all_classes || []
  
  const confidencePercentage = (confidence * 100).toFixed(1)

  return (
    <div className="classification-result">
      <div className="brutal-card">
        {/* Results Header */}
        <div className="brutal-card-header">
          <h2 className="brutal-card-title">CLASSIFICATION RESULTS</h2>
          {processingTime && (
            <div className="brutal-processing-time">{processingTime}</div>
          )}
        </div>

        {/* Result Card */}
        <div className="brutal-result-card">
          <div className="brutal-result-grid">
            {/* Predicted Sign */}
            <div className="brutal-predicted-sign">
              <div className="brutal-result-label">PREDICTED SIGN</div>
              <div className="brutal-sign-value">{classification.toUpperCase()}</div>
            </div>

            {/* Confidence Score */}
            <div className="brutal-confidence-card">
              <div className="brutal-result-label">CONFIDENCE SCORE</div>
              <div className="brutal-confidence-value">{confidencePercentage}%</div>
              <div className="brutal-confidence-bar-container">
                <div 
                  className="brutal-confidence-bar-fill"
                  style={{ width: `${confidenceBarWidth}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          {allClasses && allClasses.length > 0 && (
            <div className="brutal-detailed-results">
              <h3 className="brutal-details-title">DETAILED BREAKDOWN</h3>
              <div className="brutal-predictions-list">
                {allClasses.map((prediction, index) => {
                  const predConfidence = (prediction.confidence * 100).toFixed(1)
                  return (
                    <div key={index} className="brutal-prediction-item">
                      <div className="brutal-prediction-sign">{prediction.sign.toUpperCase()}</div>
                      <div className="brutal-prediction-bar-container">
                        <div 
                          className="brutal-prediction-bar-fill"
                          style={{ width: `${predConfidence}%` }}
                        ></div>
                      </div>
                      <div className="brutal-prediction-confidence">{predConfidence}%</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClassificationResult
