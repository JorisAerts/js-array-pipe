export type ArrayProto<T> = (typeof Array<T>)['prototype']

export type CallBackFn<In, Out = void, This = unknown> = (this: This, value: In, index: number, array: In[]) => Out

export interface Predicate<In> extends CallBackFn<In, boolean | unknown> {}
