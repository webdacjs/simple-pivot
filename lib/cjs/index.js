"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pivot_1 = __importDefault(require("./pivot"));
function default_1(data, pivotconfig) {
    return pivot_1.default(data, pivotconfig);
}
exports.default = default_1;
