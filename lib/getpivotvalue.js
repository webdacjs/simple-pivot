"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const stats = __importStar(require("stats-lite"));
function getPivotValue(valueArray, pivotFunction) {
    const valueArrayNumeric = valueArray.map((val) => +val);
    const fns = {
        count: () => valueArray.filter((x) => x).length,
        counta: () => valueArray.length,
        min: () => valueArrayNumeric.sort()[0],
        max: () => valueArrayNumeric.sort().reverse()[0],
        sum: () => stats.sum(valueArrayNumeric),
        avg: () => stats.mean(valueArrayNumeric),
        average: () => stats.mean(valueArrayNumeric),
        mean: () => stats.mean(valueArrayNumeric),
        median: () => stats.median(valueArrayNumeric),
        mode: () => stats.mode(valueArrayNumeric),
    };
    const availableFns = Object.keys(fns);
    return availableFns.includes(pivotFunction) ? fns[pivotFunction]() : valueArray;
}
exports.default = getPivotValue;
