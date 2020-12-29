"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);
// from: https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return mergeDeep(target, ...sources);
}
function getTreeResults(results) {
    const firstResultKeys = Object.keys(results[0]);
    const firstKey = firstResultKeys[0];
    const columns = [...firstKey.split(settings_1.separator), ...firstResultKeys.slice(1)];
    if (!firstKey.includes(settings_1.separator)) {
        return {
            columns,
            values: results.map(item => columns.map(column => item[column]))
        };
    }
    let outObject = {};
    results.forEach(item => {
        const values = Object.keys(item).slice(1).map(x => item[x]);
        const keys = item[firstKey].split(settings_1.separator);
        let previousObject;
        keys.reverse().forEach((key, i) => {
            if (!previousObject) {
                previousObject = {
                    [key]: values
                };
            }
            else {
                previousObject = {
                    [key]: previousObject
                };
            }
            if (i === keys.length - 1) {
                outObject = mergeDeep(outObject, previousObject);
            }
        });
    });
    return {
        columns,
        values: outObject
    };
}
exports.default = getTreeResults;
