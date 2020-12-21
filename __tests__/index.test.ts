import simplePivot from '../src/index'
import iris from './iris.json'

test('Testing sum', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'sum' })
    expect(res[0].species).toBe('setosa')
    expect(parseInt(res[0].petal_width)).toBe(12)
    expect(res[0].pivotFunction).toBe('sum')
})

test('Testing count', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'count' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width).toBe(50)
    expect(res[0].pivotFunction).toBe('count')
})

test('Testing counta', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'counta' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width).toBe(50)
    expect(res[0].pivotFunction).toBe('counta')
})

test('Testing average (mean)', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'mean' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width).toBe(0.2439999999999999)
    expect(res[0].pivotFunction).toBe('mean')
})

test('Testing average (avg)', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'avg' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width).toBe(0.2439999999999999)
    expect(res[0].pivotFunction).toBe('avg')
})

test('Testing average (average)', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'average' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width).toBe(0.2439999999999999)
    expect(res[0].pivotFunction).toBe('average')
})

test('Testing median', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'median' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width).toBe(0.2)
    expect(res[0].pivotFunction).toBe('median')
})

test('Testing mode', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'mode' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width).toBe(0.2)
    expect(res[0].pivotFunction).toBe('mode')
})

test('Testing min', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'min' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width).toBe(0.1)
    expect(res[0].pivotFunction).toBe('min')
})

test('Testing max', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width', pivotFunction: 'max' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width).toBe(0.6)
    expect(res[0].pivotFunction).toBe('max')
})

test('Testing no pivot function (just grouping)', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: 'petal_width' })
    expect(res[0].species).toBe('setosa')
    expect(res[0].petal_width.length).toBe(50)
    expect(res[0].pivotFunction).toBe(undefined)
})

test('Testing sum with valueField array', () => {
    expect.assertions(3)
    const res = simplePivot(iris, { groupField: 'species', valueField: ['petal_width'], pivotFunction: 'sum' })
    expect(res[0].species).toBe('setosa')
    expect(parseInt(res[0].petal_width)).toBe(12)
    expect(res[0].pivotFunction).toBe('sum')
})

test('Testing sum with multiple valueField array', () => {
    expect.assertions(4)
    const res = simplePivot(iris, {
        groupField: 'species',
        valueField: ['petal_width', 'petal_length'],
        pivotFunction: 'sum',
    })
    expect(res[0].species).toBe('setosa')
    expect(parseInt(res[0].petal_width)).toBe(12)
    expect(parseInt(res[0].petal_length)).toBe(73)
    expect(res[0].pivotFunction).toBe('sum')
})

// Errors
test('Testing to group for a non existing field', () => {
    expect(() => {
        simplePivot(iris, { groupField: 'non-existing', valueField: ['petal_width'], pivotFunction: 'sum' })
    }).toThrow()
})
