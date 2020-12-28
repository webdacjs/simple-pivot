"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getpivotvalue_1 = __importDefault(require("./getpivotvalue"));
const getgroupvalues_1 = __importDefault(require("./getgroupvalues"));
const getgroupedobj_1 = __importDefault(require("./getgroupedobj"));
const validate_1 = __importDefault(require("./validate"));
const settings_1 = require("./settings");
const isArray = (val) => Array.isArray(val);
function getGroupFieldKey(groupField) {
    return isArray(groupField) ? [...groupField].join(settings_1.separator) : groupField.toString();
}
const getGroupValue = (groupedObj, value) => groupedObj[value];
const getValueFieldArray = (valueField) => Array.isArray(valueField) ? valueField : [valueField];
function getRowValue(value, pivotconfig, groupedObj) {
    const valueFieldObj = getValueFieldArray(pivotconfig.valueField).reduce((obj, item) => (Object.assign({}, obj, { [item]: getpivotvalue_1.default(getGroupValue(groupedObj, value).map((x) => x[item]), pivotconfig.pivotFunction) })), {});
    // Ignore if all zeros
    const valueFieldObjKeys = Object.keys(valueFieldObj);
    const valueFieldObjKeysEmpty = valueFieldObjKeys.filter(key => !valueFieldObj[key]);
    if (valueFieldObjKeys.length === valueFieldObjKeysEmpty.length) {
        return;
    }
    const result = Object.assign({ [getGroupFieldKey(pivotconfig.groupField)]: value }, valueFieldObj, { pivotFunction: pivotconfig.pivotFunction });
    return result;
}
function default_1(data, pivotconfig) {
    const groupValues = getgroupvalues_1.default(data, pivotconfig.groupField);
    if (!groupValues) {
        return;
    }
    validate_1.default(groupValues, pivotconfig);
    const groupedObj = getgroupedobj_1.default(data, groupValues, pivotconfig.groupField);
    return groupValues.map((value) => getRowValue(value, pivotconfig, groupedObj)).filter(x => x);
}
exports.default = default_1;
