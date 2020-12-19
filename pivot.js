const stats = require('stats-lite')

function getPivotValue (valueArray, pivotFunction) {
  const fns = {
    count: () => valueArray.filter(x => x).length,
    counta: () => valueArray.length,
    min: () => stats.numbers(valueArray).sort()[0],
    max: () => stats.numbers(valueArray).sort().reverse()[0],
    sum: () => stats.sum(valueArray),
    avg: () => stats.mean(valueArray),
    average: () => stats.mean(valueArray),
    mean: () => stats.mean(valueArray),
    median: () => stats.median(valueArray),
    mode: () => stats.mode(valueArray)
  }
  const availableFns = Object.keys(fns)
  return availableFns.includes(pivotFunction)
    ? fns[pivotFunction]()
    : valueArray
}

const getGroupValues = (data, groupField) => Array.from(
  new Set(data.map(x => x[groupField])))

const getGroupedObj = (data, groupValues, groupField, valueField) => groupValues.reduce(
  (obj, item) => {
    obj[item] = data.filter(x => x[groupField] === item).map(x => x[valueField])
    return obj
  }, {})

function getRowValue ({value, groupedObj, groupField, valueField, pivotFunction}) {
  const result = {
    [groupField]: value,
    [valueField]: getPivotValue(groupedObj[value], pivotFunction),
    pivotFunction
  }
  return result
}

module.exports = function (data, { groupField, valueField, pivotFunction }) {
  const groupValues = getGroupValues(data, groupField)
  if (groupValues.length === 1 && groupValues[0] === undefined) {
    throw Error(`The groupField '${groupField}' does not exist in the data`)
  }
  const groupedObj = getGroupedObj(data, groupValues, groupField, valueField)
  return groupValues.map(value => getRowValue({
    value, groupedObj, groupField, valueField, pivotFunction}))
}
