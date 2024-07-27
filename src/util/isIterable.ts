export const isArray = Array.isArray

export const isIterable = <
  //
  Obj extends unknown | undefined,
  Result = Obj extends { [Symbol.iterator]: () => Iterator<unknown> } ? true : false,
>(
  obj: Obj
): Result => ((obj && typeof (obj as never)?.[Symbol.iterator] === 'function') ?? false) as Result
