[![Yarn CI](https://github.com/JorisAerts/js-array-pipe/actions/workflows/yarn.yml/badge.svg)](https://github.com/JorisAerts/js-array-pipe/actions/workflows/yarn.yml)
[![npm version](https://badge.fury.io/js/array-pipe.svg)](https://www.npmjs.com/package/array-pipe)

# js-array-pipe

`array-pipe` provides functionality that pipes array operations — when possible —
to avoid unnecessary intermediate processing of the array, when chaining operations.

JavaScript engines are really fast when performing these chained operations,
but when an array becomes really large and may even need to be processed many times,
then saving on iterations may become crucial to optimize cpu usage.

## Installation

To install array-pipe, run one of the following commands:

```shell 
# npm
npm add array-pipe

# yarn
yarn add array-pipe

# pnpm
pnpm add array-pipe
```

## Usage

Just wrap your array in a `stream()` and everything else stays the same.
To access the underlying, computed array, call `.unproxy()`.

```TypeScript
import {stream} from 'array-pipe'

const arrayPipe = stream([])
    .map(...)
    .filter(...)
    .flatMap(...)

const array = arrayPipe.unproxy()
```

Although `stream(...)` returns an `ArrayPipe<T>` object, it will still be treated
as a native JavaScript array:

```TypeScript
import {stream} from 'array-pipe'

assert(Array.isArray(stream([])))
assert(Array.isArray(stream([1, 2, 3])))
```

## Computation

The array is computed — using the pipes — upon element access on the ArrayPipe.
The result of this computation is then cached,
so that later element access doesn't need additional calculation anymore.
