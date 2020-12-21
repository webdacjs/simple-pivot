import getPivotValue from './getpivotvalue'
import getGroupValues from './getgroupvalues'
import getGroupedObj from './getgroupedobj'


const getGroupValue = (groupedObj: object, value: string) => (<any>groupedObj)[value]

const getValueFieldArray = (valueField: string | Array<string>) => Array.isArray(valueField)
  ? valueField : [valueField]

function getRowValue (value: string, pivotconfig: PivotConfig, groupedObj: object) {

  const valueFieldObj = getValueFieldArray(pivotconfig.valueField).reduce((obj,item) => ({
        ...obj,
        [item]: getPivotValue(getGroupValue(groupedObj, value).map((x: object) => (<any>x)[item]), pivotconfig.pivotFunction)
      }), {})

  const result = {
    [pivotconfig.groupField]: value,
    ...valueFieldObj,
    pivotFunction: pivotconfig.pivotFunction
  }
  return result
}

export default function (data: Array<object>, pivotconfig: PivotConfig) {
  const groupValues = getGroupValues(data, pivotconfig.groupField)
  if (groupValues.length === 1 && groupValues[0] === undefined) {
    throw Error(`The groupField '${pivotconfig.groupField}' does not exist in the data`)
  }
  const groupedObj = getGroupedObj(data, groupValues, pivotconfig.groupField)
  return groupValues.map((value: string) => getRowValue(value, pivotconfig, groupedObj))
}
