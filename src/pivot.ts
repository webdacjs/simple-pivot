import { PivotConfig, TreeResult, PivotResult } from './types'
import getPivotValue from './getpivotvalue'
import getGroupValues from './getgroupvalues'
import getGroupedObj from './getgroupedobj'
import getTreeResults from './getTreeResults'
import validate from './validate'
import { separator } from './settings'

function getGroupFieldKey(groupField: string | string[]): string {
    return Array.isArray(groupField) ? [...groupField].join(separator) : groupField.toString()
}

const getGroupValue = (groupedObj: Record<string, Record<string, unknown>[]>, value: string) => groupedObj[value]

const getValueFieldArray = (valueField: string | string[]): string[] =>
    Array.isArray(valueField) ? valueField : [valueField]

function getRowValue(
    value: string,
    pivotconfig: PivotConfig,
    groupedObj: Record<string, Record<string, unknown>[]>,
): Record<string, unknown> {
    const { pivotFunction, valueField, groupField } = pivotconfig
    const valueFieldObj = getValueFieldArray(valueField).reduce<Record<string, unknown>>(
        (obj, item) => ({
            ...obj,
            [item]: getPivotValue(
                getGroupValue(groupedObj, value).map((x) => x[item]),
                pivotFunction,
            ),
        }),
        {},
    )

    // Ignore if all zeros
    const valueFieldObjKeys = Object.keys(valueFieldObj)
    const valueFieldObjKeysEmpty = valueFieldObjKeys.filter((key) => !valueFieldObj[key])
    if (valueFieldObjKeys.length === valueFieldObjKeysEmpty.length) {
        return {}
    }

    return {
        [getGroupFieldKey(groupField)]: value,
        ...valueFieldObj,
        pivotFunction,
    }
}

export default function pivot(data: Record<string, unknown>[], pivotconfig: PivotConfig): TreeResult | PivotResult {
    const { groupField, getTree } = pivotconfig
    const groupValues = getGroupValues(data, groupField)
    validate(groupValues!, pivotconfig)
    const groupedObj = getGroupedObj(data, groupValues!, groupField)
    const results = groupValues!
        .map((value: string) => getRowValue(value, pivotconfig, groupedObj))
        .filter((x) => x && Object.keys(x).length > 0)

    if (getTree) {
        return getTreeResults(results)
    }
    return results
}
