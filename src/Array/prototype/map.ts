import { createPipe, type Pipe } from '../../proxy/Pipe'
import type { CallBackFn } from '../ArrayProto'

/**
 * Implementation for {@link Array#map Array.prototype.map(...)} on a single element
 */
export function map<In, Out>(this: unknown, callbackfn: CallBackFn<In, Out>, thisArg?: any): Pipe<In, ReturnType<CallBackFn<In, Out>>> {
  return createPipe({
    apply: (value: In, ctx, next) => next(callbackfn.call(thisArg, value, ctx.index, ctx.array)),
  })
}
