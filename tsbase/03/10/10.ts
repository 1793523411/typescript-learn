//!交叉类型
// 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 就是说这个类型的对象同时拥有了这三种类型的成员
// 我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在JavaScript里发生这种情况的场合很多！）

function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}

class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
    console.log("log");
  }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
console.log(n);

//!联合类型（Union Types）

// 联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入 number或 string类型的参数
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
// function padLeft(value: string, padding: any) {
//     if (typeof padding === "number") {
//         return Array(padding + 1).join(" ") + value;
//     }
//     if (typeof padding === "string") {
//         return padding + value;
//     }
//     throw new Error(`Expected string or number, got '${padding}'.`);
// }

// padLeft("Hello world", 4); // returns "    Hello world"

// function padLeft2(value: string, padding: string | number) {
//     return
// }

// let indentedString = padLeft2("Hello world", true); // errors during compilation
// 联合类型表示一个值可以是几种类型之一。 我们用竖线（ |）分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  return;
}

let pet = getSmallPet();
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
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
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
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

//!instanceof类型保护
// instanceof类型保护是通过构造函数来细化类型的一种方式。 比如，我们借鉴一下之前字符串填充的例子
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

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
function f(sn: string | null): string {
  if (sn == null) {
    return "default";
  } else {
    return sn;
  }
}

function f2(sn: string | null): string {
  return sn || "default";
}
// 如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除。 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined

function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + ".  the " + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + ".  the " + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}
// 本例使用了嵌套函数，因为编译器无法去除嵌套函数的null（除非是立即调用的函数表达式）。 因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数做为外层函数的返回值。 如果无法知道函数在哪里被调用，就无法知道调用时 name的类型

//!类型别名
// 类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
// 同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入
type Container<T> = { value: T };

// 我们也可以使用类型别名来在属性里引用自己：
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};
// 与交叉类型一起使用，我们可以创建出一些十分稀奇古怪的类型。

type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
  name: string;
}

// var people: LinkedList<Person>;
// var s = people.name;
// var s = people.next.name;
// var s = people.next.next.name;
// var s = people.next.next.next.name;

// 然而，类型别名不能出现在声明右侧的任何地方
// type Yikes = Array<Yikes>; // error

//!接口 vs. 类型别名

type Alias = { num: number };
interface Interface {
  num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;

// 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）,因为 软件中的对象应该对于扩展是开放的，但是对于修改是封闭的，你应该尽量去使用接口代替类型别名

// 另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名

//!字符串字面量类型

// 字符串字面量类型允许你指定字符串必须的固定值。 在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合,通过结合使用这些特性，你可以实现类似枚举类型的字符串

type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // error! should not pass null or undefined.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
  return;
}

//!数字字面量类型

function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
  return;
}

// function foo(x: number) {
//     if (x !== 1 || x !== 2) {
//         //         ~~~~~~~
//         // Operator '!==' cannot be applied to types '1' and '2'.
//     }
// }
// 换句话说，当 x与 2进行比较的时候，它的值必须为 1，这就意味着上面的比较检查是非法的

//!枚举成员类型

// 如我们在 枚举一节里提到的，当每个枚举成员都是用字面量初始化的时候枚举成员是具有类型的。

// 在我们谈及“单例类型”的时候，多数是指枚举成员类型和数字/字符串字面量类型，尽管大多数用户会互换使用“单例类型”和“字面量类型

//!可辨识联合

// 你可以合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合的高级模式，它也称做 标签联合或 代数数据类型。 可辨识联合在函数式编程很有用处。 一些语言会自动地为你辨识联合；而TypeScript则基于已有的JavaScript模式。 它具有3个要素：

//     具有普通的单例类型属性— 可辨识的特征。
//     一个类型别名包含了那些类型的联合— 联合。
//     此属性上的类型保护。

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
// 每个接口都有 kind属性但有不同的字符串字面量类型。 kind属性称做 可辨识的特征或 标签。 其它的属性则特定于各个接口。 注意，目前各个接口间是没有联系的
type Shape = Square | Rectangle | Circle;

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

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
      return assertNever(s); // error here if there are missing cases
  }
}

//!多态的 this类型

class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ... other operations go here ...
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue();

// 由于这个类使用了 this类型，你可以继承它，新的类可以直接使用之前的方法，不需要做任何的改变
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
  // ... other operations go here ...
}

let v2 = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
// 如果没有 this类型， ScientificCalculator就不能够在继承 BasicCalculator的同时还保持接口的连贯性。 multiply将会返回 BasicCalculator，它并没有 sin方法。 然而，使用 this类型， multiply会返回 this，在这里就是 ScientificCalculator

//!索引类型

// 使用索引类型，编译器就能够检查使用了动态属性名的代码。 例如，一个常见的JavaScript模式是从对象中选取属性的子集

// function pluck(o, names) {
//     return names.map(n => o[n]);
// }

// 下面是如何在TypeScript里使用此函数，通过 索引类型查询和 索引访问操作符
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n]);
}

interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: "Jarid",
  age: 35,
};
let strings: string[] = pluck(person, ["name"]); // ok, string[]
// 编译器会检查 name是否真的是 Person的一个属性

// keyof T， 索引类型查询操作符。 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合
let personProps: keyof Person; // 'name' | 'age'

// pluck(person, ['age', 'unknown']); // error, 'unknown' is not in 'name' | 'age'

// T[K]， 索引访问操作符。 在这里，类型语法反映了表达式语法
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}

let name2: string = getProperty(person, "name");
let age: number = getProperty(person, "age");
// let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'

//!索引类型和字符串索引签名

interface Map<T> {
  [key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>["foo"]; // number

//!映射类型

// 一个常见的任务是将一个已知的类型每个属性都变为可选的
interface PersonPartial {
  name?: string;
  age?: number;
}

interface PersonReadonly {
  readonly name: string;
  readonly age: number;
}

type Readonly2<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial2<T> = {
    [P in keyof T]?: T[P];
}

type PersonPartial2 = Partial2<Person>;
type ReadonlyPerson = Readonly2<Person>;

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

// let a:Flags = {"option1":true,"option2":false}

type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerson = { [P in keyof Person]?: Person[P] }

type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial1<T> = { [P in keyof T]?: T[P] }

type Proxy<T> = {
    get(): T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {
   // ... wrap proxies ...
   return
}
// let proxyProps = proxify(props);

//!由映射类型进行推断

// 现在你了解了如何包装一个类型的属性，那么接下来就是如何拆包/

function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}

// let originalProps = unproxify(proxyProps);
// 注意这个拆包推断只适用于同态的映射类型。 如果映射类型不是同态的，那么需要给拆包函数一个明确的类型参数

//!预定义的有条件类型
// TypeScript 2.8在lib.d.ts里增加了一些预定义的有条件类型：

//     Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
//     Extract<T, U> -- 提取T中可以赋值给U的类型。
//     NonNullable<T> -- 从T中剔除null和undefined。
//     ReturnType<T> -- 获取函数返回值类型。
//     InstanceType<T> -- 获取构造函数类型的实例类型。

type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
    return { a: 1, b: s };
}

class C {
    x = 0;
    y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
// type T17 = ReturnType<string>;  // Error
// type T18 = ReturnType<Function>;  // Error

type T20 = InstanceType<typeof C>;  // C
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
// type T23 = InstanceType<string>;  // Error
// type T24 = InstanceType<Function>;  // Error
