"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getpivotvalue_1 = __importDefault(require("./getpivotvalue"));
const getgroupvalues_1 = __importDefault(require("./getgroupvalues"));
const getgroupedobj_1 = __importDefault(require("./getgroupedobj"));
const getTreeResults_1 = __importDefault(require("./getTreeResults"));
const validate_1 = __importDefault(require("./validate"));
const settings_1 = require("./settings");
const isArray = (val) => Array.isArray(val);
function getGroupFieldKey(groupField) {
    return isArray(groupField) ? [...groupField].join(settings_1.separator) : groupField.toString();
}
const getGroupValue = (groupedObj, value) => groupedObj[value];
const getValueFieldArray = (valueField) => Array.isArray(valueField) ? valueField : [valueField];
function getRowValue(value, pivotconfig, groupedObj) {
    const { pivotFunction, valueField, groupField } = pivotconfig;
    const valueFieldObj = getValueFieldArray(valueField).reduce((obj, item) => (Object.assign({}, obj, { [item]: getpivotvalue_1.default(getGroupValue(groupedObj, value).map((x) => x[item]), pivotFunction) })), {});
    // Ignore if all zeros
    const valueFieldObjKeys = Object.keys(valueFieldObj);
    const valueFieldObjKeysEmpty = valueFieldObjKeys.filter(key => !valueFieldObj[key]);
    if (valueFieldObjKeys.length === valueFieldObjKeysEmpty.length) {
        return {};
    }
    const result = Object.assign({ [getGroupFieldKey(groupField)]: value }, valueFieldObj, { pivotFunction });
    return result;
}
function default_1(data, pivotconfig) {
    const { groupField, getTree } = pivotconfig;
    const groupValues = getgroupvalues_1.default(data, groupField);
    validate_1.default(groupValues, pivotconfig);
    const groupedObj = getgroupedobj_1.default(data, groupValues, groupField);
    const results = (groupValues).map((value) => getRowValue(value, pivotconfig, groupedObj)).filter(x => x && Object.keys(x).length > 0);
    if (getTree) {
        return getTreeResults_1.default(results);
    }
    return results;
}
exports.default = default_1;
