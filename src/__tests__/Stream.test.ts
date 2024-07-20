import { describe, expect, test } from 'vitest'
import type { ArrayPipe } from '../index'
import { stream } from '../index'

describe('stream', () => {
  test(`isArray`, () => {
    const arr = [1, 2, 3]
    expect(Array.isArray(arr)).toBe(true)
    expect(Array.isArray(stream(arr))).toBe(true)
  })

  test(`map`, () => {
    const arr = [1, 2, 3]
    const proxy = stream(arr)

    const next = proxy //
      .map((i) => `${i}`)
      .map((i) => `${i}${i}`)

    expect(next).toStrictEqual(['11', '22', '33'])
  })

  test(`flatmap`, () => {
    const actual = [[1], [2, 3]]
    const expected = [1, 2, 3]
    const proxy = stream(actual)
    const test = <T, A extends T[][]>(t: A) => t.flatMap((i) => i)

    const nextOriginal = test(actual)
    expect(nextOriginal).toStrictEqual(expected)

    const next = test(proxy as typeof actual)
    expect(next).toStrictEqual(expected)

    expect(next[0]).toStrictEqual(expected[0])
    expect(next.length).toStrictEqual(expected.length)
    expect(Object.keys(next)).toStrictEqual(Object.keys(expected))
  })

  test(`flatmap index`, () => {
    const actual = [
      [1, 2],
      [2, 3],
      [2, 3],
    ]
    const expected = [0, 1, 2, 3, 4, 5]
    const proxy = stream(actual)
    const test = <T, A extends T[][]>(t: A) =>
      t //
        .flatMap((i) => i)
        .map((v, i) => {
          return i
        })

    const nextOriginal = test(actual)
    expect(nextOriginal).toStrictEqual(expected)

    const next = test(proxy as typeof actual) as ArrayPipe<number>
    const arrNext = next.unproxy()
    expect(arrNext).toStrictEqual(expected)
  })
})
