"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(groupValues, pivotconfig) {
    if (!groupValues) {
        throw Error(`There is no group values in the data`);
    }
    if (groupValues.length === 1 && groupValues[0] === undefined) {
        throw Error(`The groupField ${pivotconfig.groupField} does not exist in the data`);
    }
    if (!pivotconfig.valueField) {
        throw Error('The valueField is missing.');
    }
}
exports.default = validate;
