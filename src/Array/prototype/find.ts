import type { Predicate } from '../ArrayProto'
import type { ArrayProxyState } from '../../proxy'
import { computeUntil } from '../../proxy/compute'

/**
 * Implementation for {@link Array#find Array.prototype.find(...)} on a single element
 */
export function find<In>(this: unknown, state: ArrayProxyState<In>) {
  return (callbackfn: Predicate<unknown>, thisArg?: any) => {
    return computeUntil(state, (t, n, a) => callbackfn.call(thisArg, t, n, a))
  }
}
