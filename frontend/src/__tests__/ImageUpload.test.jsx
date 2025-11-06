/**
 * Tests for ImageUpload Component
 * Related Jira Tickets: RSCI-7, RSCI-16 (Drag-and-Drop)
 */

import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import ImageUpload from '../components/ImageUpload'

// Mock URL.createObjectURL for JSDOM
beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/fake-object-url')
})

afterAll(() => {
  delete global.URL.createObjectURL
})

// Mock DataTransfer for drag-and-drop tests
function createMockDataTransfer(files) {
  return {
    files: files || [],
    items: files ? files.map(file => ({
      kind: 'file',
      type: file.type,
      getAsFile: () => file
    })) : [],
    types: ['Files']
  }
}

function createFile(name, type, sizeBytes = 1024) {
  const blob = new Blob(['x'.repeat(sizeBytes)], { type })
  return new File([blob], name, { type })
}

test('rejects file larger than 10MB (RSCI-7)', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={false} setLoading={() => {}} />)

  const input = document.querySelector('input[type="file"]')
  const bigBytes = 10 * 1024 * 1024 + 1 // 10MB + 1 byte
  const file = createFile('large.jpg', 'image/jpeg', bigBytes)
  await userEvent.upload(input, file)

  expect(onUpload).not.toHaveBeenCalled()
  expect(onError).toHaveBeenCalledTimes(1)
  expect(onError.mock.calls[0][0]).toMatch(/under 10MB/i)
})

test('accepts file exactly 10MB', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={false} setLoading={() => {}} />)

  const input = document.querySelector('input[type="file"]')
  const exactBytes = 10 * 1024 * 1024 // Exactly 10MB
  const file = createFile('exact.jpg', 'image/jpeg', exactBytes)
  await userEvent.upload(input, file)

  expect(onError).not.toHaveBeenCalled()
  expect(onUpload).toHaveBeenCalledTimes(1)
})

test('accepts file under 10MB', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={false} setLoading={() => {}} />)

  const input = document.querySelector('input[type="file"]')
  const smallBytes = 5 * 1024 * 1024 // 5MB
  const file = createFile('small.jpg', 'image/jpeg', smallBytes)
  await userEvent.upload(input, file)

  expect(onError).not.toHaveBeenCalled()
  expect(onUpload).toHaveBeenCalledTimes(1)
})

test('calls onUpload with preview URL for valid size', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={false} setLoading={() => {}} />)

  const input = document.querySelector('input[type="file"]')
  const file = createFile('sign.png', 'image/png', 1024 * 1024) // 1MB
  await userEvent.upload(input, file)

  expect(onError).not.toHaveBeenCalled()
  expect(onUpload).toHaveBeenCalledTimes(1)
  const payload = onUpload.mock.calls[0][0]
  expect(payload.file).toBeInstanceOf(File)
  expect(payload.preview).toBe('blob:http://localhost/fake-object-url')
  expect(payload.size).toBe(1024 * 1024)
})

// Drag-and-drop tests (RSCI-16)
test('accepts file via drag and drop', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={false} setLoading={() => {}} />)

  const uploadArea = screen.getByText(/Click to upload or drag and drop/i).closest('.upload-area')
  const file = createFile('drag-test.jpg', 'image/jpeg', 1024 * 1024) // 1MB

  const dataTransfer = createMockDataTransfer([file])

  await act(async () => {
    fireEvent.drop(uploadArea, {
      dataTransfer
    })
  })

  expect(onError).not.toHaveBeenCalled()
  expect(onUpload).toHaveBeenCalledTimes(1)
  const payload = onUpload.mock.calls[0][0]
  expect(payload.file).toBeInstanceOf(File)
  expect(payload.name).toBe('drag-test.jpg')
})

test('rejects invalid file type via drag and drop', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={false} setLoading={() => {}} />)

  const uploadArea = screen.getByText(/Click to upload or drag and drop/i).closest('.upload-area')
  const file = createFile('invalid.pdf', 'application/pdf', 1024 * 1024)

  const dataTransfer = createMockDataTransfer([file])

  await act(async () => {
    fireEvent.drop(uploadArea, {
      dataTransfer
    })
  })

  expect(onUpload).not.toHaveBeenCalled()
  expect(onError).toHaveBeenCalledTimes(1)
  expect(onError.mock.calls[0][0]).toMatch(/Invalid file type/i)
})

test('rejects file larger than 10MB via drag and drop', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={false} setLoading={() => {}} />)

  const uploadArea = screen.getByText(/Click to upload or drag and drop/i).closest('.upload-area')
  const bigBytes = 10 * 1024 * 1024 + 1 // 10MB + 1 byte
  const file = createFile('large-drag.jpg', 'image/jpeg', bigBytes)

  const dataTransfer = createMockDataTransfer([file])

  await act(async () => {
    fireEvent.drop(uploadArea, {
      dataTransfer
    })
  })

  expect(onUpload).not.toHaveBeenCalled()
  expect(onError).toHaveBeenCalledTimes(1)
  expect(onError.mock.calls[0][0]).toMatch(/under 10MB/i)
})

test('processes only first file when multiple files are dropped', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={false} setLoading={() => {}} />)

  const uploadArea = screen.getByText(/Click to upload or drag and drop/i).closest('.upload-area')
  const file1 = createFile('first.jpg', 'image/jpeg', 1024 * 1024)
  const file2 = createFile('second.jpg', 'image/jpeg', 1024 * 1024)

  const dataTransfer = createMockDataTransfer([file1, file2])

  await act(async () => {
    fireEvent.drop(uploadArea, {
      dataTransfer
    })
  })

  expect(onUpload).toHaveBeenCalledTimes(1)
  expect(onUpload.mock.calls[0][0].name).toBe('first.jpg')
})

test('shows drag-over visual feedback', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={false} setLoading={() => {}} />)

  const uploadArea = screen.getByText(/Click to upload or drag and drop/i).closest('.upload-area')
  
  // Simulate drag over
  await act(async () => {
    fireEvent.dragOver(uploadArea, {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn()
    })
  })

  expect(uploadArea.classList.contains('drag-over')).toBe(true)
  expect(screen.getByText(/Drop image here/i)).toBeInTheDocument()
})

test('does not process drop when loading', async () => {
  const onUpload = vi.fn()
  const onError = vi.fn()

  render(<ImageUpload onUpload={onUpload} onError={onError} loading={true} setLoading={() => {}} />)

  const uploadArea = screen.getByText(/Processing.../i).closest('.upload-area')
  const file = createFile('test.jpg', 'image/jpeg', 1024 * 1024)

  const dataTransfer = createMockDataTransfer([file])

  await act(async () => {
    fireEvent.drop(uploadArea, {
      dataTransfer
    })
  })

  expect(onUpload).not.toHaveBeenCalled()
  expect(onError).not.toHaveBeenCalled()
})
