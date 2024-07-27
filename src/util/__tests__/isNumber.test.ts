import { expect, test } from 'vitest'
import { isIterable } from '../isIterable'
import { stream } from '../../index'
import { isNumber, isNumberOr } from '../isNumber'

test('isNumber', () => {
  expect(isNumber([])).toBe(false)
  expect(isNumber(isIterable(stream([])))).toBe(false)
  expect(isNumber('test')).toBe(false)
  expect(isNumber('1')).toBe(false)
  expect(isNumber(null)).toBe(false)
  expect(isNumber(undefined)).toBe(false)
  expect(isNumber(NaN)).toBe(false)

  expect(isNumber(1)).toBe(true)
  expect(isNumber(Infinity)).toBe(true)
})

test('isNumberOr', () => {
  expect(isNumberOr([], 99)).toBe(99)
  expect(isNumberOr(isIterable(stream([])), 99)).toBe(99)
  expect(isNumberOr('test', 99)).toBe(99)
  expect(isNumberOr('1', 99)).toBe(99)
  expect(isNumberOr(null, 99)).toBe(99)
  expect(isNumberOr(undefined, 99)).toBe(99)
  expect(isNumberOr(NaN, 99)).toBe(99)

  expect(isNumberOr(1, 99)).toBe(1)
  expect(isNumberOr(Infinity, 99)).toBe(Infinity)
})
