
function validateConfig ({ groupField, valueField }) {
  const validateResults = []
  if (!groupField) {
    validateResults.push('groupField')
  }
  if (!valueField) {
    validateResults.push('valueField')
  }
  if (validateResults.length > 0) {
    throw Error(`'${validateResults.join(',')}' missing in the config object`)
  }
}

function validateData (data) {
  if (!Array.isArray(data)) {
    throw Error('The data is not an array')
  }
}

module.exports = {
  validateConfig,
  validateData
}
