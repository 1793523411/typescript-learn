"use strict";
function stringOrNumber(foo) {
    if (typeof foo === "number") {
        return foo * foo;
    }
    else if (typeof foo === "string") {
        return "hello " + foo;
    }
}
var overloaded = stringOrNumber;
// 使用
var str = overloaded(""); // str 被推断为 'string'
var num = overloaded(123); // num 被推断为 'number'
