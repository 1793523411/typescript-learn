"use strict";
// 用于创建字符串列表映射至 `K: V` 的函数
function strEnum(o) {
    return o.reduce(function (res, key) {
        res[key] = key;
        return res;
    }, Object.create(null));
}
// 创建 K: V
var Direction = strEnum(["North", "South", "East", "West"]);
console.log(Direction);
// 简单的使用
var sample;
sample = Direction.North; // Okay
sample = "North"; // Okay
//   sample = 'AnythingElse'; // ERROR!
