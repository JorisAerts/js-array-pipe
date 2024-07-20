import { describe, expect, test } from 'vitest'
import { createProxy, getProxy } from '../ArrayPipe'

describe('ArrayPipe', () => {
  test('createProxy', () => {
    const arr = [1, 2, 3]
    const proxy = createProxy(arr)

    // the proxy should be an array
    expect(proxy).toStrictEqual(arr)
    expect(Array.isArray(proxy)).toBe(true)

    expect(proxy[0]).toBe(arr[0])
    expect(proxy.length).toBe(arr.length)

    expect(proxy).toStrictEqual(arr)

    // the "inner" proxy should be an object
    expect(getProxy(proxy)).toBeTypeOf('object')
    expect(getProxy(proxy)).not.toBe(getProxy(arr))
  })

  test('chaining', () => {
    const arr = [1, 2, 3]
    const expected = [2, 4, 6]

    const proxy = createProxy(arr)
    const mapped = proxy.map((i) => i * 2)

    expect(mapped).toStrictEqual(expected)
  })

  test('final operations', () => {
    const arr = [1, 2, 3]
    const expected = [2, 4, 6]
    const result: number[] = []
    const proxy = createProxy(arr)
    proxy.map((i) => i * 2).forEach((i) => result.push(i))

    expect(result).toStrictEqual(expected)
  })
})
