import { expectTypeOf, test } from 'vitest'
import type { ArrayPipe, CreateArrayPipe } from '../index'
import { stream } from '../index'

test('chaining types', () => {
  const actual = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const proxy = stream(actual)
  expectTypeOf(proxy).not.toBeArray()
  expectTypeOf(proxy).toMatchTypeOf(null as unknown as ArrayPipe<number>)

  const chained = proxy
    .filter((i) => i % 2 === 0)
    .map((i) => `${i}`)
    .map((s) => parseInt(s))
  expectTypeOf(chained).not.toBeArray()
  expectTypeOf(chained).toEqualTypeOf(null as unknown as ArrayPipe<unknown>)
  expectTypeOf(chained).toHaveProperty('unproxy')
})

test('exported types', () => {
  expectTypeOf(stream).toMatchTypeOf<CreateArrayPipe<unknown>>()
})
