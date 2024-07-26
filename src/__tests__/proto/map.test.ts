import { expect, test } from 'vitest'
import { stream } from '../../index'

test(`map`, () => {
  const arr = [1, 2, 3]
  const proxy = stream(arr)

  const next = proxy //
    .map((i) => `${i}`)

  expect(next).not.toStrictEqual(arr)
  expect(next).toStrictEqual(['1', '2', '3'])
})

test(`map chained`, () => {
  const arr = [1, 2, 3]
  const proxy = stream(arr)

  const next = proxy //
    .map((i) => `${i}`)
    .map((i) => `${i}${i}`)

  expect(next).toStrictEqual(['11', '22', '33'])
})
