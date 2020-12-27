import simplePivot from '../src/index'
import players from './players.json'

test('Testing sum', () => {
    expect.assertions(5)
    const res = simplePivot(players, { groupField: 'gender', valueField: 'goals', pivotFunction: 'sum' })
    expect(res[0].gender).toBe('male')
    expect(parseInt(res[0].goals)).toBe(15)
    expect(res[1].gender).toBe('female')
    expect(parseInt(res[1].goals)).toBe(22)
    expect(res[0].pivotFunction).toBe('sum')
})

test('Testing sum using array groupfield', () => {
    expect.assertions(5)
    const res = simplePivot(players, { groupField: ['gender'], valueField: 'goals', pivotFunction: 'sum' })
    expect(res[0].gender).toBe('male')
    expect(parseInt(res[0].goals)).toBe(15)
    expect(res[1].gender).toBe('female')
    expect(parseInt(res[1].goals)).toBe(22)
    expect(res[0].pivotFunction).toBe('sum')
})

test('Testing count', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'colour', valueField: 'name', pivotFunction: 'count' })
    expect(res[0].colour).toBe('green')
    expect(res[0].name).toBe(3)
    expect(res[0].pivotFunction).toBe('count')
})

test('Testing counta', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'country', valueField: 'name', pivotFunction: 'counta' })
    expect(res[3].country).toBe('Spain')
    expect(res[3].name).toBe(2)
    expect(res[0].pivotFunction).toBe('counta')
})

test('Testing average (mean)', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'gender', valueField: 'age', pivotFunction: 'mean' })
    expect(res[0].gender).toBe('male')
    expect(res[0].age).toBe(25.333333333333332)
    expect(res[0].pivotFunction).toBe('mean')
})

test('Testing average (avg)', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'gender', valueField: 'age', pivotFunction: 'avg' })
    expect(res[0].gender).toBe('male')
    expect(res[0].age).toBe(25.333333333333332)
    expect(res[0].pivotFunction).toBe('avg')
})

test('Testing average (average)', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'gender', valueField: 'age', pivotFunction: 'average' })
    expect(res[0].gender).toBe('male')
    expect(res[0].age).toBe(25.333333333333332)
    expect(res[0].pivotFunction).toBe('average')
})

test('Testing median', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'gender', valueField: 'age', pivotFunction: 'median' })
    expect(res[0].gender).toBe('male')
    expect(res[0].age).toBe(24)
    expect(res[0].pivotFunction).toBe('median')
})

test('Testing mode', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'gender', valueField: 'age', pivotFunction: 'mode' })
    expect(res[0].gender).toBe('male')
    expect(res[0].age).toBe(23)
    expect(res[0].pivotFunction).toBe('mode')
})

test('Testing min', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'gender', valueField: 'age', pivotFunction: 'min' })
    expect(res[1].gender).toBe('female')
    expect(res[1].age).toBe(19)
    expect(res[1].pivotFunction).toBe('min')
})

test('Testing max', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'gender', valueField: 'age', pivotFunction: 'max' })
    expect(res[0].gender).toBe('male')
    expect(res[0].age).toBe(32)
    expect(res[0].pivotFunction).toBe('max')
})

test('Testing no pivot function (just grouping)', () => {
    expect.assertions(3)
    const res = simplePivot(players, { groupField: 'country', valueField: 'gender' })
    expect(res[0].country).toBe('USA')
    expect(res[0].gender.length).toBe(1)
    expect(res[0].pivotFunction).toBe(undefined)
})

test('Testing sum with value Array', () => {
    expect.assertions(5)
    const res = simplePivot(players, { groupField: 'gender', valueField: ['goals'], pivotFunction: 'sum' })
    expect(res[0].gender).toBe('male')
    expect(parseInt(res[0].goals)).toBe(15)
    expect(res[1].gender).toBe('female')
    expect(parseInt(res[1].goals)).toBe(22)
    expect(res[0].pivotFunction).toBe('sum')
})

test('Testing sum with multiple valueField array', () => {
    expect.assertions(8)
    const res = simplePivot(players, {
        groupField: 'gender',
        valueField: ['shots', 'goals'],
        pivotFunction: 'sum',
    })
    expect(res[0].gender).toBe('male')
    expect(parseInt(res[0].shots)).toBe(44)
    expect(parseInt(res[0].goals)).toBe(15)
    expect(res[0].pivotFunction).toBe('sum')
    expect(res[1].gender).toBe('female')
    expect(parseInt(res[1].shots)).toBe(29)
    expect(parseInt(res[1].goals)).toBe(22)
    expect(res[1].pivotFunction).toBe('sum')
})

// Errors
test('Testing to group for a non existing field', () => {
    expect(() => {
        simplePivot(players, { groupField: 'non-existing', valueField: ['petal_width'], pivotFunction: 'sum' })
    }).toThrow()
})
