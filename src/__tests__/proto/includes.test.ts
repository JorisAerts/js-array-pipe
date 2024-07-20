import { expect, test } from 'vitest'
import { stream } from '../../index'

const testIncludes = (actual: number[], test: unknown, result = true, fromIndex?: number) => {
  const tst = <A extends unknown[]>(t: A | Array<A>) => t.includes(test as A, fromIndex)

  const nextOriginal = tst(actual)
  expect(nextOriginal).toStrictEqual(result)

  const next = tst(stream(actual) as unknown[])
  expect(next).toStrictEqual(result)
}

const arr = [1, 2, 3, 4]

test(`includes()`, () => {
  testIncludes(arr, 1, true)
  testIncludes(arr, 2, true)
  testIncludes(arr, 99, false)
})

test(`includes() from`, () => {
  testIncludes(arr, 1, false, 1)
  testIncludes(arr, 2, true, 1)
})

test(`includes() from negative index`, () => {
  testIncludes(arr, 1, false, -1)
  testIncludes(arr, 4, true, -1)
})
