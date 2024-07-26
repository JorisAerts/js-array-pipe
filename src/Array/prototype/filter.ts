import { createPipe, type Pipe } from '../../proxy/Pipe'
import type { ArrayProto } from '../ArrayProto'

type MapArray<T> = ArrayProto<T>['map']
type MapCallBackFn<T> = Parameters<MapArray<T>>[0]

/**
 * Implementation for {@link Array#filter Array.prototype.filter(...)} on a single element
 */
export function filter<Type, ThisArg = any>(this: unknown, callbackfn: MapCallBackFn<Type>, thisArg?: ThisArg): Pipe<Type, Type> {
  return createPipe<Type, Type>({
    apply: (value: Type, ctx, next) => {
      if (!callbackfn.call(thisArg, value, ctx.index, ctx.array)) {
        ctx.index--
      } else {
        next(value)
      }
    },
  }) as Pipe<Type, Type>
}
