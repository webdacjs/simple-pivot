

function getSingleGroupFieldValues (data: Array<object>, groupField: string) {
    return Array.from(new Set(data.map((x: object) => (<any>x)[groupField])))
}

export default function (data: Array<object>, groupField: string | Array<string>) {
    if (!Array.isArray(groupField)) {
        return getSingleGroupFieldValues(data, groupField)
    }
    if (Array.isArray(groupField) && groupField.length === 1) {
        return getSingleGroupFieldValues(data, groupField[0])
    }
}
