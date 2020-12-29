"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const arrayCombiner_1 = __importDefault(require("./arrayCombiner"));
function getSingleGroupFieldValues(data, groupField) {
    return Array.from(new Set(data.map((x) => x[groupField])));
}
function getCombinedGroupFieldValues(data, groupField) {
    const arrayOfArrays = groupField.map(field => getSingleGroupFieldValues(data, field));
    const combinedKeys = arrayCombiner_1.default(arrayOfArrays, settings_1.separator);
    return combinedKeys;
}
function default_1(data, groupField) {
    if (Array.isArray(groupField) && groupField.length === 1) {
        return getSingleGroupFieldValues(data, groupField[0]);
    }
    else if (Array.isArray(groupField) && groupField.length > 1) {
        return getCombinedGroupFieldValues(data, groupField);
    }
    return getSingleGroupFieldValues(data, groupField.toString());
}
exports.default = default_1;
