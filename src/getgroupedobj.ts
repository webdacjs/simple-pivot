import { separator } from './settings'

function getMultiFieldFilter(obj: Record<string, unknown>, item: string, groupField: string[]): boolean {
    const itemSplit = item.split(separator)
    return groupField.every((element, i) => obj[element] === itemSplit[i])
}

function groupedFilter(
    data: Record<string, unknown>[],
    item: string,
    groupField: string | string[],
): Record<string, unknown>[] {
    if (Array.isArray(groupField) && groupField.length === 1) {
        return data.filter((x) => x[groupField[0]] === item)
    }
    if (Array.isArray(groupField) && groupField.length > 1) {
        return data.filter((obj) => getMultiFieldFilter(obj, item, [...groupField]))
    }
    return data.filter((x) => x[groupField.toString()] === item)
}

export default function getGroupedObj(
    data: Record<string, unknown>[],
    groupValues: string[],
    groupField: string | string[],
): Record<string, Record<string, unknown>[]> {
    return groupValues.reduce<Record<string, Record<string, unknown>[]>>(
        (obj, item) => ({
            ...obj,
            [item]: groupedFilter(data, item, groupField),
        }),
        {},
    )
}
