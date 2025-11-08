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
    console.error('Upload error:', error)
    
    // Check if it's a fetch/network error (backend not reachable)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      // Backend server is likely not running or not accessible
      throw new Error(
        `Cannot connect to backend server at ${API_BASE_URL}. ` +
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
        `Cannot connect to backend server at ${API_BASE_URL}. ` +
        `Please check if the backend server is running. ` +
        `If you have a stable internet connection, the backend may not be started.`
      )
    }
    
    // Re-throw other errors (validation errors, etc.)
    if (error.message) {
      throw new Error(formatErrorMessage(error.message))
    }
    
    // Generic error fallback
    throw new Error(formatErrorMessage('An unexpected error occurred during upload.'))
  }
}

