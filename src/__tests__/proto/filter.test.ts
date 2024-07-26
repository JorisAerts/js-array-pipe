import { expect, test } from 'vitest'
import type { ArrayPipe } from '../../index'
import { stream } from '../../index'
import type { Predicate } from '../../Array/ArrayProto'

test(`filter()`, () => {
  const actual = [1, 2, 3, 4, 9, 95, 67]
  // eslint-disable-next-line no-sparse-arrays
  const actual2 = [, , 1, , 2, , , 3, , 4, , 9, , , , 95, , 67, , , ,]
  const expected = [3, 9]
  const filter = <Type extends number | undefined>(t: Type[] | ArrayPipe<Type>) => t.filter((i: number) => i % +3 === 0)
  expect(filter(actual)).toStrictEqual(expected)
  expect(filter(stream(actual))).toStrictEqual(expected)

  expect(filter(actual2)).toStrictEqual(expected)
  expect(filter(stream(actual2))).toStrictEqual(expected)
})

const testFilter = <A, Type extends Array<A | Array<A>> | ArrayPipe<A | Array<A>>, InnerType = A extends ArrayLike<infer Q> ? Q : A>(actual: Type, expected: unknown, ...predicates: Predicate<InnerType>[]) => {
  let filtered = actual
  predicates?.forEach((i) => (filtered = filtered.filter(i) as Type))
  const result = filtered.map((v, i) => ({ v, i }))
  expect(result).toStrictEqual(expected)
}

test(`filter indexes`, () => {
  const actual = [1, 2, 3, 4]
  const expected = [
    { i: 0, v: 2 },
    { i: 1, v: 4 },
  ]
  testFilter(actual, expected, (i: number) => i % 2 === 0)
  testFilter(stream(actual), expected, (i: number) => i % 2 === 0)
})

test(`filter complex indexes [,,...,....,,,,,...,]`, () => {
  // eslint-disable-next-line no-sparse-arrays
  const actual = [, , , 1, , , 2, , , , , , 3, , 4, , , , , , , , 5, , , , 6]
  const expected = [
    { i: 0, v: 2 },
    { i: 1, v: 4 },
    { i: 2, v: 6 },
  ]
  testFilter(actual, expected, (i: number) => i % 2 === 0)
  testFilter(stream(actual), expected, (i: number) => i % 2 === 0)
})
