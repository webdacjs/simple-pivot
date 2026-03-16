export interface PivotConfig {
    groupField: string | string[]
    valueField: string | string[]
    pivotFunction?: string
    getTree?: boolean
}

export interface PivotConfigWithTree extends PivotConfig {
    getTree: true
}

export interface PivotConfigWithoutTree extends PivotConfig {
    getTree?: false | undefined
}

export type DeepObject = Record<string, unknown>

export interface FlatTreeResult {
    columns: string[]
    values: unknown[][]
}

export interface NestedTreeResult {
    columns: string[]
    values: DeepObject
}

export type TreeResult = FlatTreeResult | NestedTreeResult

export type PivotResult = Record<string, unknown>[]
