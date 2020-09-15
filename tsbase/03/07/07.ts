// 使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举

//!数字枚举
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

enum Direction2 {
    Up,
    Down,
    Left,
    Right,
}


console.log(Direction)
console.log(Direction2)

enum Response2 {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response2): void {
    console.log(recipient)
    console.log(message)
}

respond("Princess Caroline", Response2.Yes)

// 数字枚举可以被混入到 计算过的和常量成员（如下所示）。 简短地说，不带初始化器的枚举或者被放在第一的位置，或者被放在使用了数字常量或其它常量初始化了的枚举后面。 换句话说，下面的情况是不被允许的
function getSomeValue():number{
    return 1
}
// enum E {
//     C,
//     A = getSomeValue(),
//     // B, // error! 'A' is not constant-initialized, so 'B' needs an initializer
// }


//!字符串枚举
enum Direction1 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
// 由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息（尽管 反向映射会有所帮助），字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字

//!异构枚举（Heterogeneous enums）
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
// ???除非你真的想要利用JavaScript运行时的行为，否则我们不建议这样做

//!计算的和常量成员
// 每个枚举成员都带有一个值，它可以是 常量或 计算出来的。 当满足如下条件时，枚举成员被当作是常量:
// 它是枚举的第一个成员且没有初始化器，这种情况下它被赋予值 0
// 它不带有初始化器且它之前的枚举成员是一个 数字常量。 这种情况下，当前枚举成员的值为它上一个枚举成员的值加1


// E.X is constant:
// enum E { X }

// All enum members in 'E1' and 'E2' are constant.

enum E1 { X, Y, Z }

enum E2 {
    A = 1, B, C
}

// 枚举成员使用 常量枚举表达式初始化。 常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。 当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：

//     一个枚举表达式字面量（主要是字符串字面量或数字字面量）
//     一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
//     带括号的常量枚举表达式
//     一元运算符 +, -, ~其中之一应用在了常量枚举表达式
//     常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。 若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}


//!联合枚举与枚举成员的类型
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

let c: Circle = {
    // kind: ShapeKind.Square,
    kind: ShapeKind.Circle,
    //    ~~~~~~~~~~~~~~~~ Error!
    radius: 100,
}


// enum E {
//     Foo,
//     Bar,
// }

// function f(x: E) {
//     // if (x !== E.Foo || x !== E.Bar) {
//     //     //             ~~~~~~~~~~~
//     //     // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
//     // }
// }

//!运行时的枚举
enum E {
    X, Y, Z
}
function f(obj: { X: number }) {
    return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
console.log(f(E))


//!反向映射

// enum Enum {
//     A
// }
// let a = Enum.A;
// let nameOfA = Enum[a]; // "A"

// console.log(a)
// console.log(nameOfA)

// 要注意的是 不会为字符串枚举成员生成反向映射

//!const枚举

// const enum Enum {
//     A = 1,
//     B = A * 2
// }
// 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员

const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
console.log(directions)
// console.log(Directions)//error
//!外部枚举
// 外部枚举用来描述已经存在的枚举类型的形状
declare enum Enum {
    A = 1,
    B,
    C = 2
}
// console.log(Enum)//Emun is undefined
//外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的