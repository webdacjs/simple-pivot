const {
  validateConfig,
  validateData
} = require('./validate')
const pivot = require('./pivot')

module.exports = function (data, { groupField, valueField, pivotFunction }) {
  validateData(data)
  validateConfig({ groupField, valueField })
  return pivot(data, { groupField, valueField, pivotFunction })
}
