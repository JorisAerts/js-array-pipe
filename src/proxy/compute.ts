import type { ArrayProxyState } from './ProxyState'
import type { ApplyContext, Next } from './Pipe'
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
  const size = state.value.length
  for (let i = 0; i < size; i++) {
    const item = state.value[i]
    if (item !== undefined) state.chain!.apply(item, context, (value) => result.push(value))
    context.index++
  }
  return result
}

/**
 * Computes and returns the value of the array
 *
 * the computation part should be extracted an reused, so it can be chained with a final pipe or something,
 * handling forEach, find, ...
 */
export const computeUntil = <T, P>(state: ArrayProxyState<T>, predicate?: Predicate<P>) => {
  let abort = false
  let value: P | undefined = undefined
  const context: ApplyContext<T> = { index: 0, array: state.value }
  const size = state.value.length
  const cb: Next<P> | undefined =
    predicate &&
    ((item): void => {
      if (predicate!(item as P, context.index, context.array as unknown as P[])) {
        value = item
        abort = true
      }
    })

  // reduce logic while looping
  const process: Next<T> = state.chain //
    ? cb
      ? (item: T) => state.chain!.apply(item, context, cb)
      : (item: T) => state.chain!.apply(item, context, dummy)
    : cb
      ? (cb as unknown as Next<T>)
      : dummy

  // final operations get the real index, chained ones don't
  const undefinedIncrease = +!state.chain
  for (let i = 0; !abort && i < size; i++) {
    const item = state.value[i]
    if (item !== undefined) {
      process(item)
      context.index++
    } else {
      context.index += undefinedIncrease
    }
  }
  return value
}

function dummy() {}
