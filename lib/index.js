"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pivot_1 = __importDefault(require("./pivot"));
function main(data, pivotconfig) {
    return pivot_1.default(data, pivotconfig);
}
module.exports = main;
