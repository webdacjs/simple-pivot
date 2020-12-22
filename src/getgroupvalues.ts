export default function (data: Array<object>, groupField: string) {
    return Array.from(new Set(data.map((x: object) => (<any>x)[groupField])))
}
