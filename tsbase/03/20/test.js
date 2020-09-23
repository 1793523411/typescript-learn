//用JSDoc类型表示类型信息
/** @type {number} */
var x;

x = 0; // OK
x = false; // Error: boolean is not assignable to number

//属性的推断来自于类内的赋值语句
class C {
  constructor() {
    this.constructorOnly = 0;
    this.constructorUnknown = undefined;
  }
  method() {
    this.constructorOnly = false; // error, constructorOnly is a number
    this.constructorUnknown = "plunkbat"; // ok, constructorUnknown is string | undefined
    this.methodOnly = "ok"; // ok, but y could also be undefined
  }
  method2() {
    this.methodOnly = true; // also, ok, y's type is string | boolean | undefined
  }
}

class C {
  constructor() {
    /** @type {number | undefined} */
    this.prop = undefined;
    /** @type {number | undefined} */
    this.count;
  }
}

let c = new C();
c.prop = 0; // OK
c.count = "string"; // Error: string is not assignable to number|undefined

//构造函数等同于类

function C() {
  this.constructorOnly = 0;
  this.constructorUnknown = undefined;
}
C.prototype.method = function () {
  this.constructorOnly = false; // error
  this.constructorUnknown = "plunkbat"; // OK, the type is string | undefined
};

//支持CommonJS模块

// same as `import module "fs"`
const fs = require("fs");

// same as `export function readFile`
module.exports.readFile = function (f) {
  return fs.readFileSync(f);
};

// 类，函数和对象字面量是命名空间

class C {}
C.D = class {};

function Outer() {
  this.y = 2;
}
Outer.Inner = function () {
  this.yy = 2;
};

var ns = {};
ns.C = class {};
ns.func = function () {};

// 立即调用的函数表达式
var ns = (function (n) {
  return n || {};
})();
ns.CONST = 1;

// defaulting to global
var assign =
  assign ||
  function () {
    // code goes here
  };
assign.extra = 1;

//对象字面量是开放的

var obj = { a: 1 };
obj.b = 2; // Allowed

/** @type {{a: number}} */
var obj = { a: 1 };
obj.b = 2; // Error, type {a: number} does not have property b

//null，undefined，和空数组的类型是any或any[]

function Foo(i = null) {
  if (!i) i = 1;
  var j = undefined;
  j = 2;
  this.l = [];
}
var foo = new Foo();
foo.l.push(foo.i);
foo.l.push("end");

//!由于在ES2015之前无法指定可选参数，因此.js文件里所有函数参数都被当做是可选的。 使用比预期少的参数调用函数是允许的
function bar(a, b) {
  console.log(a + " " + b);
}

bar(1); // OK, second argument considered optional
bar(1, 2);
bar(1, 2, 3); // Error, too many arguments

/**
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(somebody) {
  if (!somebody) {
    somebody = "John Doe";
  }
  console.log("Hello " + somebody);
}

sayHello();

//由arguments推断出的var-args参数声明

/** @param {...number} args */
function sum(/* numbers */) {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}


//!未指定的类型参数默认为any

// import { Component } from "react";

// class MyComponent extends Component {
//     render() {
//         this.props.b; // Allowed, since this.props is of type any
//     }
// }

// import { Component } from "react";

// /**
//  * @augments {Component<{a: number}, State>}
//  */
// class MyComponent extends Component {
//     render() {
//         this.props.b; // Error: b does not exist on {a:number}
//     }
// }

// 在JSDoc引用中：JSDoc里未指定的类型参数默认为any：
/** @type{Array} */
var x = [];

x.push(1);        // OK
x.push("string"); // OK, x is of type Array<any>

/** @type{Array.<number>} */
var y = [];

y.push(1);        // OK
y.push("string"); // Error, string is not assignable to number

// 在函数调用中
var p = new Promise((resolve, reject) => { reject() });

p; // Promise<any>;

// 支持的JSDoc


// @param语法和@type相同，但增加了一个参数名。 使用[]可以把参数声明为可选的,@return:函数的返回值类型也是类似的
// @typedef可以用来声明复杂类型。 和@param类似的语法
// @callback与@typedef相似，但它指定函数类型而不是对象类型
// 使用@template声明泛型
// 编译器通过this属性的赋值来推断构造函数，但你可以让检查更严格提示更友好，你可以添加一个@constructor标记
//编译器通常可以通过上下文来推断出this的类型。但你可以使用@this来明确指定它的类型
// 当JavaScript类继承了一个基类，无处指定类型参数的类型。而@extends标记提供了这样一种方式,注意@extends只作用于类。当前，无法实现构造函数继承类的情况。
// @enum标记允许你创建一个对象字面量，它的成员都有确定的类型。不同于JavaScript里大多数的对象字面量，它不允许添加额外成员