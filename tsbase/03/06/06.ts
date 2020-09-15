// 软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能,在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件

//!泛型之Hello World
// function identity(arg: number): number {
//     return arg;
// }

function identity2(arg: any): any {
    return arg;
}
// 使用any类型会导致这个函数可以接收任何类型的arg参数，这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。如果我们传入一个数字，我们只知道任何类型的值都有可能被返回
// 因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。

function identity3<T>(arg: T): T {
    return arg;
}


// 我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数
let output = identity3<string>("myString");  // type of output will be 'string'
// 第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型：
let output2 = identity3("myString");  // type of output will be 'string'
// 我们没必要使用尖括号（<>）来明确地传入类型；编译器可以查看myString的值，然后把T设置为它的类型。 类型推论帮助我们保持代码精简和高可读性。如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入T的类型，在一些复杂的情况下，这是可能出现的


//!使用泛型变量
// 使用泛型创建像identity这样的泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型。 换句话说，你必须把这些参数当做是任意或所有类型
function identity4<T>(arg: T): T {
    return arg;
}

function loggingIdentity<T>(arg: T): T {
    // console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
function loggingIdentity2<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
function loggingIdentity3<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

//!泛型类型
// function identity<T>(arg: T): T {
//     return arg;
// }

// let myIdentity: <T>(arg: T) => T = identity;

// function identity<T>(arg: T): T {
//     return arg;
// }

// let myIdentity: <U>(arg: U) => U = identity;

// //我们还可以使用带有调用签名的对象字面量来定义泛型函数
// function identity<T>(arg: T): T {
//     return arg;
// }

// let myIdentity: {<T>(arg: T): T} = identity;
//!泛型接口
// 这引导我们去写第一个泛型接口了。 我们把上面例子里的对象字面量拿出来做为一个接口
// interface GenericIdentityFn {
//     <T>(arg: T): T;
// }

// function identity<T>(arg: T): T {
//     return arg;
// }

// let myIdentity: GenericIdentityFn = identity;

interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
// 对于描述哪部分类型属于泛型部分来说，理解何时把参数放在调用签名里和何时放在接口上是很有帮助的

// 除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间
//!泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
// 与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型
// 我们在类那节说过，类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型

//!泛型约束
// function loggingIdentity0<T>(arg: T): T {
//     console.log(arg.length);  // Error: T doesn't have .length
//     return arg;
// }

interface Lengthwise {
    length: number;
}

function loggingIdentity0<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

let a:Lengthwise = ""
loggingIdentity0(a)

loggingIdentity0({length: 10, value: 3});

//!在泛型约束中使用类型参数
// function getProperty(obj:T, key: K) {
//     return obj[key];
// }

// let x = { a: 1, b: 2, c: 3, d: 4 };

// getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.


//!在泛型里使用类类型
function create<T>(c: {new(): T; }): T {
    return new c();
}

//使用原型属性推断并约束构造函数与类实例的关系
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
