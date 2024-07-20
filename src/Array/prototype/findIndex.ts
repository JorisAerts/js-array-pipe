import type { Predicate } from '../ArrayProto'
import type { ArrayProxyState } from '../../proxy'
import { computeUntil } from '../../proxy/compute'

/**
 * Implementation for {@link Array#findIndex Array.prototype.findIndex(...)}
 */
export function findIndex<In>(this: unknown, state: ArrayProxyState<In>) {
  return (callbackfn: Predicate<unknown>, thisArg?: any) => {
    let result = -1
    computeUntil(state, (t, index, arr) => {
      if (callbackfn.call(thisArg, t, index, arr)) {
        result = index
        return true
      }
    })
    return result
  }
}
