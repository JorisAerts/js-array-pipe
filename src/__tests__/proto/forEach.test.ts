import { expect, test } from 'vitest'
import { stream } from '../../index'
import type { CallBackFn } from '../../Array/ArrayProto'

const testForEach = <T>(actual: T[], expected: unknown[], res: CallBackFn<unknown, unknown> = (i) => i) => {
  const test = <A extends unknown[]>(t: A | Array<A>) => {
    const result: unknown[] = []
    t.flat(Infinity)
      .filter((i) => +i % 2 === 0)
      .forEach((i, index) => result.push(res(i, index, [])))
    return result
  }

  const nextOriginal = test(actual)
  expect(nextOriginal).toStrictEqual(expected)

  const next = test(stream(actual) as unknown[])
  expect(next).toStrictEqual(expected)
}

const testForEachSimple = <T>(actual: T[], expected: unknown[], res: CallBackFn<unknown, unknown> = (i) => i) => {
  const test = <A extends unknown[]>(t: A | Array<A>) => {
    const result: unknown[] = []
    t.forEach((i, index) => result.push(res(i, index, [])))
    return result
  }

  const nextOriginal = test(actual)
  expect(nextOriginal).toStrictEqual(expected)

  const next = test(stream(actual) as unknown[])
  expect(next).toStrictEqual(expected)
}

const arr1 = [0, [1, 2], [3, [4], 5], 6, 7, [[[8]]], 0]
const arr2 = [0, 1, 2, 3]

test(`forEach()`, () => {
  testForEach(arr1, [0, 2, 4, 6, 8, 0])
  testForEachSimple(arr2, [0, 1, 2, 3])
})

test(`forEach() [index, value]`, () => {
  testForEach(
    arr1,
    [
      [0, 0],
      [1, 2],
      [2, 4],
      [3, 6],
      [4, 8],
      [5, 0],
    ],
    (i, o) => [o, i]
  )
  testForEachSimple(
    arr2,
    [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    (i, o) => [o, i]
  )
})

test(`forEach([,,,,...]) [index, value]`, () => {
  testForEach(
    // eslint-disable-next-line no-sparse-arrays
    [, , , , 0, [1, 2], [3, [4], 5], 6, 7, [[[8]]], 0],
    [
      [0, 0],
      [1, 2],
      [2, 4],
      [3, 6],
      [4, 8],
      [5, 0],
    ],
    (i, o) => [o, i]
  )
  testForEachSimple(
    // eslint-disable-next-line no-sparse-arrays
    [, , , , , 0, 1, 2, 3],
    [
      [5, 0],
      [6, 1],
      [7, 2],
      [8, 3],
    ],
    (i, o) => [o, i]
  )
})
