import { describe, expect, test } from 'vitest'
import type { ApplyContext, Pipe } from '../Pipe'
import { createPipe, withNext } from '../Pipe'

const execPipe = <In, Out>(pipe: Pipe<In, Out>, value: In, opts: ApplyContext<In>) => {
  let result: Out | undefined
  pipe.apply(value, opts, (val) => (result = val))
  return result
}

describe('Pipe', () => {
  test('chaining', () => {
    const index = 0
    const array = [] as number[]
    const pipe: Pipe<number, string> = createPipe({
      apply: withNext((item) => `${item}`),
    })
    const nextPipe: Pipe<string, string> = createPipe({
      apply: withNext((item: string) => `${item}${item}`),
    })
    expect(execPipe(pipe, 1, { index, array })).toBe('1')
    expect(execPipe(pipe.andThen(nextPipe), 1, { index, array })).toBe('11')
  })

  test('chaining & repeating', () => {
    const index = 0
    const array = [] as number[]
    const pipe1: Pipe<number, string> = createPipe({ apply: withNext((item) => `${item}`) })
    const pipe2: Pipe<string, string> = createPipe({ apply: withNext((item: string) => `${item}${item}`) })

    const pipe = pipe1.andThen(pipe2).andThen(pipe2).andThen(pipe2)

    expect(execPipe(pipe, 1, { index, array })).toBe('11111111')
  })
})
