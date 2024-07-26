import type { ArrayProxyState } from '../../proxy'
import { defineState } from '../../proxy'
import type { CallBackFn } from '../ArrayProto'
import { computeUntil } from '../../proxy/compute'

/**
 * Implementation for {@link Array#forEach Array.prototype.forEach(...)}
 */
export function forEach<In>(this: unknown, state: ArrayProxyState<In>) {
  return (callbackfn: CallBackFn<In>, thisArg?: any) => {
    computeUntil(defineState(state), (value: In, index, array) => {
      if (value !== undefined) callbackfn.call(thisArg, value, index, array)
    })
    // returns nothing
  }
}
