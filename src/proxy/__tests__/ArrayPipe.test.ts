import { describe, expect, test, vi } from 'vitest'
import { createPipe, getProxyState } from '../ArrayPipe'

describe('ArrayPipe', () => {
  test('createProxy', () => {
    const arr = [1, 2, 3]
    const proxy = createPipe(arr)

    // the proxy should be an array
    expect(proxy).toStrictEqual(arr)
    expect(Array.isArray(proxy)).toBe(true)

    expect(proxy[0]).toBe(arr[0])
    expect(proxy.length).toBe(arr.length)

    expect(proxy).toStrictEqual(arr)

    // the "inner" proxy should be an object
    expect(getProxyState(proxy)).toBeTypeOf('object')
    expect(getProxyState(proxy)).not.toBe(getProxyState(arr))
  })

  test('createProxy (non-array)', () => {
    const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    expect(createPipe(null as any)).toBeNull()
    expect(consoleMock).toHaveBeenCalledTimes(1)
    consoleMock.mockReset()

    expect(createPipe('ok' as any)).toBeTypeOf('string')
    expect(consoleMock).toHaveBeenCalledTimes(1)
    consoleMock.mockReset()

    expect(createPipe({} as any)).toBeTypeOf('object')
    expect(consoleMock).toHaveBeenCalledTimes(1)
    consoleMock.mockReset()
  })

  test('chaining', () => {
    const arr = [1, 2, 3]
    const expected = [2, 4, 6]

    const proxy = createPipe(arr)
    const mapped = proxy.map((i) => i * 2)

    expect(mapped).toStrictEqual(expected)
  })

  test('final operations', () => {
    const arr = [1, 2, 3]
    const expected = [2, 4, 6]
    const result: number[] = []
    const proxy = createPipe(arr)
    proxy.map((i) => i * 2).forEach((i) => result.push(i))

    expect(result).toStrictEqual(expected)
  })

  test('set value', () => {
    const arr = [1, 2, 3, 4, 5, 6]
    const result = createPipe(arr)
      .filter((i) => i % 2 === 0)
      .map((i) => i * 2)

    expect(result).toStrictEqual([4, 8, 12])

    result[1] = 99
    expect(result).toStrictEqual([4, 99, 12])
  })

  test('delete value', () => {
    const arr = [1, 2, 3, 4, 5, 6]
    const result = createPipe(arr)
      .filter((i) => i % 2 === 0)
      .map((i) => i * 2)

    expect(result).toStrictEqual([4, 8, 12])

    delete result[1]
    expect(result).toStrictEqual([4, , 12])
  })

  test('...spread', () => {
    const arr = [1, 2, 3, 4, 5, 6]
    const result = [
      ...createPipe(arr)
        .map((i) => i * 2)
        .map((i) => i / 2)
        .flat(),
    ]

    expect(result).toStrictEqual(arr)
  })
})
