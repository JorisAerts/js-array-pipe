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

test(`flatmap => empty`, () => {
  const actual = [[], [], []]
  expect(stream(actual).flatMap((i) => i)).toStrictEqual([])

  const actual2 = [[], [1, 2], []]
  expect(stream(actual2).flatMap((i) => i)).toStrictEqual([1, 2])
})

test(`flatmap => undefined`, () => {
  const actual = [[], [], []]
  expect(stream(actual).flatMap((i) => undefined)).toStrictEqual([])

  const actual2 = [[], [1, 2], []]
  const array2 = stream(actual2) //
    .flatMap((i, index) => (index % 2 === 0 ? i : undefined))
  const pipe2 = stream(actual2) //
    .flatMap((i, index) => (index % 2 === 0 ? i : undefined))

  expect(array2).toStrictEqual(pipe2)
  expect(pipe2).toStrictEqual([1, 2])

  const actual3 = [[], [1, 2], []]
  const result3 = stream(actual3) //
    .flatMap((i, index) => (index % 2 === 0 ? i : undefined))
    .map((i, o) => [o, i])

  expect(result3).toStrictEqual([
    [0, 1],
    [1, 2],
  ])
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
