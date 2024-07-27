import { expect, test } from 'vitest'
import { isArray, isIterable } from '../isIterable'
import { stream } from '../../index'

test('isIterable', () => {
  expect(isIterable([])).toBe(true)
  expect(isIterable(stream([]))).toBe(true)
  expect(isIterable('test')).toBe(true)

  expect(isIterable(new ArrayBuffer(99))).toBe(false)

  expect(isIterable(null)).toBe(false)
  expect(isIterable(undefined)).toBe(false)

  expect(isIterable(123)).toBe(false)
  expect(isIterable({})).toBe(false)
  expect(isIterable(new Date())).toBe(false)
})

test('isArray', () => {
  expect(isArray([])).toBe(true)
  expect(isArray(stream([]))).toBe(true)

  expect(isArray(new ArrayBuffer(99))).toBe(false)
  expect(isArray(null)).toBe(false)
  expect(isArray(undefined)).toBe(false)

  expect(isArray('test')).toBe(false)
  expect(isArray(123)).toBe(false)
  expect(isArray({})).toBe(false)
  expect(isArray(new Date())).toBe(false)
})
