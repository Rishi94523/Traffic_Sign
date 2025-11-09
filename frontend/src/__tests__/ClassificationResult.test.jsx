/**
 * Tests for ClassificationResult Component
 * Related Jira Ticket: RSCI-13
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ClassificationResult from '../components/ClassificationResult'

describe('ClassificationResult Component - RSCI-13', () => {
  test('displays high confidence score (≥80%) with green styling', () => {
    const result = {
      classification: 'Speed Limit 60',
      confidence: 0.95,
      all_classes: [
        { sign: 'Speed Limit 60', confidence: 0.95 },
        { sign: 'Speed Limit 50', confidence: 0.03 },
        { sign: 'Stop', confidence: 0.02 }
      ]
    }

    render(<ClassificationResult result={result} />)

    // Check confidence percentage in main section (use getAllByText and check first one)
    const confidencePercentages = screen.getAllByText('95.0%')
    expect(confidencePercentages.length).toBeGreaterThan(0)
    expect(confidencePercentages[0]).toBeInTheDocument()
    
    // Check confidence score label
    expect(screen.getByText('CONFIDENCE SCORE')).toBeInTheDocument()
    
    // Check classification is displayed (may appear multiple times in main result and predictions)
    const classifications = screen.getAllByText('SPEED LIMIT 60')
    expect(classifications.length).toBeGreaterThan(0)
  })

  test('displays medium confidence score (50-79%) with yellow/orange styling', () => {
    const result = {
      classification: 'Stop',
      confidence: 0.65,
      all_classes: [
        { sign: 'Stop', confidence: 0.65 },
        { sign: 'Yield', confidence: 0.25 },
        { sign: 'No Entry', confidence: 0.10 }
      ]
    }

    render(<ClassificationResult result={result} />)

    // Check confidence percentage (may appear multiple times, check first occurrence)
    const confidencePercentages = screen.getAllByText('65.0%')
    expect(confidencePercentages.length).toBeGreaterThan(0)
    
    // Check confidence score label
    expect(screen.getByText('CONFIDENCE SCORE')).toBeInTheDocument()
  })

  test('displays low confidence score (<50%) with red styling', () => {
    const result = {
      classification: 'Roundabout',
      confidence: 0.35,
      all_classes: [
        { sign: 'Roundabout', confidence: 0.35 },
        { sign: 'Pedestrian Crossing', confidence: 0.30 },
        { sign: 'School Zone', confidence: 0.35 }
      ]
    }

    render(<ClassificationResult result={result} />)

    // Check confidence percentage (may appear multiple times, check first occurrence)
    const confidencePercentages = screen.getAllByText('35.0%')
    expect(confidencePercentages.length).toBeGreaterThan(0)
    
    // Check confidence score label
    expect(screen.getByText('CONFIDENCE SCORE')).toBeInTheDocument()
  })

  test('displays confidence score label', () => {
    const result = {
      classification: 'Speed Limit 60',
      confidence: 0.85,
      all_classes: []
    }

    render(<ClassificationResult result={result} />)

    expect(screen.getByText('CONFIDENCE SCORE')).toBeInTheDocument()
  })

  test('displays all predictions with confidence scores', () => {
    const result = {
      classification: 'Speed Limit 60',
      confidence: 0.85,
      all_classes: [
        { sign: 'Speed Limit 60', confidence: 0.85 },
        { sign: 'Speed Limit 50', confidence: 0.10 },
        { sign: 'Stop', confidence: 0.05 }
      ]
    }

    render(<ClassificationResult result={result} />)

    // Check detailed breakdown is displayed
    expect(screen.getByText('DETAILED BREAKDOWN')).toBeInTheDocument()
    // Use getAllByText since "SPEED LIMIT 60" appears in both main result and predictions list
    const speedLimit60 = screen.getAllByText('SPEED LIMIT 60')
    expect(speedLimit60.length).toBeGreaterThan(0)
    expect(screen.getByText('SPEED LIMIT 50')).toBeInTheDocument()
    expect(screen.getByText('STOP')).toBeInTheDocument()
  })

  test('handles missing confidence gracefully', () => {
    const result = {
      classification: 'Speed Limit 60',
      confidence: 0,
      all_classes: []
    }

    render(<ClassificationResult result={result} />)

    // Should display 0.0%
    expect(screen.getByText('0.0%')).toBeInTheDocument()
    expect(screen.getByText('CONFIDENCE SCORE')).toBeInTheDocument()
  })

  test('handles edge case: exactly 80% confidence (high)', () => {
    const result = {
      classification: 'Speed Limit 60',
      confidence: 0.80,
      all_classes: []
    }

    render(<ClassificationResult result={result} />)

    expect(screen.getByText('80.0%')).toBeInTheDocument()
    expect(screen.getByText('CONFIDENCE SCORE')).toBeInTheDocument()
  })

  test('handles edge case: exactly 50% confidence (medium)', () => {
    const result = {
      classification: 'Speed Limit 60',
      confidence: 0.50,
      all_classes: []
    }

    render(<ClassificationResult result={result} />)

    expect(screen.getByText('50.0%')).toBeInTheDocument()
    expect(screen.getByText('CONFIDENCE SCORE')).toBeInTheDocument()
  })

  test('handles edge case: exactly 49.9% confidence (low)', () => {
    const result = {
      classification: 'Speed Limit 60',
      confidence: 0.499,
      all_classes: []
    }

    render(<ClassificationResult result={result} />)

    expect(screen.getByText('49.9%')).toBeInTheDocument()
    expect(screen.getByText('CONFIDENCE SCORE')).toBeInTheDocument()
  })

  test('returns null when result is not provided', () => {
    const { container } = render(<ClassificationResult result={null} />)
    expect(container.firstChild).toBeNull()
  })

  test('displays predicted sign label', () => {
    const result = {
      classification: 'Speed Limit 60',
      confidence: 0.85,
      all_classes: []
    }

    render(<ClassificationResult result={result} />)

    expect(screen.getByText('PREDICTED SIGN')).toBeInTheDocument()
    expect(screen.getByText('CONFIDENCE SCORE')).toBeInTheDocument()
  })
})

