/**
 * Tests for LoadingSpinner Component
 * Related Jira Ticket: RSCI-11
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoadingSpinner from '../components/LoadingSpinner'

test('renders loading spinner with default message', () => {
  render(<LoadingSpinner />)
  
  const spinner = screen.getByTestId('loading-spinner')
  expect(spinner).toBeInTheDocument()
  
  const message = screen.getByText('Loading...')
  expect(message).toBeInTheDocument()
})

test('renders loading spinner with custom message', () => {
  const customMessage = 'Classifying image...'
  render(<LoadingSpinner message={customMessage} />)
  
  const message = screen.getByText(customMessage)
  expect(message).toBeInTheDocument()
})

test('spinner element is present', () => {
  const { container } = render(<LoadingSpinner />)
  
  const spinner = container.querySelector('.spinner')
  expect(spinner).toBeInTheDocument()
  expect(spinner).toHaveClass('spinner')
})

test('spinner container has correct structure', () => {
  const { container } = render(<LoadingSpinner />)
  
  const spinnerContainer = container.querySelector('.spinner-container')
  expect(spinnerContainer).toBeInTheDocument()
  
  const spinner = spinnerContainer.querySelector('.spinner')
  expect(spinner).toBeInTheDocument()
  
  const message = spinnerContainer.querySelector('.loading-message')
  expect(message).toBeInTheDocument()
})

