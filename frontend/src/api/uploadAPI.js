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
    // RSCI-9: Format error message for user-friendly display
    if (error.message) {
      throw new Error(formatErrorMessage(error.message))
    }
    throw new Error(formatErrorMessage('Network error: Failed to upload image. Please check your connection.'))
  }
}

