import { separator } from './settings'
import arrayCombiner from './arrayCombiner'

function getSingleGroupFieldValues(data: Record<string, unknown>[], groupField: string): string[] {
    return Array.from(new Set(data.map((x) => x[groupField]))) as string[]
}

function getCombinedGroupFieldValues(data: Record<string, unknown>[], groupField: string[]): string[] | undefined {
    const arrayOfArrays = groupField.map((field) => getSingleGroupFieldValues(data, field))
    return arrayCombiner(arrayOfArrays, separator)
}

export default function getGroupValues(
    data: Record<string, unknown>[],
    groupField: string | string[],
): string[] | undefined {
    if (Array.isArray(groupField) && groupField.length === 1) {
        return getSingleGroupFieldValues(data, groupField[0])
    }
    if (Array.isArray(groupField) && groupField.length > 1) {
        return getCombinedGroupFieldValues(data, groupField)
    }
    return getSingleGroupFieldValues(data, groupField.toString())
}
