[![Yarn CI](https://github.com/JorisAerts/js-array-pipe/actions/workflows/yarn.yml/badge.svg)](https://github.com/JorisAerts/js-array-pipe/actions/workflows/yarn.yml)
[![npm version](https://badge.fury.io/js/array-pipe.svg)](https://badge.fury.io/js/array-pipe)

# js-array-pipe

Fully typed JavaScript arrays in a streaming fashion.
Operations on the array will be piped, so that only one iteration is needed when looping the array.
This can help when dealing with very large arrays.

To install array-pipe, run one of the following commands:

```shell 
# npm
npm add array-pipe

# yarn
yarn add array-pipe

# pnpm
pnpm add array-pipe
```

#

The purpose is to have a `stream(array)` which behaves exactly the same as `array`, with differed
operations.

```TypeScript
import {stream} from 'array-pipe'

const proxiedArray = stream([])
    .map(...)
    .filter(...)
    .flatMap(...)

const array = proxiedArray.unproxy()
```

Although `stream(...)` will return an `ArrayPipe<T>` object, it will still be treated as a normal
array:

```TypeScript
import {stream} from 'array-pipe'

assert(Array.isArray(stream([])))
assert(Array.isArray(stream([1, 2, 3])))
```

## Computation

The "computation" of the resulting array, meaning resolving the pipeline,
will happen automatically upon element access
