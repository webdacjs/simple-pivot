"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const isArray = (val) => Array.isArray(val);
function getMultiFieldFilter(obj, item, groupField) {
    let flag = true;
    const itemSplit = item.split(settings_1.separator);
    groupField.forEach((element, i) => {
        if (obj[element] !== itemSplit[i]) {
            flag = false;
        }
    });
    return flag;
}
function groupedFilter(data, item, groupField) {
    if (isArray(groupField) && groupField.length === 1) {
        return data.filter((x) => x[groupField[0]] === item);
    }
    else if (isArray(groupField) && groupField.length > 1) {
        return data.filter(obj => getMultiFieldFilter(obj, item, [...groupField]));
    }
    return data.filter((x) => x[groupField.toString()] === item);
}
function getGroupedObj(data, groupValues, groupField) {
    return groupValues.reduce((obj, item) => (Object.assign({}, obj, { [item]: groupedFilter(data, item, groupField) })), {});
}
exports.default = getGroupedObj;
