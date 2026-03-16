import { PivotConfig } from './types'

export default function validate(groupValues: string[], pivotconfig: PivotConfig): void {
    if (!groupValues) {
        throw new Error('There is no group values in the data')
    }
    if (groupValues.length === 1 && groupValues[0] === undefined) {
        throw new Error(`The groupField ${pivotconfig.groupField} does not exist in the data`)
    }
    if (!pivotconfig.valueField) {
        throw new Error('The valueField is missing.')
    }
}
