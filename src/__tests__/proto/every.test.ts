import { expect, test } from 'vitest'
import { stream } from '../../index'
import type { Predicate } from '../../Array/ArrayProto'

const testEvery = (actual: number[], test: Predicate<number>, result = true) => {
  const tst = <A extends unknown[]>(t: A | Array<A>) => t.every(test as Predicate<unknown>)

  const nextOriginal = tst(actual)
  expect(nextOriginal).toStrictEqual(result)

  const next = tst(stream(actual) as unknown[])
  expect(next).toStrictEqual(result)
}

const arr = [1, 2, 3, 4, 5, 6, 7]

test(`every()`, () => {
  testEvery(arr, (i: number) => i % 2 === 0, false)
  testEvery(arr, (i: number) => i % 9 === 0, false)
  testEvery(arr, (i: number) => i, true)
  testEvery(arr, () => true, true)
  testEvery(arr, (i) => i < arr.length + 1, true)
})
