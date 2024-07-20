export const isNumber = <Type, Ret = Type extends number ? true : false>(val: Type): Ret => (typeof val === 'number') as Ret

export const isNumberOr = <Type>(val: Type, defaultValue: number) => (isNumber(val) ? val : defaultValue)
