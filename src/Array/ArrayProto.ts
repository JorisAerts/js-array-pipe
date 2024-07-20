export type ArrayProto<T> = (typeof Array<T>)['prototype']

export type CallBackFn<In, Out = void> = (value: In, index: number, array: In[]) => Out

export interface Predicate<In> extends CallBackFn<In, boolean | unknown> {}
