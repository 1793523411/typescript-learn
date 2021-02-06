"use strict";
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a, b, c, d) {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
    }
    else if (c === undefined && d === undefined) {
        c = a;
        d = b;
    }
    return {
        top: a,
        right: b,
        bottom: c,
        left: d
    };
}
console.log(padding(1));
console.log(padding(1, 1));
console.log(padding(1, 1, 1, 1));
function test(a) {
    return a;
}
var demo = test(1);
