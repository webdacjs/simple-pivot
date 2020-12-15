# Simple Pivot

This module performs simple pivot operations over an array of objects, to aggregate the data from one field using the values from another field and applying the aggregation function desired.

You always need to provide:

- An array of objects
- A configuration object including: `groupField`, `valueField` and `pivotFunction` (optional)

Let me give you an example. Lets say you have a transaction list with the following items:

```js
const transactions = [
    {
      date: '2020-01-01',
      amount: 10,
      category: 'Food'
    },
    {
      date: '2020-01-02',
      amount: 20,
      category: 'Food'
    },
    {
      date: '2020-01-03',
      amount: 20,
      category: 'Movies'
    }
]
```
 You can use the module to aggregate the transactions by a field (ie. amount by category):

```js
simplePivot(transactions, {groupField: 'category', valueField: 'amount'})
[
  { category: 'Food', amount: [ 10, 20 ], pivotFunction: undefined },
  { category: 'Movies', amount: [ 20 ], pivotFunction: undefined }
]
```

or `sum` them:

```js
simplePivot(transactions, {groupField: 'category', valueField: 'amount', pivotFunction: 'sum'})
[
  { category: 'Food', amount: 30, pivotFunction: 'sum' },
  { category: 'Movies', amount: 20, pivotFunction: 'sum' }
```

or find the `average`:

```js

simplePivot(transactions, {groupField: 'category', valueField: 'amount', pivotFunction: 'average'})
[
  { category: 'Food', amount: 15, pivotFunction: 'avg' },
  { category: 'Movies', amount: 20, pivotFunction: 'avg' }
]

```

You can check in the `pivot.js` file all the aggregation functions supported.


### Running tests

You can run the tests and check the functionality of this module using:

```sh
$ npm install && npm test
```

### License

Copyright © 2020, [Juan Convers](https://juanconvers.com).
Released under the [MIT License](LICENSE).