/**
 * Tests for ImagePreview Component
 * Related Jira Tickets: RSCI-8, RSCI-11
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import ImagePreview from '../components/ImagePreview'
import * as classificationAPI from '../api/classificationAPI'

// Mock the classification API
vi.mock('../api/classificationAPI', () => ({
  classifyImage: vi.fn()
}))

// Mock URL.createObjectURL for JSDOM
beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/fake-object-url')
})

afterAll(() => {
  delete global.URL.createObjectURL
})

beforeEach(() => {
  vi.clearAllMocks()
})

function createMockImage() {
  const blob = new Blob(['x'.repeat(1024)], { type: 'image/jpeg' })
  const file = new File([blob], 'test-sign.jpg', { type: 'image/jpeg' })
  return {
    file,
    preview: 'blob:http://localhost/fake-object-url',
    name: 'test-sign.jpg',
    type: 'image/jpeg',
    size: 1024
  }
}

test('displays image preview when image is provided', () => {
  const image = createMockImage()
  const mockOnClassify = vi.fn()
  const mockOnError = vi.fn()
  const mockSetLoading = vi.fn()

  render(
    <ImagePreview
      image={image}
      onClassify={mockOnClassify}
      onError={mockOnError}
      loading={false}
      setLoading={mockSetLoading}
    />
  )

  const img = screen.getByAltText('Uploaded road sign')
  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', image.preview)
})

test('shows loading spinner when loading is true', () => {
  const image = createMockImage()
  const mockOnClassify = vi.fn()
  const mockOnError = vi.fn()
  const mockSetLoading = vi.fn()

  render(
    <ImagePreview
      image={image}
      onClassify={mockOnClassify}
      onError={mockOnError}
      loading={true}
      setLoading={mockSetLoading}
    />
  )

  const spinner = screen.getByTestId('loading-spinner')
  expect(spinner).toBeInTheDocument()
  
  const loadingMessage = screen.getByText('PROCESSING IMAGE...')
  expect(loadingMessage).toBeInTheDocument()
})

test('does not show loading spinner when loading is false', () => {
  const image = createMockImage()
  const mockOnClassify = vi.fn()
  const mockOnError = vi.fn()
  const mockSetLoading = vi.fn()

  render(
    <ImagePreview
      image={image}
      onClassify={mockOnClassify}
      onError={mockOnError}
      loading={false}
      setLoading={mockSetLoading}
    />
  )

  const spinner = screen.queryByTestId('loading-spinner')
  expect(spinner).not.toBeInTheDocument()
})

test('disables classify button when loading', () => {
  const image = createMockImage()
  const mockOnClassify = vi.fn()
  const mockOnError = vi.fn()
  const mockSetLoading = vi.fn()

  render(
    <ImagePreview
      image={image}
      onClassify={mockOnClassify}
      onError={mockOnError}
      loading={true}
      setLoading={mockSetLoading}
    />
  )

  const button = screen.getByRole('button', { name: /CLASSIFYING.../i })
  expect(button).toBeDisabled()
})

test('calls setLoading(true) when classify button is clicked', async () => {
  const image = createMockImage()
  const mockOnClassify = vi.fn()
  const mockOnError = vi.fn()
  const mockSetLoading = vi.fn()

  // Mock successful API response
  classificationAPI.classifyImage.mockResolvedValue({
    classification: 'Speed Limit 60',
    confidence: 0.95,
    status: 'completed'
  })

  render(
    <ImagePreview
      image={image}
      onClassify={mockOnClassify}
      onError={mockOnError}
      loading={false}
      setLoading={mockSetLoading}
    />
  )

  const button = screen.getByRole('button', { name: /classify image/i })
  await userEvent.click(button)

  expect(mockSetLoading).toHaveBeenCalledWith(true)
})

test('calls setLoading(false) after successful classification', async () => {
  const image = createMockImage()
  const mockOnClassify = vi.fn()
  const mockOnError = vi.fn()
  const mockSetLoading = vi.fn()

  const mockResult = {
    classification: 'Speed Limit 60',
    confidence: 0.95,
    status: 'completed'
  }

  classificationAPI.classifyImage.mockResolvedValue(mockResult)

  render(
    <ImagePreview
      image={image}
      onClassify={mockOnClassify}
      onError={mockOnError}
      loading={false}
      setLoading={mockSetLoading}
    />
  )

  const button = screen.getByRole('button', { name: /classify image/i })
  await userEvent.click(button)

  await waitFor(() => {
    expect(mockSetLoading).toHaveBeenCalledWith(false)
  })

  expect(mockOnClassify).toHaveBeenCalledWith(mockResult)
})

test('calls setLoading(false) after classification error', async () => {
  const image = createMockImage()
  const mockOnClassify = vi.fn()
  const mockOnError = vi.fn()
  const mockSetLoading = vi.fn()

  const mockError = new Error('Classification failed')
  classificationAPI.classifyImage.mockRejectedValue(mockError)

  render(
    <ImagePreview
      image={image}
      onClassify={mockOnClassify}
      onError={mockOnError}
      loading={false}
      setLoading={mockSetLoading}
    />
  )

  const button = screen.getByRole('button', { name: /classify image/i })
  await userEvent.click(button)

  await waitFor(() => {
    expect(mockSetLoading).toHaveBeenCalledWith(false)
  })

  expect(mockOnError).toHaveBeenCalledWith('Classification failed')
  expect(mockOnClassify).not.toHaveBeenCalled()
})

test('calls onError when no image is available', async () => {
  const mockOnClassify = vi.fn()
  const mockOnError = vi.fn()
  const mockSetLoading = vi.fn()

  render(
    <ImagePreview
      image={null}
      onClassify={mockOnClassify}
      onError={mockOnError}
      loading={false}
      setLoading={mockSetLoading}
    />
  )

  const button = screen.getByRole('button', { name: /classify image/i })
  await userEvent.click(button)

  // Wait a bit to ensure async operations complete
  await waitFor(() => {
    expect(mockOnError).toHaveBeenCalledWith('No image available for classification')
  })

  expect(mockSetLoading).not.toHaveBeenCalled()
  expect(classificationAPI.classifyImage).not.toHaveBeenCalled()
})

test('calls classifyImage API with correct file', async () => {
  const image = createMockImage()
  const mockOnClassify = vi.fn()
  const mockOnError = vi.fn()
  const mockSetLoading = vi.fn()

  classificationAPI.classifyImage.mockResolvedValue({
    classification: 'Speed Limit 60',
    confidence: 0.95,
    status: 'completed'
  })

  render(
    <ImagePreview
      image={image}
      onClassify={mockOnClassify}
      onError={mockOnError}
      loading={false}
      setLoading={mockSetLoading}
    />
  )

  const button = screen.getByRole('button', { name: /classify image/i })
  await userEvent.click(button)

  expect(classificationAPI.classifyImage).toHaveBeenCalledWith(image.file)
})

