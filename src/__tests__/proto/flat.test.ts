import { expect, test } from 'vitest'
import { stream } from '../../index'

const testFlat = (actual: unknown[], expected: unknown[], depth?: number) => {
  const test = <A extends unknown[]>(t: A | Array<A>) => t.flat(depth)

  const nextOriginal = test(actual)
  expect(nextOriginal).toStrictEqual(expected)

  const next = test(stream(actual) as unknown[])
  expect(next).toStrictEqual(expected)
}

const arr1 = [0, 1, 2, [3, 4]]
const arr2 = [0, 1, [2, [3, [4, 5]]]]

test(`flat()`, () => {
  testFlat(arr1, [0, 1, 2, 3, 4])
  testFlat(arr2, [0, 1, 2, [3, [4, 5]]])
})

test(`flat(2)`, () => {
  testFlat(arr2, [0, 1, 2, 3, [4, 5]], 2)
})

test(`flat(Infinity)`, () => {
  testFlat(arr2, [0, 1, 2, 3, 4, 5], Infinity)
  testFlat([[[[[[[[[[[1]]]]]]]]]]], [1], Infinity)
})
