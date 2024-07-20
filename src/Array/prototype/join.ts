import type { ArrayProxyState } from '../../proxy'
import { computeUntil } from '../../proxy/compute'

/**
 * Implementation for {@link Array#join Array.prototype.join(...)}
 */
export function join<In>(this: unknown, state: ArrayProxyState<In>) {
  return (separator = ',') => {
    let result = ''
    computeUntil(state, (value, index) => {
      if (index) result += separator
      result += value
    })
    return result
  }
}
