import type { ArrayPipe } from './proxy'
import { createProxy } from './proxy'

export type { ArrayPipe }

/**
 * Creates a piped version of the given {@link Array}.
 * This drastically reduces the number of iterations performed on the array, when doing multiple chained operations.
 *
 * @param array the array which needs to be streamed
 *
 * @author Joris Aerts
 */
export const stream = <T>(array: T[]) => createProxy(array) as ArrayPipe<T>
