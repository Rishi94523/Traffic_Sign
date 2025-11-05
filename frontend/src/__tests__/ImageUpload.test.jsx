/**
 * Tests for ImageUpload Component
 * Related Jira Ticket: RSCI-7
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
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
