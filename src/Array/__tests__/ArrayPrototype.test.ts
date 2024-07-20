import { expect, test } from 'vitest'
import { filter, flatMap, map } from '../pipe-operations'
import { compute } from '../../proxy/compute'

test(`chaining`, () => {
  const actual = compute({
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    chain: flatMap((item: number) => item)
      .andThen(map((i) => i))
      .andThen(flatMap((i) => [i]))
      .andThen(filter((i) => i % 2 === 0))
      .andThen(map((i) => i)),
  })
  expect(actual).toStrictEqual([2, 4, 6, 8])
})
