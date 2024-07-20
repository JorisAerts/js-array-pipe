import type { ArrayProxyState } from '../../proxy'
import { computeValue } from '../../proxy'
import { computeUntil } from '../../proxy/compute'

/**
 * Implementation for {@link Array#indexOf Array.prototype.indexOf(...)}
 */
export function indexOf<In>(this: unknown, state: ArrayProxyState<In>) {
  return (searchElement: In, fromIndex = 0) => {
    if (fromIndex < 0) {
      return computeValue(state).indexOf(searchElement, fromIndex)
    }
    let result = -1
    computeUntil(state, (t, index) => {
      if (searchElement === t && index >= fromIndex) {
        result = index
        return true
      }
    })
    return result
  }
}
