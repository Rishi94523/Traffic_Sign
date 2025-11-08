/**
 * Classification API
 * Related Jira Ticket: RSCI-10
 * 
 * Handles API calls to the backend classification service
 * RSCI-9: Includes clear error message handling for invalid uploads
 */

import { formatErrorMessage } from '../utils/errorMessages'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Classify an image
 * Jira Ticket: RSCI-10
 * 
 * @param {File} imageFile - The image file to classify
 * @returns {Promise<Object>} Classification result with classification, confidence, and all_classes
 */
export async function classifyImage(imageFile) {
  try {
    // Step 1: Upload image to /api/upload/ endpoint
    const formData = new FormData()
    formData.append('file', imageFile)

    const uploadResponse = await fetch(`${API_BASE_URL}/api/upload/`, {
      method: 'POST',
      body: formData,
    })

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({}))
      const errorMsg = errorData.detail || 'Failed to upload image'
      throw new Error(formatErrorMessage(errorMsg))
    }

    const uploadResult = await uploadResponse.json()
    
    // Step 2: For now, use a mock image_id since the backend doesn't return one yet
    // This will be updated when RSCI-10 is fully implemented
    const imageId = uploadResult.image_id || `mock-${Date.now()}`

    // Step 3: Call /api/classification/classify endpoint with image_id
    // Note: Since the backend endpoint returns 501, we'll use the results endpoint as a workaround
    // for testing the loading spinner functionality
    const classifyResponse = await fetch(`${API_BASE_URL}/api/classification/results/${imageId}`, {
      method: 'GET',
    })

    if (!classifyResponse.ok) {
      const errorData = await classifyResponse.json().catch(() => ({}))
      const errorMsg = errorData.detail || 'Failed to classify image'
      throw new Error(formatErrorMessage(errorMsg))
    }

    // Step 4: Return classification result
    const result = await classifyResponse.json()
    return result
  } catch (error) {
    // Handle network errors
    if (error.message && (error.message.includes('fetch') || error.message.includes('network'))) {
      throw new Error(formatErrorMessage('Network error occurred. Please check your internet connection and try again.'))
    }
    console.error('Classification error:', error)
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
    const response = await fetch(`${API_BASE_URL}/api/classification/results/${imageId}`)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = errorData.detail || 'Failed to get classification result'
      throw new Error(formatErrorMessage(errorMsg))
    }

    return await response.json()
  } catch (error) {
    // RSCI-9: Handle network errors
    if (error.message && (error.message.includes('fetch') || error.message.includes('network'))) {
      throw new Error(formatErrorMessage('Network error occurred. Please check your internet connection and try again.'))
    }
    console.error('Get classification result error:', error)
    throw error
  }
}

/**
 * Get classification history
 * @returns {Promise<Array>} Array of classification results
 */
export async function getClassificationHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/classification/history`)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = errorData.detail || 'Failed to get classification history'
      throw new Error(formatErrorMessage(errorMsg))
    }

    return await response.json()
  } catch (error) {
    // RSCI-9: Handle network errors
    if (error.message && (error.message.includes('fetch') || error.message.includes('network'))) {
      throw new Error(formatErrorMessage('Network error occurred. Please check your internet connection and try again.'))
    }
    console.error('Get classification history error:', error)
    throw error
  }
}

