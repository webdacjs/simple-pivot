import * as stats from 'stats-lite'

export default function getPivotValue(valueArray: Array<object>, pivotFunction: string) {
    const valueArrayNumeric = valueArray.map((val) => +val)
    const fns: { [functionName: string]: Function } = {
        count: () => valueArrayNumeric.filter((x) => x).length,
        counta: () => valueArrayNumeric.length,
        min: () => valueArrayNumeric.sort()[0],
        max: () => valueArrayNumeric.sort().reverse()[0],
        sum: () => stats.sum(valueArrayNumeric),
        avg: () => stats.mean(valueArrayNumeric),
        average: () => stats.mean(valueArrayNumeric),
        mean: () => stats.mean(valueArrayNumeric),
        median: () => stats.median(valueArrayNumeric),
        mode: () => stats.mode(valueArrayNumeric),
    }
    const availableFns = Object.keys(fns)
    return availableFns.includes(pivotFunction) ? fns[pivotFunction]() : valueArray
}
