// let和const是JavaScript里相对较新的变量声明方式。 像我们之前提到过的， let在很多方面与var是相似的，但是可以帮助大家避免在JavaScript里常见一些问题。 const是对let的一个增强，它能阻止对一个变量再次赋值。
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
function f() {
    var a = 1;
    a = 2;
    var b = g();
    a = 3;
    return b;
    function g() {
        return a;
    }
}
f(); // returns 2
function f2(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}
f2(true); // returns '10'
f2(false); // returns 'undefined'
// 量 x是定义在*if语句里面*，但是我们却可以在语句的外面访问它。 这是因为 var声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问（我们后面会详细介绍），包含它的代码块对此没有什么影响。 有些人称此为* var作用域或函数作用域*。 函数参数也使用函数作用域
// 这些作用域规则可能会引发一些错误。 其中之一就是，多次声明同一个变量并不会报错
function sumMatrix(matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}
// 这里很容易看出一些问题，里层的for循环会覆盖变量i，因为所有i都引用相同的函数作用域内的变量。 有经验的开发者们很清楚，这些问题可能在代码审查时漏掉，引发无穷的麻烦
for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);
    }, 100 * i);
}
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 100 * i);
    })(i);
}
// 这种奇怪的形式我们已经司空见惯了。 参数 i会覆盖for循环里的i，但是因为我们起了同样的名字，所以我们不用怎么改for循环体里的代码
var hello = "Hello!";
function f3(input) {
    var a = 100;
    if (input) {
        // Still okay to reference 'a'
        var b_1 = a + 1;
        return b_1;
    }
    // Error: 'b' doesn't exist here
    // return b;
}
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}
// Error: 'e' doesn't exist here
// console.log(e);
// a++; // illegal to use 'a' before it's declared;
var a;
function f4(x) {
    // let x = 100; // error: interferes with parameter declaration
}
function g() {
    var x = 100;
    // var x = 100; // error: can't have both declarations of 'x'
}
function f5(condition, x) {
    if (condition) {
        var x_1 = 100;
        return x_1;
    }
    return x;
}
f5(false, 0); // returns 0
f5(true, 0); // returns 100
// 在一个嵌套作用域里引入一个新名字的行为称做屏蔽。 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误。 例如，假设我们现在用 let重写之前的sumMatrix函数
function sumMatrix2(matrix) {
    var sum = 0;
    for (var i_1 = 0; i_1 < matrix.length; i_1++) {
        var currentRow = matrix[i_1];
        for (var i_2 = 0; i_2 < currentRow.length; i_2++) {
            sum += currentRow[i_2];
        }
    }
    return sum;
}
// 这个版本的循环能得到正确的结果，因为内层循环的i可以屏蔽掉外层循环的i,通常来讲应该避免使用屏蔽，因为我们需要写出清晰的代码。 同时也有些场景适合利用它，你需要好好打算一下。
function theCityThatAlwaysSleeps() {
    var getCity;
    if (true) {
        var city_1 = "Seattle";
        getCity = function () {
            return city_1;
        };
    }
    return getCity();
}
var _loop_1 = function (i_3) {
    setTimeout(function () {
        console.log(i_3);
    }, 100 * i_3);
};
for (var i_3 = 0; i_3 < 10; i_3++) {
    _loop_1(i_3);
}
var numLivesForCat = 9;
var kitty = {
    name: "Aurora",
    numLives: numLivesForCat
};
// Error
// kitty = {
//     name: "Danielle",
//     numLives: numLivesForCat
// };
// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
// 实际上const变量的内部状态是可修改的。 幸运的是，TypeScript允许你将对象的成员设置成只读的
// 现在我们有两种作用域相似的声明方式，我们自然会问到底应该使用哪个。 与大多数泛泛的问题一样，答案是：依情况而定
// 使用最小特权原则，所有变量除了你计划去修改的都应该使用const。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。 使用 const也可以让我们更容易的推测数据的流动。
var input = [1, 2];
var first = input[0], second = input[1];
console.log(first); // outputs 1
console.log(second); // outputs 2
first = input[0];
second = input[1];
// 解构作用于已声明的变量会更好：
// swap variables
_a = [second, first], first = _a[0], second = _a[1];
function f6(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
// f6(input);
var _b = [1, 2, 3, 4], first2 = _b[0], rest = _b.slice(1);
console.log(first2); // outputs 1
console.log("rest" + rest); // outputs [ 2, 3, 4 ]
var first3 = [1, 2, 3, 4][0];
console.log(first3); // outputs 1
var _c = [1, 2, 3, 4], second2 = _c[1], fourth = _c[3];
var o = {
    a3: "foo",
    b: 12,
    c: "bar"
};
// let { a3, b } = o;
// 就像数组解构，你可以用没有声明的赋值：
// ({ a, b } = { a: "baz", b: 101 });
// let { a3, ...passthrough } = o;
// let total = passthrough.b + passthrough.c.length;
var newName1 = o.a3, newName2 = o.b;
var a3 = o.a3, b = o.b;
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
}
function f7(_a) {
    var a = _a.a, b = _a.b;
    // ...
}
function f8(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.a, a = _c === void 0 ? "" : _c, _d = _b.b, b = _d === void 0 ? 0 : _d;
    // ...
}
f();
function f9(_a) {
    var _b = _a === void 0 ? { a: "" } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
    // ...
}
f9({ a: "yes" }); // ok, default b = 0
f9(); // ok, default to {a: ""}, which then defaults b = 0
// f9({}); // error, 'a' is required if you supply an argument
var first0 = [1, 2];
var second0 = [3, 4];
var bothPlus = __spreadArrays([0], first0, second0, [5]);
var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
var search = __assign(__assign({}, defaults), { food: "rich" });
var defaults2 = { food: "spicy", price: "$$", ambiance: "noisy" };
var search2 = __assign({ food: "rich" }, defaults);
// 对象展开还有其它一些意想不到的限制。 首先，它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法
var C0 = /** @class */ (function () {
    function C0() {
        this.p = 12;
    }
    C0.prototype.m = function () { };
    return C0;
}());
var c0 = new C0();
var clone = __assign({}, c0);
clone.p; // ok
//   clone.m(); // error!
//   其次，TypeScript编译器不允许展开泛型函数上的类型参数。 这个特性会在TypeScript的未来版本中考虑实现。F
