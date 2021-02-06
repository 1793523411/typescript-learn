"use strict";
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
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.meow = function () {
        console.log("cat");
    };
    return Cat;
}(Animal));
var animal = new Animal("animal");
var cat = new Cat("cat");
// 多态
// Animal <= Cat
animal = cat; // ok
// cat = animal; // ERROR: cat 继承于 animal
// 演示每个数组形式
var animalArr = [animal];
var catArr = [cat];
// 明显的坏处，逆变
// Animal <= Cat
// Animal[] >= Cat[]
// catArr = animalArr; // ok, 如有有逆变
catArr[0].meow(); // 允许，但是会在运行时报错
// 另外一个坏处，协变
// Animal <= Cat
// Animal[] <= Cat[]
animalArr = catArr; // ok，协变
animalArr.push(new Animal("another animal")); // 仅仅是 push 一个 animal 至 carArr 里
catArr.forEach(function (c) { return c.meow(); }); // 允许，但是会在运行时报错。
