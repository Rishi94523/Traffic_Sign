/**
 * Classification API
 * Related Jira Ticket: RSCI-10
 * 
 * Handles API calls to the backend classification service
 * RSCI-9: Includes clear error message handling for invalid uploads
 */

import { formatErrorMessage } from '../utils/errorMessages'

const DEFAULT_LOCAL_API = 'http://localhost:8000'

function normalizeBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL

  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.replace(/\/$/, '')
  }

  return import.meta.env.PROD ? '' : DEFAULT_LOCAL_API
}

const API_BASE_URL = normalizeBaseUrl()

const DISPLAY_API_URL =
  API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'production API')

function buildApiUrl(path) {
  if (!path.startsWith('/')) {
    return `${API_BASE_URL}/${path}`
  }

  return `${API_BASE_URL}${path}`
}

/**
 * Classify an image
 * Jira Ticket: RSCI-10
 * 
 * Sends validated image data directly to the /classify API endpoint.
 * The endpoint validates the image (type and size) and returns classification results.
 * 
 * @param {File} imageFile - The image file to classify (validated image data)
 * @returns {Promise<Object>} Classification result with classification, confidence, and all_classes
 */
export async function classifyImage(imageFile) {
  try {
    // Send validated image data directly to /classify endpoint
    // The endpoint will validate the image and perform classification
    const formData = new FormData()
    formData.append('file', imageFile)

    const classifyResponse = await fetch(buildApiUrl('/api/classification/classify'), {
      method: 'POST',
      body: formData,
    })

    if (!classifyResponse.ok) {
      const errorData = await classifyResponse.json().catch(() => ({}))
      const errorMsg = errorData.detail || 'Failed to classify image'
      throw new Error(formatErrorMessage(errorMsg))
    }

    // Return classification result
    const result = await classifyResponse.json()
    return result
  } catch (error) {
    // Better error handling - distinguish between backend connection issues and other errors
    console.error('Classification error:', error)
    
    // Check if it's a fetch/network error (backend not reachable)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      // Backend server is likely not running or not accessible
      throw new Error(
        `Cannot connect to backend server at ${DISPLAY_API_URL}. ` +
        `Please ensure the backend server is running on port 8000. ` +
        `You can start it with: cd backend && uvicorn app:app --reload`
      )
    }
    
    // Check for other network-related errors
    if (error.message && (
      error.message.includes('Failed to fetch') || 
      error.message.includes('NetworkError') ||
      error.message.includes('Network request failed')
    )) {
      throw new Error(
        `Cannot connect to backend server at ${DISPLAY_API_URL}. ` +
        `Please check if the backend server is running. ` +
        `If you have a stable internet connection, the backend may not be started.`
      )
    }
    
    // Re-throw other errors (validation errors, etc.)
    throw error
  }
}

/**
 * Get classification result by image ID
 * @param {string} imageId - The image ID
 * @returns {Promise<Object>} Classification result
 */
export async function getClassificationResult(imageId) {
  try {
    const response = await fetch(buildApiUrl(`/api/classification/results/${imageId}`))
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = errorData.detail || 'Failed to get classification result'
      throw new Error(formatErrorMessage(errorMsg))
    }

    return await response.json()
  } catch (error) {
    console.error('Get classification result error:', error)
    
    // Check if it's a fetch/network error (backend not reachable)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        `Cannot connect to backend server at ${DISPLAY_API_URL}. ` +
        `Please ensure the backend server is running on port 8000.`
      )
    }
    
    if (error.message && (
      error.message.includes('Failed to fetch') || 
      error.message.includes('NetworkError') ||
      error.message.includes('Network request failed')
    )) {
      throw new Error(
        `Cannot connect to backend server at ${DISPLAY_API_URL}. ` +
        `Please check if the backend server is running.`
      )
    }
    
    throw error
  }
}

/**
 * Get classification history
 * @returns {Promise<Array>} Array of classification results
 */
export async function getClassificationHistory() {
  try {
    const response = await fetch(buildApiUrl('/api/classification/history'))
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = errorData.detail || 'Failed to get classification history'
      throw new Error(formatErrorMessage(errorMsg))
    }

    return await response.json()
  } catch (error) {
    console.error('Get classification history error:', error)
    
    // Check if it's a fetch/network error (backend not reachable)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        `Cannot connect to backend server at ${DISPLAY_API_URL}. ` +
        `Please ensure the backend server is running on port 8000.`
      )
    }
    
    if (error.message && (
      error.message.includes('Failed to fetch') || 
      error.message.includes('NetworkError') ||
      error.message.includes('Network request failed')
    )) {
      throw new Error(
        `Cannot connect to backend server at ${DISPLAY_API_URL}. ` +
        `Please check if the backend server is running.`
      )
    }
    
    throw error
  }
}

/**
 * Check if backend server is running
 * @returns {Promise<boolean>} True if backend is accessible
 */
export async function checkBackendHealth() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch(buildApiUrl('/api/health'), {
      method: 'GET',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    return response.ok
  } catch (error) {
    console.error('Backend health check failed:', error)
    return false
  }
}

