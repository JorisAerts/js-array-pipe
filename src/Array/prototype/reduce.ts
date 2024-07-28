import type { ArrayProxyState } from '../../proxy'
import { defineState } from '../../proxy'
import { computeUntil } from '../../proxy/compute'
import type { CallBackFn } from '../ArrayProto'

export type Reducer<Type, ReduceType = Type> = (previousValue: ReduceType, currentValue: Type, currentIndex: number, array: Type[]) => ReduceType

/**
 * Implementation for {@link Array#reduce Array.prototype.reduce(...)}
 */
export function reduce<In>(this: unknown, state: ArrayProxyState<In>) {
  return <InitialValue, ReduceFn extends Reducer<In, InitialValue>>(callbackfn: ReduceFn, initialValue?: InitialValue) => {
    let current: InitialValue | undefined = initialValue
    const reduceFn: CallBackFn<In> = (value: In, index: number, array) => {
      current = callbackfn.call(undefined, current!, value, index, array)
    }
    computeUntil(
      defineState(state),
      initialValue !== undefined // if there is a second argument, take that one as current value
        ? reduceFn
        : (() => {
            // this iife creates and returns a reducer.
            // the first time it will just set the current value after which
            // it will replace itself with the actual reducer to run from the next time on
            let internalReduce = ((value) => {
              current = value as unknown as InitialValue
              internalReduce = reduceFn
            }) as CallBackFn<In>
            return ((value: In, index: number, array: In[]) => internalReduce(value, index, array)) as CallBackFn<In>
          })()
    )
    return current
  }
}
