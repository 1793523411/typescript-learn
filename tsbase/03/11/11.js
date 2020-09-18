// 自ECMAScript 2015起，symbol成为了一种新的原生类型，就像number和string一样。
// symbol类型的值是通过Symbol构造函数创建的
// let sym1 = Symbol();
// let sym2 = Symbol("key"); // 可选的字符串key
// let sym2 = Symbol("key");
// let sym3 = Symbol("key");
// let flag = sym2 === sym3; // false, symbols是唯一的
// console.log(flag);
// let sym = Symbol();
// let obj = {
//     [sym]: "value"
// };
// console.log(obj[sym]); // "value"
var getClassNameSymbol = Symbol();
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[getClassNameSymbol] = function () {
        return "C";
    };
    return C;
}());
var c = new C();
var className = c[getClassNameSymbol](); // "C"
