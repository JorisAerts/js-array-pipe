import type { ArrayProxyState } from './ProxyState'
import type { ApplyContext } from './Pipe'
import type { Predicate } from '../Array/ArrayProto'

/**
 * Computes and returns the value of the array
 *
 * the computation part should be extracted an reused, so it can be chained with a final pipe or something,
 * handling forEach, find, ...
 */
export const compute = <T, R = unknown>(state: ArrayProxyState<T, R>) => {
  if (!state.chain) return state.value
  const result: R[] = []
  const context: ApplyContext<T> = { index: 0, array: state.value }
  state.value.forEach((item) => {
    state.chain!.apply(item, context, (value) => result.push(value))
    context.index++
  })
  return result
}

/**
 * Computes and returns the value of the array
 *
 * the computation part should be extracted an reused, so it can be chained with a final pipe or something,
 * handling forEach, find, ...
 */
export const computeUntil = <T, P>(state: ArrayProxyState<T>, predicate: Predicate<P>) => {
  let result: T | undefined | void = undefined
  const context: ApplyContext<T> = { index: 0, array: state.value }
  const size = state.value.length
  for (let i = 0; i < size; i++) {
    const item = state.value[i]
    result = state.chain ? state.chain!.apply(item, context, (value) => (result = value)) : item
    if (predicate(result as P, context.index, context.array as unknown as P[])) {
      return result
    }
    context.index++
  }
}
