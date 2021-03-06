export default function validate (groupValues: Array<string>, pivotconfig: PivotConfig) {
    if (!groupValues) {
        throw Error(`There is no group values in the data`)
    }
    if (groupValues.length === 1 && groupValues[0] === undefined) {
        throw Error(`The groupField ${pivotconfig.groupField} does not exist in the data`)
    }
    if (!pivotconfig.valueField) {
        throw Error('The valueField is missing.')
    }
}