import type { ArrayPipe } from './proxy'
import { createPipe } from './proxy'

export type { ArrayPipe } from './proxy'

/**
 * Creates an {@link ArrayPipe} of the given {@link Array}.
 * This drastically reduces the number of iterations performed on the array, when doing multiple chained operations.
 *
 * @param array the array which needs to be streamed
 *
 * @author Joris Aerts
 */
export const stream = <T>(array: T[]) => createPipe(array) as ArrayPipe<T>

export type CreateArrayPipe<T> = typeof stream<T>
