"use strict";
// “声明合并”是指编译器将针对同一个名字的两个独立声明合并为单一声明。 合并后的声明同时拥有原先两个声明的特性。 任何数量的声明都可被合并；不局限于两个声明
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
var box = { height: 5, width: 6, scale: 10 };
// 接口的非函数的成员应该是唯一的。如果它们不是唯一的，那么它们必须是相同的类型,如果两个接口中同时声明了同名的非函数成员且它们的类型不同，则编译器会报错
// 对于函数成员，每个同名函数声明都会被当成这个函数的一个重载。 同时需要注意，当接口 A与后来的接口 A合并时，后面的接口具有更高的优先级
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Sheep = /** @class */ (function (_super) {
    __extends(Sheep, _super);
    function Sheep() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sheep;
}(Animal));
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cat;
}(Animal));
//!合并命名空间
// 对于命名空间里值的合并，如果当前已经存在给定名字的命名空间，那么后来的命名空间的导出成员会被加到已经存在的那个模块里。
var Animals;
(function (Animals) {
    var Zebra = /** @class */ (function () {
        function Zebra() {
        }
        return Zebra;
    }());
    Animals.Zebra = Zebra;
})(Animals || (Animals = {}));
(function (Animals) {
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        return Dog;
    }());
    Animals.Dog = Dog;
})(Animals || (Animals = {}));
// namespace Animals {
//     export interface Legged { numberOfLegs: number; }
//     export class Zebra { }
//     export class Dog { }
// }
// 除了这些合并外，你还需要了解非导出成员是如何处理的。 非导出成员仅在其原有的（合并前的）命名空间内可见。这就是说合并之后，从其它命名空间合并进来的成员无法访问非导出成员
(function (Animal) {
    var haveMuscles = true;
    function animalsHaveMuscles() {
        return haveMuscles;
    }
    Animal.animalsHaveMuscles = animalsHaveMuscles;
})(Animal || (Animal = {}));
(function (Animal) {
    function doAnimalsHaveMuscles() {
        // return haveMuscles;  // Error, because haveMuscles is not accessible here
    }
    Animal.doAnimalsHaveMuscles = doAnimalsHaveMuscles;
})(Animal || (Animal = {}));
//!命名空间与类和函数和枚举类型合并
// 命名空间可以与其它类型的声明进行合并。 只要命名空间的定义符合将要合并类型的定义。合并结果包含两者的声明类型。 TypeScript使用这个功能去实现一些JavaScript里的设计模式
//!合并命名空间和类
var Album = /** @class */ (function () {
    function Album() {
        label: Album.AlbumLabel;
    }
    return Album;
}());
(function (Album) {
    var AlbumLabel = /** @class */ (function () {
        function AlbumLabel() {
        }
        return AlbumLabel;
    }());
    Album.AlbumLabel = AlbumLabel;
})(Album || (Album = {}));
function buildLabel(name) {
    return buildLabel.prefix + name + buildLabel.suffix;
}
(function (buildLabel) {
    buildLabel.suffix = "";
    buildLabel.prefix = "Hello, ";
})(buildLabel || (buildLabel = {}));
console.log(buildLabel("Sam Smith"));
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 4] = "blue";
})(Color || (Color = {}));
(function (Color) {
    function mixColor(colorName) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
    Color.mixColor = mixColor;
})(Color || (Color = {}));
//!非法的合并
// TypeScript并非允许所有的合并。 目前，类不能与其它类或变量合并
//!模块扩展
// map.js
// import { Observable } from "./observable";
// Observable.prototype.map = function (f) {
//     // ... another exercise for the reader
// }
// observable.ts stays the same
// map.ts
// import { Observable } from "./observable";
// declare module "./observable" {
//     interface Observable<T> {
//         map<U>(f: (x: T) => U): Observable<U>;
//     }
// }
// Observable.prototype.map = function (f) {
//     // ... another exercise for the reader
// }
// consumer.ts
// import { Observable } from "./observable";
// import "./map";
// let o: Observable<number>;
// o.map(x => x.toFixed());
//!全局扩展
// observable.ts
var Observable = /** @class */ (function () {
    function Observable() {
    }
    return Observable;
}());
exports.Observable = Observable;
// Array.prototype.toObservable = function () {
//     // ...
// }
