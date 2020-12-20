"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(data, groupField) {
    return Array.from(new Set(data.map(function (x) { return x[groupField]; })));
}
exports.default = default_1;
