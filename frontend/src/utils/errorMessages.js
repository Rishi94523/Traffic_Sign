/**
 * Error Message Utilities
 * Related Jira Ticket: RSCI-9
 * 
 * Provides error message formatting and mapping for user-friendly error display
 */

/**
 * Map backend error messages to user-friendly frontend messages
 * RSCI-9: Provides consistent, clear error messaging
 */
export const ERROR_MESSAGE_MAP = {
  // File type errors
  'Invalid file extension': 'Invalid file type. Only JPG and PNG image formats are allowed.',
  'Invalid MIME type': 'Invalid file format. The file must be a JPEG or PNG image.',
  'Only JPG and PNG': 'Only JPG and PNG image formats are allowed.',
  'Invalid file type': 'Invalid file type. Only JPG and PNG image formats are allowed.',
  
  // File size errors
  'exceeds maximum allowed size': 'File size exceeds the maximum allowed size of 10 MB. Please upload a smaller image.',
  'File too large': 'File size exceeds the maximum allowed size of 10 MB.',
  'File size': 'File size exceeds the maximum allowed size of 10 MB.',
  'exceeds maximum allowed size of 10 MB': 'File size exceeds the maximum allowed size of 10 MB. Please upload a smaller image.',
  
  // Generic errors
  'Filename is required': 'Filename is required. Please ensure your file has a name.',
  'validation failed': 'File validation failed. Please check that your file is a valid JPG or PNG image under 10 MB.',
  'Network error': 'Network error: Failed to upload image. Please check your connection.',
}

/**
 * Format error message for display
 * @param {string} error - Raw error message from API or validation
 * @returns {string} - Formatted, user-friendly error message
 */
export function formatErrorMessage(error) {
  if (!error) return 'An unknown error occurred.'
  
  // Check if error message matches any known patterns
  const errorLower = error.toLowerCase()
  
  // Check for file type errors
  if (errorLower.includes('invalid') && (errorLower.includes('type') || errorLower.includes('format'))) {
    return 'Invalid file type. Only JPG and PNG image formats are allowed.'
  }
  
  // Check for file size errors
  if (errorLower.includes('size') || errorLower.includes('large') || errorLower.includes('exceeds')) {
    // Try to extract file size if present
    const sizeMatch = error.match(/(\d+\.?\d*)\s*MB/i)
    if (sizeMatch) {
      return `File size (${sizeMatch[1]} MB) exceeds the maximum allowed size of 10 MB. Please upload a smaller image.`
    }
    return 'File size exceeds the maximum allowed size of 10 MB. Please upload a smaller image.'
  }
  
  // Check for missing filename
  if (errorLower.includes('filename') && errorLower.includes('required')) {
    return 'Filename is required. Please ensure your file has a name.'
  }
  
  // Return original error if no match found (should be user-friendly already from backend)
  return error
}

/**
 * Get error type for categorization
 * @param {string} error - Error message
 * @returns {string} - Error type: 'file_type', 'file_size', 'missing_filename', or 'unknown'
 */
export function getErrorType(error) {
  if (!error) return 'unknown'
  
  const errorLower = error.toLowerCase()
  
  if (errorLower.includes('type') || errorLower.includes('format') || errorLower.includes('extension')) {
    return 'file_type'
  }
  
  if (errorLower.includes('size') || errorLower.includes('large') || errorLower.includes('exceeds')) {
    return 'file_size'
  }
  
  if (errorLower.includes('filename') && errorLower.includes('required')) {
    return 'missing_filename'
  }
  
  return 'unknown'
}

