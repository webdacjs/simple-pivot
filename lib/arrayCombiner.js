"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayCombiner(arrays, separator) {
    const indexes = [];
    const maxIndexes = [];
    const values = [];
    const final = [];
    const stopFactor = arrays.map(x => x.length).reduce((a, b) => a * b);
    for (let arr of arrays) {
        indexes.push(0);
        maxIndexes.push(arr.length - 1);
        values.push(0);
    }
    let i;
    do {
        for (i = 0; i < arrays.length; ++i) {
            values[i] = arrays[i][indexes[i]];
        }
        final.push([...values]);
        if (final.length === stopFactor) {
            return final.map(x => x.join(separator));
        }
        while (i--) {
            if (indexes[i] < maxIndexes[i]) {
                ++indexes[i];
                break;
            }
            else if (i > 0) {
                indexes[i] = 0;
            }
            else {
                return;
            }
        }
    } while (true);
}
exports.default = arrayCombiner;
