//!接口初探
// TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约

function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

interface LabelledValue2 {
  label: string;
}

function printLabel2(labelledObj: LabelledValue2) {
  console.log(labelledObj.label);
}

// 只要传入的对象满足上面提到的必要条件，那么它就是被允许的
let myObj2 = { size: 10, label: "Size 10 Object" };
printLabel2(myObj2);

//!可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

//!只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!

// 就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
a = ro as number[];

// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly


//!额外的属性检查
// 我们在第一个例子里使用了接口，TypeScript让我们传入{ size: number; label: string; }到仅期望得到{ label: string; }的函数里。 我们已经学过了可选属性，并且知道他们在“option bags”模式里很有用。

// 然而，天真地将这两者结合的话就会像在JavaScript里那样搬起石头砸自己的脚。 比如，拿 createSquare例子来说
interface SquareConfig {
  color?: string;
  width?: number;
}

// interface SquareConfig {
//   color?: string;
//   width?: number;
//   [propName: string]: any;
// }


// function createSquare3(config: SquareConfig): { color: string; area: number } {
//   // ...
// }
// TypeScript会认为这段代码可能存在bug。 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误
// let mySquare3 = createSquare3({ colour: "red", width: 100 });

let mySquare4 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

let squareOptions = { colour: "red", width: 100 };
let mySquare6 = createSquare(squareOptions);


//!函数类型

interface SearchFunc {
  (source: string, subString: string): boolean;
}

// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//   let result = source.search(subString);
//   return result > -1;
// }

// let mySearch: SearchFunc;
// mySearch = function(src: string, sub: string): boolean {
//   let result = src.search(sub);
//   return result > -1;
// }

let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}

//!可索引的类型
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  // [x: number]: Animal;
  [x: string]: Dog;
}

interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray9: ReadonlyStringArray = ["Alice", "Bob"];
// myArray9[2] = "Mallory"; // error!你不能设置myArray[2]，因为索引签名是只读的

//!类类型
//!实现接口

// interface ClockInterface {
//   currentTime: Date;
// }

// class Clock implements ClockInterface {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }


// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date);
// }

// class Clock implements ClockInterface {
//   currentTime: Date;
//   setTime(d: Date) {
//       this.currentTime = d;
//   }
//   constructor(h: number, m: number) { }
// }
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员


//!类静态部分与实例部分的区别
// interface ClockConstructor {
//   new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }
// ?这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内


interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
      console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
      console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
// 因为createClock的第一个参数是ClockConstructor类型，在createClock(AnalogClock, 7, 32)里，会检查AnalogClock是否符合构造函数签名

//!继承接口

// interface Shape {
//   color: string;
// }

// interface Square extends Shape {
//   sideLength: number;
// }

// let square = <Square>{};
// square.color = "blue";
// square.sideLength = 10;


// 一个接口可以继承多个接口，创建出多个接口的合成接口
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

//!混合类型

// 先前我们提过，接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型
// 一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
// 在使用JavaScript第三方库的时候，你可能需要像上面那样去完整地定义类型。

//!接口继承类

// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，**这个接口类型只能被这个类或其子类所实现**（implement）。

// 当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select() { }
// }

class Location2 {

}
// 在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的

// 在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 实际上， SelectableControl接口和拥有select方法的Control类是一样的。 Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image和Location类并不是这样的