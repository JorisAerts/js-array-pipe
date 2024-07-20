import { expect, test } from 'vitest'
import { stream } from '../../index'

const testJoin = (actual: number[], expected: string, separator: unknown = undefined) => {
  const tst = <A extends unknown[]>(t: A | Array<A>) => t.join(separator as string)

  const nextOriginal = tst(actual)
  expect(nextOriginal).toStrictEqual(expected)

  const next = tst(stream(actual) as unknown[])
  expect(next).toStrictEqual(expected)
}

const arr = [1, 2, 3, 4, 5, 6, 7]

test(`join() empty`, () => {
  testJoin([], '')
  testJoin([], '', '-')
})

test(`join()`, () => {
  testJoin(arr, '1,2,3,4,5,6,7')
})

test(`join() with separator`, () => {
  testJoin(arr, '1-2-3-4-5-6-7', '-')
  testJoin(arr, '1234567', '')
})
