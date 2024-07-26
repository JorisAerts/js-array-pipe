import { describe, expect, test } from 'vitest'
import type { ArrayPipe } from '../index'
import { stream } from '../index'

describe('stream or pipe', () => {
  test(`isArray`, () => {
    const arr = [1, 2, 3]
    expect(Array.isArray(arr)).toBe(true)
    expect(Array.isArray(stream(arr))).toBe(true)
  })

  test(`complex indexes`, () => {
    const test = <T extends Array<unknown> | ArrayPipe<unknown>>(t: T) =>
      t //
        .flatMap((i) => [i * 1, i * 2])
        .filter((i) => i % 2 === 0)
        .map((i) => i * 1)
        .map((i) => i * 2)
        .flatMap((i) => [i * 1, i * 2])
        .filter((i) => i > 0 && i < 20)
        .map((v, i) => ({ v, i }))

    {
      const actual = [1, 2, 3]
      const expected = [
        { i: 0, v: 4 },
        { i: 1, v: 8 },
        { i: 2, v: 4 },
        { i: 3, v: 8 },
        { i: 4, v: 8 },
        { i: 5, v: 16 },
        { i: 6, v: 12 },
      ]
      expect(test(actual)).toStrictEqual(expected)
      expect(test(stream(actual))).toStrictEqual(expected)
    }
    {
      const actual = [, , , 2, 3, , , 9, , 14, , ,]
      const expected = [
        { i: 0, v: 4 },
        { i: 1, v: 8 },
        { i: 2, v: 8 },
        { i: 3, v: 16 },
        { i: 4, v: 12 },
      ]
      expect(test(actual)).toStrictEqual(expected)
      expect(test(stream(actual))).toStrictEqual(expected)
    }
  })
})
