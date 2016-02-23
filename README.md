# lodash fp doc generator

This project aims to generate proper docs for `lodash`'s functional programming flavor, aka `lodash/fp`.
The end goal would be generate a doc similar to the [official documentation](https://lodash.com/docs).

## Why

Lodash FP aims to combine the great functionality given by the library and the ideas of functional programming. Only, this behavior is [documented]([FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide)) in a manner unbefitting of what users are used to with the [official documentation](https://lodash.com/docs).

## What changed in FP?

- The order of arguments has been changed, in particular the data argument has been moved to the last position
- No methods mutate the arguments
- Some methods are curried
- Some methods have their arguments capped, meaning some arguments have disappeared
- Some methods with `...values` have that argument now in an array

## What now

Lodash's sources are generated using [`docdown`](https://github.com/jdalton/docdown). What is does is read the source files, extract the JSDoc comments, then generate a Markdown file. By overriding Docdown's behavior, we can change the documentation to, in the methods' signature and example:
- change the order of arguments
- remove now ignored arguments
- group `...values` arguments into an array argument
- remove calls to `console.log()` that aim to demonstrate a value was mutated (only in examples)
- inject optional arguments that have become mandatory using their default value (only in examples)

## Run it

```
npm i
npm run doc:fp
// now open doc/fp.md!
```
