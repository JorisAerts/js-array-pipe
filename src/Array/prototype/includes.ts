import type { ArrayProxyState } from '../../proxy'
import { computeValue, defineState } from '../../proxy'
import { computeUntil } from '../../proxy/compute'
import { createPipe } from '../../proxy/Pipe'

/**
 * Implementation for {@link Array#includes Array.prototype.includes(...)}
 */
export function includes<In>(this: unknown, state: ArrayProxyState<In>) {
  return (searchElement: In, fromIndex = 0) => {
    if (fromIndex < 0) {
      return computeValue(state).includes(searchElement, fromIndex)
    }

    const chain = createPipe({
      apply: (value, ctx, next) => ctx.index >= fromIndex && value === searchElement && next(value),
    })
    return !!computeUntil(
      defineState({
        ...state,
        chain: state.chain?.andThen(chain) ?? chain,
      }),
      (t) => !!t
    )
  }
}
