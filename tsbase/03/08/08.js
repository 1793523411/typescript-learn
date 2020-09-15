// 这节介绍TypeScript里的类型推论。即，类型是在哪里如何被推断的
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
//!基础
// TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型
// let x = 3;
//!最佳通用类型
// 当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型
var x = [0, 1, null];
// 由于最终的通用类型取自候选类型，有些时候候选类型共享相同的通用类型，但是却没有一个类型能做为所有候选类型的类型
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Rhino;
}(Animal));
var Elephant = /** @class */ (function (_super) {
    __extends(Elephant, _super);
    function Elephant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Elephant;
}(Animal));
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Snake;
}(Animal));
var zoo = [new Rhino(), new Elephant(), new Snake()];
var zoo2 = [new Rhino(), new Elephant(), new Snake()];
// 如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)[]
//!上下文类型
// TypeScript类型推论也可能按照相反的方向进行。 这被叫做“按上下文归类”。按上下文归类会发生在表达式的类型与所处的位置相关时
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button); //<- Error
};
// 这个例子会得到一个类型错误，TypeScript类型检查器使用Window.onmousedown函数的类型来推断右边函数表达式的类型。 因此，就能推断出 mouseEvent参数的类型了。 如果函数表达式不是在上下文类型的位置， mouseEvent参数的类型需要指定为any，这样也不会报错了
// 如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button); //<- Now, no error is given
};
// 上下文归类会在很多情况下使用到。 通常包含函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句。 上下文类型也会做为最佳通用类型的候选类型
function createZoo() {
    return [new Rhino(), new Elephant(), new Snake()];
}
// 这个例子里，最佳通用类型有4个候选者：Animal，Rhino，Elephant和Snake。 当然， Animal会被做为最佳通用类型
