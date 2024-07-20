import { expect, test } from 'vitest'
import { type ArrayPipe, stream } from '../../index'

test(`flatmap [[1], [2, 3]]`, () => {
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

test(`flatmap callback index`, () => {
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
