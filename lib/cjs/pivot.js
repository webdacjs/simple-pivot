"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getpivotvalue_1 = __importDefault(require("./getpivotvalue"));
var getgroupvalues_1 = __importDefault(require("./getgroupvalues"));
var getgroupedobj_1 = __importDefault(require("./getgroupedobj"));
var getGroupValue = function (groupedObj, value) { return groupedObj[value]; };
var getValueFieldArray = function (valueField) {
    return Array.isArray(valueField) ? valueField : [valueField];
};
function getRowValue(value, pivotconfig, groupedObj) {
    var _a;
    var valueFieldObj = getValueFieldArray(pivotconfig.valueField).reduce(function (obj, item) {
        var _a;
        return (__assign({}, obj, (_a = {}, _a[item] = getpivotvalue_1.default(getGroupValue(groupedObj, value).map(function (x) { return x[item]; }), pivotconfig.pivotFunction), _a)));
    }, {});
    var result = __assign((_a = {}, _a[pivotconfig.groupField] = value, _a), valueFieldObj, { pivotFunction: pivotconfig.pivotFunction });
    return result;
}
function default_1(data, pivotconfig) {
    var groupValues = getgroupvalues_1.default(data, pivotconfig.groupField);
    if (groupValues.length === 1 && groupValues[0] === undefined) {
        throw Error("The groupField " + pivotconfig.groupField + " does not exist in the data");
    }
    var groupedObj = getgroupedobj_1.default(data, groupValues, pivotconfig.groupField);
    return groupValues.map(function (value) { return getRowValue(value, pivotconfig, groupedObj); });
}
exports.default = default_1;
