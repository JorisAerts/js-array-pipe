import type { ArrayProxyState } from './ProxyState'
import { computeValue, defineState } from './ProxyState'
import type { ArrayProto } from '../Array/ArrayProto'
import type { Pipe } from './Pipe'
import { isNumber } from '../util/isNumber'
import { finalOperations, pipeOperations } from '../Array'
import { isArray } from '../util/isIterable'

export const ProxySymbol = Symbol('ArrayProxy')

/**
 * Modifies a function `(args) => Array<T>` to `(args) => ArrayPipe<T>`
 */
type ExtendedReturnType<Type> = Type extends (...args: infer Args) => infer Ret //
  ? Ret extends Array<infer Item>
    ? (...args: Args) => ArrayPipe<Item>
    : Type
  : Type

/**
 * Functions from Array.prototype which originally returned an Array, now return a ArrayPipe
 */
type MutatedArrayPrototype<Type> = {
  [Key in keyof ArrayProto<Type>]: ExtendedReturnType<ArrayProto<Type>[Key]>
}

/**
 * An array that uses a pipe for chaining array operations.
 * This reduces the number of iterations required for computing the result.
 */
export interface ArrayPipe<Type> extends MutatedArrayPrototype<Type> {
  /**
   * Returns the computed underlying array.
   */
  [ProxySymbol]: unknown // ArrayProxyState<T>
  /**
   * Returns the computed underlying array.
   */
  unproxy: () => Type[]
}

/**
 * Retrieve the inner-proxy instance of a given proxy, or undefined if it's not a Proxy
 * @param proxy the target proxy object
 */
export const getProxyState = <T>(proxy: T[] | ArrayPipe<T>) => proxy[ProxySymbol as unknown as keyof typeof proxy]

/**
 * Create a Proxy from an array.
 * @param arr the target Array
 */
export function createPipe<T>(arr: T[] | ArrayPipe<T>) {
  // make sure we are dealing with an array, otherwise gtfo!
  if (!isArray(arr)) {
    console.warn(`You can only create an ArrayPipe of an Array.`)
    return arr
  }
  const state: ArrayProxyState<T> = {
    chain: undefined,
    value: arr,
  }

  return createPipeFromState(state)
}

/**
 * These methods are performed on the computed value
 */
const proxyProto = {
  unproxy:
    <T>(state: ArrayProxyState<T>) =>
    () =>
      computeValue(state),
}

/**
 * Create an ArrayPipe from a given array.
 * @param state
 */
export function createPipeFromState<T>(state: ArrayProxyState<T>): ArrayPipe<T> {
  return new Proxy(state.value, {
    /*
     * Retrieve a value, the length, a prototype function or an Array symbol (such as Symbol.iterator)
     */
    get: (target, p) => {
      if (p === ProxySymbol) {
        return state
      }

      if (isNumber(p)) {
        return computeValue(state)[p as unknown as number]
      }

      if (Object.prototype.hasOwnProperty.call(finalOperations, p)) {
        return (...args: unknown[]) => {
          const fn = finalOperations[p as keyof typeof finalOperations] as <State extends ArrayProxyState<T>>(state: State) => (...args: unknown[]) => unknown
          return fn(state)(...args)
        }
      }

      if (Object.prototype.hasOwnProperty.call(pipeOperations, p)) {
        return (...args: any[]) => {
          const fn = pipeOperations[p as keyof typeof pipeOperations] as <In, Out, Args extends any[], Ret extends Pipe<In, Out>>(...args: Args) => Ret
          const pipe = fn.apply(null as any, args as any)
          const newState = defineState({
            ...state,
            chain: state.chain?.andThen(pipe) ?? pipe,
          })
          return createPipeFromState(newState)
        }
      }

      if (Object.prototype.hasOwnProperty.call(proxyProto, p)) {
        return proxyProto[p as keyof typeof proxyProto](state)
      }

      if (p === 'constructor') {
        return Array
      }

      return computeValue(state)[p as keyof typeof target]
    },

    /*
     * Assign a value
     */
    set: (target, p: string | symbol | number, value) => {
      if (isNumber(p)) {
        computeValue(state)[p as unknown as number] = value
      } else {
        Object.defineProperty(computeValue(state), p, { value })
      }
      return true
    },

    /*
     * Delete a member of the array
     */
    deleteProperty: (target: T[], p: number | string | symbol): boolean => delete computeValue(state)[p as unknown as number],

    /// ... others
    getPrototypeOf: (/* target: T[] */): object | null => Array.prototype,
    has: (target: T[], p: string | symbol): boolean => p in computeValue(state),
    getOwnPropertyDescriptor: (target: T[], p: string | symbol): PropertyDescriptor | undefined => Object.getOwnPropertyDescriptor(computeValue(state), p),
    ownKeys: (/* target: T[] */): Array<string | symbol> => Reflect.ownKeys(computeValue(state)),
  } as ProxyHandler<T[]>) as ArrayPipe<T>
}
