import { expect, test } from 'vitest'
import { stream } from '../../index'
import type { Predicate } from '../../Array/ArrayProto'

const testFind = (actual: number[], test: Predicate<number>, result: number | undefined) => {
  const tst = <A extends unknown[]>(t: A | Array<A>) => t.find(test as Predicate<unknown>)

  const nextOriginal = tst(actual)
  expect(nextOriginal).toStrictEqual(result)

  const next = tst(stream(actual) as unknown[])
  expect(next).toStrictEqual(result)
}

const arr = [1, 2, 3, 4, 5, 6, 7]

test(`find()`, () => {
  testFind(arr, (i: number) => i % 2 === 0, 2)
  testFind(arr, (i: number) => i % 9 === 0, undefined)
  testFind(arr, (i: number) => i, 1)
  testFind(arr, () => true, 1)
  testFind(arr, (i) => i < 5, 1)
  testFind(arr, (i) => i > 5, 6)
})
