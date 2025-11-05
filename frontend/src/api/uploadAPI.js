/**
 * Upload API
 * Related Jira Tickets: RSCI-4, RSCI-9
 * 
 * Handles image upload to backend with clear error message handling
 */

import { formatErrorMessage } from '../utils/errorMessages'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Upload an image file to the backend
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} Upload response with file info
 */
export async function uploadImage(imageFile) {
  try {
    const formData = new FormData()
    formData.append('file', imageFile)

    const response = await fetch(`${API_BASE_URL}/api/upload/`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      // RSCI-9: Extract and format clear error messages
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.detail || errorData.message || 'Failed to upload image'
      throw new Error(formatErrorMessage(errorMessage))
    }

    return await response.json()
  } catch (error) {
    // RSCI-9: Handle network errors and format error messages
    if (error.message) {
      // Check if it's a network error
      const errorLower = error.message.toLowerCase()
      if (errorLower.includes('network') || 
          errorLower.includes('fetch') || 
          errorLower.includes('connection') ||
          errorLower.includes('failed to fetch')) {
        throw new Error(formatErrorMessage('Network error occurred during upload. Please check your internet connection and try again.'))
      }
      throw new Error(formatErrorMessage(error.message))
    }
    // Generic network error
    throw new Error(formatErrorMessage('Network error occurred during upload. Please check your internet connection and try again.'))
  }
}

