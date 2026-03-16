// eslint-disable-next-line @typescript-eslint/no-var-requires
const stats = require('stats-lite') as {
    sum(arr: number[]): number
    mean(arr: number[]): number
    median(arr: number[]): number
    mode(arr: number[]): number
}

type PivotResult = number | string[]

export default function getPivotValue(valueArray: unknown[], pivotFunction?: string): PivotResult {
    const valueArrayNumeric = valueArray.map((val) => Number(val))

    const fns: Record<string, () => number> = {
        count: () => valueArray.filter((x) => x != null).length,
        counta: () => valueArray.length,
        min: () => Math.min(...valueArrayNumeric),
        max: () => Math.max(...valueArrayNumeric),
        sum: () => stats.sum(valueArrayNumeric),
        avg: () => stats.mean(valueArrayNumeric),
        average: () => stats.mean(valueArrayNumeric),
        mean: () => stats.mean(valueArrayNumeric),
        median: () => stats.median(valueArrayNumeric),
        mode: () => stats.mode(valueArrayNumeric),
    }

    if (pivotFunction && pivotFunction in fns) {
        return fns[pivotFunction]()
    }

    return valueArray as string[]
}
