import { bench, describe } from 'vitest'
import { stream } from '../index'
import type { ArrayPipe } from '../proxy'

describe('benchmark', () => {
  const reps = 3
  const bigArray = Array.from({ length: 500_000 }).map((_, i) => Math.random() * i + 1)
  const testArray = <T extends number, A extends ArrayPipe<T> | T[]>(t: A) =>
    t
      .map((i) => i * 2)
      .map((i) => `${i}--`)
      .map((i) => i.replace('-', '+'))
      .map((i) => i + i)
      .map((i) => i.substring(1))

  bench(
    `orig`,
    () => {
      testArray(bigArray)
    },
    { iterations: reps }
  )

  const proxy = stream(bigArray)
  bench(
    'proxy',
    () => {
      ;(testArray(proxy) as ArrayPipe<string>).unproxy()
    },
    { iterations: reps }
  )
})
