import type { Prettify } from '../util/Prettify'

export interface ApplyContext<Type> {
  index: number
  array: Type[]
}

export interface Next<Type> {
  (value: Type): void
}

export interface Pipe<In, Out> {
  apply: <This>(this: This, item: In, ctx: ApplyContext<In>, next: Next<Out>) => void
  andThen: <NextOut>(pipe: Pipe<Out, NextOut>) => Pipe<In, NextOut>
}

export type Apply<In, Out> = Pipe<In, Out>['apply']

/**
 * Wraps a function that returns a value, to one that uses next() to pass the value to the next pipe
 */
export const withNext = <In, Out>(applyFn: (item: In, ctx: ApplyContext<In>) => Out) => {
  return (item: In, ctx: ApplyContext<In>, next: Next<Out>) => next(applyFn(item, ctx))
}

export type CreatePipeOptions<In, Out, TargetPipe extends Pipe<In, Out> = Pipe<In, Out>> = Prettify<Partial<TargetPipe> & Pick<TargetPipe, 'apply'>>

export type PipeWrapper<T extends (...arg: Args[]) => ReturnType, Args = unknown[], ReturnType = unknown> = () => Pipe<T, ReturnType>

export function createPipe<In, Out>(options: CreatePipeOptions<In, Out>): Pipe<In, Out> {
  const me = {
    andThen: <
      //
      NextPipe extends Pipe<Out, NextOut>,
      NextOut = NextPipe extends Pipe<any, infer InferredOutputType> ? InferredOutputType : never,
    >(
      pipe: NextPipe
    ) =>
      // chain the pipe
      createPipe<In, NextOut>({
        apply: (item: In, ctx, next) => {
          // calculate the result
          me.apply(item, ctx, (value) => pipe.apply(value, ctx as unknown as ApplyContext<Out>, next))
        },
      }),

    ...options,
  } as Pipe<In, Out>
  return me
}
