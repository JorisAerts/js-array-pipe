import { describe, test } from 'vitest'
import { stream } from '../index'
import type { ArrayPipe } from '../proxy'

describe('benchmark', () => {
  const reps = 3
  const bigArray = Array.from({ length: 200_000 }).map((_, i) => Math.random() * i + 1)
  const testArray = <T extends number, A extends ArrayPipe<T> | T[]>(t: A) =>
    t
      .map((i) => i * 2)
      .map((i) => `${i}--`)
      .map((i) => i.replace('-', '+'))
      .map((i) => i + i)
      .map((i) => i.substring(1))

  test(`orig`, () => {
    const t1 = Date.now()
    for (let i = 0; i < reps; i++) {
      testArray(bigArray)
    }
    const t2 = Date.now() - t1
    console.log({ orig: t2 })
  })

  test(`proxy`, () => {
    const proxy = stream(bigArray)
    const t1 = Date.now()
    for (let i = 0; i < reps; i++) {
      ;(testArray(proxy) as ArrayPipe<string>).unproxy()
    }
    const t2 = Date.now() - t1
    console.log({ proxy: t2 })
  })
})
