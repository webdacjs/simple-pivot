"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getpivotvalue_1 = __importDefault(require("./getpivotvalue"));
const getgroupvalues_1 = __importDefault(require("./getgroupvalues"));
const getgroupedobj_1 = __importDefault(require("./getgroupedobj"));
const validate_1 = __importDefault(require("./validate"));
const getGroupValue = (groupedObj, value) => groupedObj[value];
const getValueFieldArray = (valueField) => Array.isArray(valueField) ? valueField : [valueField];
function getRowValue(value, pivotconfig, groupedObj) {
    const valueFieldObj = getValueFieldArray(pivotconfig.valueField).reduce((obj, item) => (Object.assign({}, obj, { [item]: getpivotvalue_1.default(getGroupValue(groupedObj, value).map((x) => x[item]), pivotconfig.pivotFunction) })), {});
    const result = Object.assign({ [pivotconfig.groupField]: value }, valueFieldObj, { pivotFunction: pivotconfig.pivotFunction });
    return result;
}
function default_1(data, pivotconfig) {
    const groupValues = getgroupvalues_1.default(data, pivotconfig.groupField);
    validate_1.default(groupValues, pivotconfig);
    const groupedObj = getgroupedobj_1.default(data, groupValues, pivotconfig.groupField);
    return groupValues.map((value) => getRowValue(value, pivotconfig, groupedObj));
}
exports.default = default_1;
