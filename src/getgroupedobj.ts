import {separator} from './settings'

const isArray = (val: any) => Array.isArray(val)

function getMultiFieldFilter (obj: object, item: string, groupField: Array<string>) {
    let flag = true
    const itemSplit = item.split(separator)
    groupField.forEach((element, i) => {
        if ((<any>obj)[element] !== itemSplit[i]) {
            flag = false
        }
    })
    return flag
}

function groupedFilter(data: Array<object>, item: string, groupField: string | Array<string>) {
    if (isArray(groupField) && groupField.length === 1) {
        return data.filter((x) => (<any>x)[groupField[0]] === item)
    } else if (isArray(groupField) && groupField.length > 1) {
        return data.filter(obj => getMultiFieldFilter(obj, item, [...groupField]))
    }
    return data.filter((x) => (<any>x)[groupField.toString()] === item)
}

export default function getGroupedObj(data: Array<object>, groupValues: Array<string>, groupField: string | Array<string>): object {
    return groupValues.reduce(
        (obj: object, item: string) => ({
            ...obj,
            [item]: groupedFilter(data, item, groupField)            
        }),
        {},
    )
}
