import type { Pipe } from './Pipe'
import { compute } from './compute'

export interface ArrayProxyState<T, R = any> {
  chain: Pipe<T, R> | undefined
  value: T[]
}

const defaultState = <T>(): ArrayProxyState<T> => ({
  chain: undefined,
  value: [] as Array<T>,
})

export const defineState = <T, R = any>(state: Partial<ArrayProxyState<T, R>>): ArrayProxyState<T, R> => ({
  ...defaultState<T>(),
  ...state,
})

/**
 * Computes the array and mutates the state.
 * @returns the mutated state
 */
export const computeState = <T>(state: ArrayProxyState<T>) => {
  if (!state.chain) return state
  state = Object.assign(state, defineState({ value: compute(state) }))
  state.chain = undefined
  return state
}

/**
 * Computes the array and mutates the state.
 * @returns the value of the mutated state
 */
export const computeValue = <T>(state: ArrayProxyState<T>) => {
  return computeState(state).value
}
