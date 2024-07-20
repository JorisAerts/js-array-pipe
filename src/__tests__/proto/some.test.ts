import { expect, test } from 'vitest'
import { stream } from '../../index'
import type { Predicate } from '../../Array/ArrayProto'

const testSome = (actual: number[], test: Predicate<number>, result = true) => {
  const tst = <A extends unknown[]>(t: A | Array<A>) => t.some(test as Predicate<unknown>)

  const nextOriginal = tst(actual)
  expect(nextOriginal).toStrictEqual(result)

  const next = tst(stream(actual) as unknown[])
  expect(next).toStrictEqual(result)
}

const arr = [1, 2, 3, 4]

test(`some()`, () => {
  testSome(arr, (i: number) => i % 2 === 0, true)
  testSome(arr, (i: number) => i % 9 === 0, false)
})
