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
  // TODO (RSCI-10): Implement API call to send image for classification
  // 1. Upload image to /api/upload/ endpoint
  // 2. Get image_id from upload response
  // 3. Call /api/classification/classify endpoint with image_id
  // 4. Return classification result
  // 5. Handle errors appropriately
  
  // Placeholder - implement actual API calls
  throw new Error('Not implemented yet - RSCI-10')
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
      throw new Error(errorData.detail || 'Failed to get classification result')
    }

    return await response.json()
  } catch (error) {
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
      throw new Error(errorData.detail || 'Failed to get classification history')
    }

    return await response.json()
  } catch (error) {
    console.error('Get classification history error:', error)
    throw error
  }
}

