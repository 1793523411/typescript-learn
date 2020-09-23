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
