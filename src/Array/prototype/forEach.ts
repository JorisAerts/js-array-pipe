import { createPipe } from '../../proxy/Pipe'
import { compute } from '../../proxy/compute'
import type { ArrayProxyState } from '../../proxy'
import { defineState } from '../../proxy'
import type { CallBackFn } from '../ArrayProto'

/**
 * Implementation for {@link Array#forEach Array.prototype.forEach(...)}
 */
export function forEach<In>(this: unknown, state: ArrayProxyState<In>) {
  return (callbackfn: CallBackFn<In>, thisArg?: any) => {
    const chain = createPipe({
      apply: (value, ctx) => callbackfn.call(thisArg, value as In, ctx.index, ctx.array as In[]),
    })
    compute(
      defineState({
        ...state,
        chain: state.chain?.andThen(chain) ?? chain,
      })
    )
    // returns nothing
  }
}
