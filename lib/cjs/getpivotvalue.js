"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var stats = __importStar(require("stats-lite"));
function getPivotValue(valueArray, pivotFunction) {
    var valueArrayNumeric = valueArray.map(function (val) { return +val; });
    var fns = {
        count: function () { return valueArrayNumeric.filter(function (x) { return x; }).length; },
        counta: function () { return valueArrayNumeric.length; },
        min: function () { return valueArrayNumeric.sort()[0]; },
        max: function () { return valueArrayNumeric.sort().reverse()[0]; },
        sum: function () { return stats.sum(valueArrayNumeric); },
        avg: function () { return stats.mean(valueArrayNumeric); },
        average: function () { return stats.mean(valueArrayNumeric); },
        mean: function () { return stats.mean(valueArrayNumeric); },
        median: function () { return stats.median(valueArrayNumeric); },
        mode: function () { return stats.mode(valueArrayNumeric); }
    };
    var availableFns = Object.keys(fns);
    return availableFns.includes(pivotFunction)
        ? fns[pivotFunction]()
        : valueArray;
}
exports.default = getPivotValue;
