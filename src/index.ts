import pivot from './pivot'

function main (data: Array<object>, pivotconfig: PivotConfig) {
    return pivot(data, pivotconfig)
}

export = main
