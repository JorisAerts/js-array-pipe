import type { ApplyContext, Next } from '../../proxy/Pipe'
import { createPipe, type Pipe } from '../../proxy/Pipe'
import { isNumberOr } from '../../util/isNumber'
import { isArray } from '../../util/isIterable'

/**
 * Implementation for {@link Array#flat Array.prototype.flat(...)} on a single element
 */
export function flat<Type, Out extends Type | Type[]>(this: unknown, depth: number = 1): Pipe<Out, Out> {
  return createPipe<Out, Out>({
    apply: (value: Out, ctx, next) => flatten(value, ctx, next, isNumberOr(depth, 0)),
  }) as Pipe<Out, Out>
}

/**
 * Recursive flatten with a depth
 */
function flatten<Type, Value extends Type | Type[]>(value: Type, ctx: ApplyContext<Type>, next: Next<Value>, depth: number) {
  if (0 >= depth || !isArray(value)) {
    next(value as Value)
  } else if (value.length) {
    value.forEach((item) => {
      flatten(item, ctx, next, depth - 1)
      ctx.index++
    })
    ctx.index--
  }
}
