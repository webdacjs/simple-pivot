import { separator } from './settings'
import { DeepObject, FlatTreeResult, NestedTreeResult } from './types'

function isObject(item: unknown): item is DeepObject {
    return item !== null && typeof item === 'object' && !Array.isArray(item)
}

// from: https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(target: DeepObject, ...sources: DeepObject[]): DeepObject {
    if (!sources.length) return target
    const source = sources.shift()

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} })
                mergeDeep(target[key] as DeepObject, source[key] as DeepObject)
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }
    return mergeDeep(target, ...sources)
}

export default function getTreeResults(results: Record<string, unknown>[]): FlatTreeResult | NestedTreeResult {
    const firstResultKeys = Object.keys(results[0])
    const firstKey = firstResultKeys[0]
    const columns = [...firstKey.split(separator), ...firstResultKeys.slice(1)]

    if (!firstKey.includes(separator)) {
        return {
            columns,
            values: results.map((item) => columns.map((column) => item[column])),
        }
    }

    let outObject: DeepObject = {}
    for (const item of results) {
        const values = Object.keys(item)
            .slice(1)
            .map((x) => item[x])
        const keys = (item[firstKey] as string).split(separator)
        let previousObject: DeepObject | undefined

        keys.reverse().forEach((key: string, i: number) => {
            if (!previousObject) {
                previousObject = { [key]: values }
            } else {
                previousObject = { [key]: previousObject }
            }
            if (i === keys.length - 1) {
                outObject = mergeDeep(outObject, previousObject)
            }
        })
    }

    return {
        columns,
        values: outObject,
    }
}
