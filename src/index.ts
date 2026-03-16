import { PivotConfig, PivotConfigWithTree, PivotConfigWithoutTree, TreeResult, PivotResult } from './types'
import pivot from './pivot'

export type { PivotConfig, PivotConfigWithTree, PivotConfigWithoutTree, TreeResult, PivotResult }

export default function simplePivot(data: Record<string, unknown>[], pivotconfig: PivotConfigWithTree): TreeResult
export default function simplePivot(data: Record<string, unknown>[], pivotconfig: PivotConfigWithoutTree): PivotResult
export default function simplePivot(data: Record<string, unknown>[], pivotconfig: PivotConfig): TreeResult | PivotResult
export default function simplePivot(
    data: Record<string, unknown>[],
    pivotconfig: PivotConfig,
): TreeResult | PivotResult {
    return pivot(data, pivotconfig)
}
