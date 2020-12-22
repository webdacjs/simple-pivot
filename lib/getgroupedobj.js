"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGroupedObj(data, groupValues, groupField) {
    return groupValues.reduce((obj, item) => (Object.assign({}, obj, { [item]: data.filter((x) => x[groupField] === item) })), {});
}
exports.default = getGroupedObj;
