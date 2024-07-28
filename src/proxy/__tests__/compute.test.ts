import { expect, test } from 'vitest'
import { defineState } from '../ProxyState'
import { computeUntil } from '../compute'
import { map } from '../../Array/prototype/map'

test('computeUntil (no chain + no callback)', () => {
  const state = defineState({
    value: [1, 2, 3, 4, 5, 6],
  })
  const computed = computeUntil(state)
  expect(computed).toBeUndefined()
})

test('computeUntil (no chain + predicate)', () => {
  const state = defineState({
    value: [1, 2, 3, 4, 5, 6],
  })
  const computed = computeUntil(state, (v: number) => v > 3)
  expect(computed).toBe(4)
})

test('computeUntil (chain + no callback)', () => {
  const state = defineState({
    value: [1, 2, 3, 4, 5, 6],
    chain: map((i: number) => i * 2),
  })
  const computed = computeUntil(state)
  expect(computed).toBeUndefined()
})

test('computeUntil (chain + predicate)', () => {
  const state = defineState({
    value: [1, 2, 3, 4, 5, 6],
    chain: map((i: number) => i * 2),
  })
  const computed = computeUntil(state, (v: number) => v > 3)
  expect(computed).toBe(4)
})
