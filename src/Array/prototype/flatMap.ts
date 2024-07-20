import { createPipe, type Pipe } from '../../proxy/Pipe'
import type { CallBackFn } from '../ArrayProto'
import { isArray } from '../../util/isIterable'

/**
 * Implementation for {@link Array#flatMap Array.prototype.flatMap(...)} on a single element
 */
export function flatMap<In, Out>(this: unknown, callbackfn: CallBackFn<In, Out[] | Out>, thisArg?: any): Pipe<In, Out | Out[]> {
  return createPipe<In, Out>({
    apply: (value: In, ctx, next) => {
      const results = callbackfn.call(thisArg, value, ctx.index, ctx.array)
      if (!results) {
        ctx.index--
        return
      }
      if (isArray(results)) {
        for (const result of results) {
          next(result)
          ctx.index++
        }
        ctx.index--
      } else {
        next(results)
      }
    },
  }) as Pipe<In, Out>
}
