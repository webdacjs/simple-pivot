import {separator} from './settings'
import arrayCombiner from './arrayCombiner'

function getSingleGroupFieldValues (data: Array<object>, groupField: string) {
    return Array.from(new Set(data.map((x: object) => (<any>x)[groupField])))
}

function getCombinedGroupFieldValues (data: Array<object>, groupField: Array<string>) {
    const arrayOfArrays = groupField.map(field => getSingleGroupFieldValues(data, field))
    const combinedKeys = arrayCombiner(arrayOfArrays, separator)
    return combinedKeys
}
export default function (data: Array<object>, groupField: string | Array<string>) {
    if (Array.isArray(groupField) && groupField.length === 1) {
        return getSingleGroupFieldValues(data, groupField[0])
    }
    else if (Array.isArray(groupField) && groupField.length > 1) {
        return getCombinedGroupFieldValues(data, groupField)
    }
    return getSingleGroupFieldValues(data, groupField.toString())
}
