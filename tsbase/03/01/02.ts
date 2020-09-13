// let和const是JavaScript里相对较新的变量声明方式。 像我们之前提到过的， let在很多方面与var是相似的，但是可以帮助大家避免在JavaScript里常见一些问题。 const是对let的一个增强，它能阻止对一个变量再次赋值。

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

function f2(shouldInitialize: boolean) {
  if (shouldInitialize) {
    var x = 10;
  }

  return x;
}

f2(true); // returns '10'
f2(false); // returns 'undefined'

// 量 x是定义在*if语句里面*，但是我们却可以在语句的外面访问它。 这是因为 var声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问（我们后面会详细介绍），包含它的代码块对此没有什么影响。 有些人称此为* var作用域或函数作用域*。 函数参数也使用函数作用域

// 这些作用域规则可能会引发一些错误。 其中之一就是，多次声明同一个变量并不会报错

function sumMatrix(matrix: number[][]) {
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

let hello = "Hello!";

function f3(input: boolean) {
  let a = 100;

  if (input) {
    // Still okay to reference 'a'
    let b = a + 1;
    return b;
  }

  // Error: 'b' doesn't exist here
  // return b;
}

try {
  throw "oh no!";
} catch (e) {
  console.log("Oh well.");
}

// Error: 'e' doesn't exist here
// console.log(e);

// a++; // illegal to use 'a' before it's declared;
let a;

function f4(x) {
  // let x = 100; // error: interferes with parameter declaration
}

function g() {
  let x = 100;
  // var x = 100; // error: can't have both declarations of 'x'
}

function f5(condition, x) {
  if (condition) {
    let x = 100;
    return x;
  }

  return x;
}

f5(false, 0); // returns 0
f5(true, 0); // returns 100

// 在一个嵌套作用域里引入一个新名字的行为称做屏蔽。 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误。 例如，假设我们现在用 let重写之前的sumMatrix函数

function sumMatrix2(matrix: number[][]) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i];
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i];
    }
  }

  return sum;
}
// 这个版本的循环能得到正确的结果，因为内层循环的i可以屏蔽掉外层循环的i,通常来讲应该避免使用屏蔽，因为我们需要写出清晰的代码。 同时也有些场景适合利用它，你需要好好打算一下。

function theCityThatAlwaysSleeps() {
  let getCity;

  if (true) {
    let city = "Seattle";
    getCity = function () {
      return city;
    };
  }

  return getCity();
}

for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100 * i);
}

const numLivesForCat = 9;
const kitty = {
  name: "Aurora",
  numLives: numLivesForCat,
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

let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

first = input[0];
second = input[1];

// 解构作用于已声明的变量会更好：
// swap variables
[first, second] = [second, first];

function f6([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}
// f6(input);

let [first2, ...rest] = [1, 2, 3, 4];
console.log(first2); // outputs 1
console.log("rest" + rest); // outputs [ 2, 3, 4 ]

let [first3] = [1, 2, 3, 4];
console.log(first3); // outputs 1

let [, second2, , fourth] = [1, 2, 3, 4];

let o = {
  a3: "foo",
  b: 12,
  c: "bar",
};
// let { a3, b } = o;

// 就像数组解构，你可以用没有声明的赋值：

// ({ a, b } = { a: "baz", b: 101 });

// let { a3, ...passthrough } = o;
// let total = passthrough.b + passthrough.c.length;

let { a3: newName1, b: newName2 } = o;

let { a3, b }: { a3: string; b: number } = o;

function keepWholeObject(wholeObject: { a: string; b?: number }) {
  let { a, b = 1001 } = wholeObject;
}
// 现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。

type C = { a: string; b?: number };
function f7({ a, b }: C): void {
  // ...
}

function f8({ a = "", b = 0 } = {}): void {
  // ...
}
f();

function f9({ a, b = 0 } = { a: "" }): void {
  // ...
}
f9({ a: "yes" }); // ok, default b = 0
f9(); // ok, default to {a: ""}, which then defaults b = 0
// f9({}); // error, 'a' is required if you supply an argument

let first0 = [1, 2];
let second0 = [3, 4];
let bothPlus = [0, ...first0, ...second0, 5];

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };

let defaults2 = { food: "spicy", price: "$$", ambiance: "noisy" };
let search2 = { food: "rich", ...defaults };

// 对象展开还有其它一些意想不到的限制。 首先，它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法

class C0 {
  p = 12;
  m() {}
}
let c0 = new C0();
let clone = { ...c0 };
clone.p; // ok
//   clone.m(); // error!

//   其次，TypeScript编译器不允许展开泛型函数上的类型参数。 这个特性会在TypeScript的未来版本中考虑实现。F
