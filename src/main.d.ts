interface PivotConfig {
    groupField: string | Array<string>
    valueField: string | Array<string>
    pivotFunction: string
    getTree: boolean
}
