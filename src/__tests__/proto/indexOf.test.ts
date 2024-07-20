import { expect, test } from 'vitest'
import { stream } from '../../index'

const testIndexOf = (actual: number[], test: unknown, fromIndex: number | undefined, result: number) => {
  const tst = <A extends unknown[]>(t: A | Array<A>) => t.indexOf(test as A, fromIndex)

  const nextOriginal = tst(actual)
  expect(nextOriginal).toStrictEqual(result)

  const next = tst(stream(actual) as unknown[])
  expect(next).toStrictEqual(result)
}

const arr = [1, 2, 3, 4, 5, 6, 7]

test(`indexOf()`, () => {
  testIndexOf(arr, 1, undefined, 0)
  testIndexOf(arr, 3, undefined, 2)
  testIndexOf(arr, 7, undefined, 6)
})

test(`indexOf() from`, () => {
  testIndexOf(arr, 1, 0, 0)
  testIndexOf(arr, 1, 1, -1)
})

test(`indexOf() from negative index`, () => {
  testIndexOf(arr, 1, -1, -1)
  testIndexOf(arr, 1, -10, 0)
})
