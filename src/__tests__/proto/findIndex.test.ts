import { expect, test } from 'vitest'
import { stream } from '../../index'
import type { Predicate } from '../../Array/ArrayProto'

const testFindIndex = (actual: number[], test: Predicate<number>, result: number) => {
  const tst = <A extends unknown[]>(t: A | Array<A>) => t.findIndex(test as Predicate<unknown>)

  const nextOriginal = tst(actual)
  expect(nextOriginal).toStrictEqual(result)

  const next = tst(stream(actual) as unknown[])
  expect(next).toStrictEqual(result)
}

const arr = [1, 2, 3, 4, 5, 6, 7]

test(`findIndex()`, () => {
  testFindIndex(arr, (i: number) => i % 2 === 0, 1)
  testFindIndex(arr, (i: number) => i % 9 === 0, -1)
  testFindIndex(arr, (i: number) => i, 0)
  testFindIndex(arr, () => true, 0)
  testFindIndex(arr, (i) => i < 5, 0)
  testFindIndex(arr, (i) => i > 5, 5)
})
