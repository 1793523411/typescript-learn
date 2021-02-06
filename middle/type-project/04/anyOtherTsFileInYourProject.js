"use strict";
// import * as foo from 'foo';
// import foo = require('foo');
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFoo = void 0;
// var bar = foo;
// var bar: foo.bar
function loadFoo() {
    // 这是懒加载 foo，原始的加载仅仅用来做类型注解
    var _foo = require('foo');
    // 现在，你可以使用 `_foo` 替代 `foo` 来作为一个变量使用
}
exports.loadFoo = loadFoo;
