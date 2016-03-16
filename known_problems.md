## Incorrect examples

### concat
Should
```js
_.concat([1], [2, [3], [[4]]]);
// => [ 1, 2, [ 3 ], [ [ 4 ] ] ]
```
Does
```js
// => [ 1, 2, [ 3 ], [ [ 4 ] ] ]
```

### indexOf
https://gist.github.com/jfmengels/6b973b69c491375117dc#_indexofvalue-array
```js
// Search from the `fromIndex`.
_.indexOf([2, 2], [1, 2, 1, 2]);
// => 3
```
`fromIndex` param is ignored in fp, so it should not be grouped in an array. Even with that, the example would not return the expected result though.

### lastIndexOf

Same as indexOf

### intersection
```js
_.intersection([[4, 2], [1, 2]], [2, 1]);
// => Expected [2]
// => Getting []
```
Intersection does not support more than 2 arrays

### union

Same as intersection

### zip

Same as intersection

### unzip

Same as zip, because it is using zip in the example

### unzipWith

Same as zip, because it is using zip in the example

### pullAt
https://gist.github.com/jfmengels/6b973b69c491375117dc#_pullatindexes-array
Too many console.logs removed and nothing remains...

### remove

Same as pullAt

### reverse
Working, but there are useless trailing comments

### without
Issue filed https://github.com/lodash/lodash/issues/2122

### zipWith

Has one argument too many. Could send a PR for it.

### invokeMap
Too many args in example

### reduce
Uses key in cb function, which is capped in FP.

### defer
Uses defer with 2 args, which now only takes one

### now
Uses defer with 2 args, which now only takes one

### ary
Arguments are not switched as expected

### bind, bindKey
`partials` param is ignored in fp, so it should not be grouped in an array. Even with that, the example would not return the expected result though.



#### TODO
Checked up to curry
