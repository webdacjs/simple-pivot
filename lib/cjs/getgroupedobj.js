"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function getGroupedObj(data, groupValues, groupField) {
    return groupValues.reduce(function (obj, item) {
        var _a;
        return (__assign({}, obj, (_a = {}, _a[item] = data.filter(function (x) { return x[groupField] === item; }), _a)));
    }, {});
}
exports.default = getGroupedObj;
