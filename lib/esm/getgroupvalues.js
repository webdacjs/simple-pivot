export default function (data, groupField) {
    return Array.from(new Set(data.map(function (x) { return x[groupField]; })));
}
