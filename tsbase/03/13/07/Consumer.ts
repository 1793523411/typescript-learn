import t from "./MyClass";
import f from "./MyFunc";
let x = new t();
console.log(f());

// 对用户来说这是最理想的。他们可以随意命名导入模块的类型（本例为t）并且不需要多余的（.）来找到相关对象

import { SomeType, someFunc } from "./MyThings";
let x2 = new SomeType();
let y = someFunc();


import * as myLargeModule from "./MyLargeModule";
let x3 = new myLargeModule.Dog();
