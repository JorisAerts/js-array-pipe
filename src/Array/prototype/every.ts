import type { Predicate } from '../ArrayProto'
import type { ArrayProxyState } from '../../proxy'
import { defineState } from '../../proxy'
import { computeUntil } from '../../proxy/compute'
import { createPipe } from '../../proxy/Pipe'

/**
 * Implementation for {@link Array#every Array.prototype.every(...)} on a single element
 */
export function every<In>(this: unknown, state: ArrayProxyState<In>) {
  return (callbackfn: Predicate<In>, thisArg?: any) => {
    const chain = createPipe({
      apply: (value, ctx, next) => next(callbackfn.call(thisArg, value as In, ctx.index, ctx.array as In[])),
    })
    return (
      computeUntil(
        defineState({
          ...state,
          chain: state.chain?.andThen(chain) ?? chain,
        }),
        (t) => !t
      ) === undefined
    )
  }
}
