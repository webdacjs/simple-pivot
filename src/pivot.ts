import getPivotValue from './getpivotvalue'
import getGroupValues from './getgroupvalues'
import getGroupedObj from './getgroupedobj'
import getTreeResults from './getTreeResults'
import validate from './validate'
import {separator} from './settings'

const isArray = (val: any) => Array.isArray(val)

function getGroupFieldKey (groupField: string | Array<string>): string {
    return isArray(groupField) ? [...groupField].join(separator) : groupField.toString()
}

const getGroupValue = (groupedObj: object, value: string) => (<any>groupedObj)[value]

const getValueFieldArray = (valueField: string | Array<string>) =>
    Array.isArray(valueField) ? valueField : [valueField]

function getRowValue(value: string, pivotconfig: PivotConfig, groupedObj: object): object {
    const {pivotFunction, valueField, groupField} = pivotconfig
    const valueFieldObj = getValueFieldArray(valueField).reduce(
        (obj, item) => ({
            ...obj,
            [item]: getPivotValue(
                getGroupValue(groupedObj, value).map((x: object) => (<any>x)[item]),
                pivotFunction,
            ),
        }),
        {},
    )
    // Ignore if all zeros
    const valueFieldObjKeys = Object.keys(valueFieldObj)
    const valueFieldObjKeysEmpty = valueFieldObjKeys.filter(key => !(<any>valueFieldObj)[key])
    if (valueFieldObjKeys.length === valueFieldObjKeysEmpty.length){
        return {}
    } 
    const result = {
        [getGroupFieldKey(groupField)]: value,
        ...valueFieldObj,
        pivotFunction
    }
    return result
}

export default function (data: Array<object>, pivotconfig: PivotConfig): Array<object> | object {
    const {groupField, getTree} = pivotconfig
    const groupValues = getGroupValues(data, groupField)
    validate(groupValues!, pivotconfig)
    const groupedObj = getGroupedObj(data, groupValues!, groupField)
    const results = (groupValues!).map((value: string) => getRowValue(value, pivotconfig, groupedObj)).filter(
        x => x && Object.keys(x).length > 0)
    if (getTree) {
        return getTreeResults(results)
    }
    return results
}