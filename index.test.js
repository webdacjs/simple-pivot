const simplePivot = require('./index.js')
const iris = require('./testData/iris')

test('Testing sum', () => {
  expect.assertions(3)
  const res = simplePivot(
    iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'sum' })
  expect(res[0].species).toBe('setosa')
  expect(parseInt(res[0].petal_width)).toBe(12)
  expect(res[0].pivotFunction).toBe('sum')
})

test('Testing count', () => {
  expect.assertions(3)
  const res = simplePivot(
    iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'count' })
  expect(res[0].species).toBe('setosa')
  expect(res[0].petal_width).toBe(50)
  expect(res[0].pivotFunction).toBe('count')
})

test('Testing average', () => {
  expect.assertions(3)
  const res = simplePivot(
    iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'mean' })
  expect(res[0].species).toBe('setosa')
  expect(res[0].petal_width).toBe(0.2439999999999999)
  expect(res[0].pivotFunction).toBe('mean')
})

test('Testing min', () => {
  expect.assertions(3)
  const res = simplePivot(
    iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'min' })
  expect(res[0].species).toBe('setosa')
  expect(res[0].petal_width).toBe(0.1)
  expect(res[0].pivotFunction).toBe('min')
})

test('Testing max', () => {
  expect.assertions(3)
  const res = simplePivot(
    iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'max' })
  expect(res[0].species).toBe('setosa')
  expect(res[0].petal_width).toBe(0.6)
  expect(res[0].pivotFunction).toBe('max')
})

test('Testing no pivot function (just grouping)', () => {
  expect.assertions(3)
  const res = simplePivot(
    iris, { groupField: 'species', valueField: 'petal_width' })
  expect(res[0].species).toBe('setosa')
  expect(res[0].petal_width.length).toBe(50)
  expect(res[0].pivotFunction).toBe(undefined)
})
