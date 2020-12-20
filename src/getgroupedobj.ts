export default function getGroupedObj (data: Array<object>, groupValues: Array<string>, groupField: string): object {
    return groupValues.reduce(
        (obj: object, item: string) => ({
          ...obj,
          [item]: data.filter(x => (<any>x)[groupField] === item)
        }), {})
}
