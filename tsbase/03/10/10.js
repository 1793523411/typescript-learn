//!交叉类型
// 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 就是说这个类型的对象同时拥有了这三种类型的成员
// 我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在JavaScript里发生这种情况的场合很多！）
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        console.log("log");
    };
    return ConsoleLogger;
}());
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
console.log(n);
function getSmallPet() {
    return;
}
var pet = getSmallPet();
// console.log(pet)
// pet.layEggs(); // okay
// pet.swim();    // errors
//!类型保护与区分类型
//!用户自定义的类型保护
// 联合类型适合于那些值可以为不同类型的情况
// if (pet.swim) {
//     pet.swim();
// }
// else if (pet.fly) {
//     pet.fly();
// }
//为了让这段代码工作，我们要使用类型断言
// if ((<Fish>pet).swim) {
//   (<Fish>pet).swim();
// } else {
//   (<Bird>pet).fly();
// }
// TypeScript里的 类型保护机制让它成为了现实。 类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词
// function isFish(pet: Fish | Bird): pet is Fish {
//   return (<Fish>pet).swim !== undefined;
// }
// if (isFish(pet)) {
//   pet.swim();
// } else {
//   pet.fly();
// }
//!typeof类型保护
// 现在我们回过头来看看怎么使用联合类型书写 padLeft代码
function isNumber(x) {
    return typeof x === "number";
}
function isString(x) {
    return typeof x === "string";
}
// function padLeft(value: string, padding: string | number) {
//     if (isNumber(padding)) {
//         return Array(padding + 1).join(" ") + value;
//     }
//     if (isString(padding)) {
//         return padding + value;
//     }
//     throw new Error(`Expected string or number, got '${padding}'.`);
// }
// 然而，必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。 幸运的是，现在我们不必将 typeof x === "number"抽象成一个函数，因为TypeScript可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + padding + "'.");
}
var SpaceRepeatingPadder = /** @class */ (function () {
    function SpaceRepeatingPadder(numSpaces) {
        this.numSpaces = numSpaces;
    }
    SpaceRepeatingPadder.prototype.getPaddingString = function () {
        return Array(this.numSpaces + 1).join(" ");
    };
    return SpaceRepeatingPadder;
}());
var StringPadder = /** @class */ (function () {
    function StringPadder(value) {
        this.value = value;
    }
    StringPadder.prototype.getPaddingString = function () {
        return this.value;
    };
    return StringPadder;
}());
function getRandomPadder() {
    return Math.random() < 0.5
        ? new SpaceRepeatingPadder(4)
        : new StringPadder("  ");
}
// 类型为SpaceRepeatingPadder | StringPadder
var padder = getRandomPadder();
if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
// instanceof的右侧要求是一个构造函数，TypeScript将细化为：此构造函数的 prototype属性的类型，如果它的类型不为 any的话,构造签名所返回的类型的联合
//!可以为null的类型
// TypeScript具有两种特殊的类型， null和 undefined，它们分别具有值null和undefined. 我们在[基础类型](./Basic Types.md)一节里已经做过简要说明。 默认情况下，类型检查器认为 null与 undefined可以赋值给任何类型。 null与 undefined是所有其它类型的一个有效值。 这也意味着，你阻止不了将它们赋值给其它类型，就算是你想要阻止这种情况也不行。 null的发明者，Tony Hoare，称它为 价值亿万美金的错误
// let s = "foo";
// s = null; // 错误, 'null'不能赋值给'string'
// let sn: string | null = "bar";
// sn = null; // 可以
// sn = undefined; // error, 'undefined'不能赋值给'string | null'
//!可选参数和可选属性
// 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined
// function f(x: number, y?: number) {
//     return x + (y || 0);
// }
// f(1, 2);
// f(1);
// f(1, undefined);
// f(1, null); // error, 'null' is not assignable to 'number | undefined'
// 可选属性也会有同样的处理
// class C {
//   a: number;
//   b?: number;
// }
// let c = new C();
// c.a = 12;
// c.a = undefined; // error, 'undefined' is not assignable to 'number'
// c.b = 13;
// c.b = undefined; // ok
// c.b = null; // error, 'null' is not assignable to 'number | undefined'
//!类型保护和类型断言
// 由于可以为null的类型是通过联合类型实现，那么你需要使用类型保护来去除 null
function f(sn) {
    if (sn == null) {
        return "default";
    }
    else {
        return sn;
    }
}
function f2(sn) {
    return sn || "default";
}
// 如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除。 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined
function broken(name) {
    function postfix(epithet) {
        return name.charAt(0) + ".  the " + epithet; // error, 'name' is possibly null
    }
    name = name || "Bob";
    return postfix("great");
}
function fixed(name) {
    function postfix(epithet) {
        return name.charAt(0) + ".  the " + epithet; // ok
    }
    name = name || "Bob";
    return postfix("great");
}
function getName(n) {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}
var UIElement = /** @class */ (function () {
    function UIElement() {
    }
    UIElement.prototype.animate = function (dx, dy, easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    };
    return UIElement;
}());
var button = new UIElement();
button.animate(0, 0, "ease-in");
// ... more overloads ...
function createElement(tagName) {
    return;
}
//!数字字面量类型
function rollDie() {
    return;
}
// function area(s: Shape) {
//     switch (s.kind) {
//         case "square": return s.size * s.size;
//         case "rectangle": return s.height * s.width;
//         case "circle": return Math.PI * s.radius ** 2;
//     }
// }
//!完整性检查
// 当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。 比如，如果我们添加了 Triangle到 Shape，我们同时还需要更新 area
// type Shape = Square | Rectangle | Circle | Triangle;
// function area(s: Shape) {
//     switch (s.kind) {
//         case "square": return s.size * s.size;
//         case "rectangle": return s.height * s.width;
//         case "circle": return Math.PI * s.radius ** 2;
//     }
//     // should error here - we didn't handle case "triangle"
// }
// function area(s: Shape): number { // error: returns number | undefined
//     switch (s.kind) {
//         case "square": return s.size * s.size;
//         case "rectangle": return s.height * s.width;
//         case "circle": return Math.PI * s.radius ** 2;
//     }
// }
function assertNever(x) {
    throw new Error("Unexpected object: " + x);
}
function area(s) {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case "circle":
            return Math.PI * Math.pow(s.radius, 2);
        default:
            return assertNever(s); // error here if there are missing cases
    }
}
//!多态的 this类型
var BasicCalculator = /** @class */ (function () {
    function BasicCalculator(value) {
        if (value === void 0) { value = 0; }
        this.value = value;
    }
    BasicCalculator.prototype.currentValue = function () {
        return this.value;
    };
    BasicCalculator.prototype.add = function (operand) {
        this.value += operand;
        return this;
    };
    BasicCalculator.prototype.multiply = function (operand) {
        this.value *= operand;
        return this;
    };
    return BasicCalculator;
}());
var v = new BasicCalculator(2).multiply(5).add(1).currentValue();
// 由于这个类使用了 this类型，你可以继承它，新的类可以直接使用之前的方法，不需要做任何的改变
var ScientificCalculator = /** @class */ (function (_super) {
    __extends(ScientificCalculator, _super);
    function ScientificCalculator(value) {
        if (value === void 0) { value = 0; }
        return _super.call(this, value) || this;
    }
    ScientificCalculator.prototype.sin = function () {
        this.value = Math.sin(this.value);
        return this;
    };
    return ScientificCalculator;
}(BasicCalculator));
var v2 = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
// 如果没有 this类型， ScientificCalculator就不能够在继承 BasicCalculator的同时还保持接口的连贯性。 multiply将会返回 BasicCalculator，它并没有 sin方法。 然而，使用 this类型， multiply会返回 this，在这里就是 ScientificCalculator
//!索引类型
// 使用索引类型，编译器就能够检查使用了动态属性名的代码。 例如，一个常见的JavaScript模式是从对象中选取属性的子集
// function pluck(o, names) {
//     return names.map(n => o[n]);
// }
// 下面是如何在TypeScript里使用此函数，通过 索引类型查询和 索引访问操作符
function pluck(o, names) {
    return names.map(function (n) { return o[n]; });
}
var person = {
    name: "Jarid",
    age: 35
};
var strings = pluck(person, ["name"]); // ok, string[]
// 编译器会检查 name是否真的是 Person的一个属性
// keyof T， 索引类型查询操作符。 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合
var personProps; // 'name' | 'age'
// pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'
// T[K]， 索引访问操作符。 在这里，类型语法反映了表达式语法
function getProperty(o, name) {
    return o[name]; // o[name] is of type T[K]
}
var name2 = getProperty(person, "name");
var age = getProperty(person, "age");
var keys; // string
var value; // number
function proxify(o) {
    // ... wrap proxies ...
    return;
}
// let proxyProps = proxify(props);
//!由映射类型进行推断
// 现在你了解了如何包装一个类型的属性，那么接下来就是如何拆包/
function unproxify(t) {
    var result = {};
    for (var k in t) {
        result[k] = t[k].get();
    }
    return result;
}
function f1(s) {
    return { a: 1, b: s };
}
var C = /** @class */ (function () {
    function C() {
        this.x = 0;
        this.y = 0;
    }
    return C;
}());
// type T23 = InstanceType<string>;  // Error
// type T24 = InstanceType<Function>;  // Error
