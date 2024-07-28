import { expect, test } from 'vitest'
import type { ArrayPipe } from '../../index'
import { stream } from '../../index'
import type { Reducer } from '../../Array/prototype/reduce'

const testReduce = <Type = number, R = Type>(actual: Type[], reducer: Reducer<Type, R>, result: Type | undefined, initialValue?: Type) => {
  const tst = (t: Type[] | ArrayPipe<Type>) => (initialValue ? t.reduce(reducer, initialValue) : t.reduce(reducer))

  const nextOriginal = tst(actual)
  expect(nextOriginal).toStrictEqual(result)

  const next = tst(stream(actual))
  expect(next).toStrictEqual(result)
}

test(`reduce`, () => {
  testReduce([1, 2, 3, 4, 5], (a, b) => a + b, 15)
})

test(`reduce with initial Value`, () => {
  testReduce([1, 2, 3, 4, 5], (a, b) => a + b, 115, 100)
})
