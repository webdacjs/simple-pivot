import getPivotValue from './getpivotvalue'
import getGroupValues from './getgroupvalues'
import getGroupedObj from './getgroupedobj'
import validate from './validate'
import {separator} from './settings'

const isArray = (val: any) => Array.isArray(val)

function getGroupFieldKey (groupField: string | Array<string>): string {
    return isArray(groupField) ? [...groupField].join(separator) : groupField.toString()
}

const getGroupValue = (groupedObj: object, value: string) => (<any>groupedObj)[value]

const getValueFieldArray = (valueField: string | Array<string>) =>
    Array.isArray(valueField) ? valueField : [valueField]

function getRowValue(value: string, pivotconfig: PivotConfig, groupedObj: object) {
    const valueFieldObj = getValueFieldArray(pivotconfig.valueField).reduce(
        (obj, item) => ({
            ...obj,
            [item]: getPivotValue(
                getGroupValue(groupedObj, value).map((x: object) => (<any>x)[item]),
                pivotconfig.pivotFunction,
            ),
        }),
        {},
    )
    // Ignore if all zeros
    const valueFieldObjKeys = Object.keys(valueFieldObj)
    const valueFieldObjKeysEmpty = valueFieldObjKeys.filter(key => !(<any>valueFieldObj)[key])
    if (valueFieldObjKeys.length === valueFieldObjKeysEmpty.length){
        return
    } 

    const result = {
        [getGroupFieldKey(pivotconfig.groupField)]: value,
        ...valueFieldObj,
        pivotFunction: pivotconfig.pivotFunction,
    }
    return result
}

export default function (data: Array<object>, pivotconfig: PivotConfig) {
    const groupValues = getGroupValues(data, pivotconfig.groupField)
    if (!groupValues) {
        return
    }
    validate(groupValues, pivotconfig)
    const groupedObj = getGroupedObj(data, groupValues, pivotconfig.groupField)
    return groupValues.map((value: string) => getRowValue(value, pivotconfig, groupedObj)).filter(x => x)
}
