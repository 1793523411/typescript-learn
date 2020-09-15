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

function identity<T>(arg: T): T {
    return arg;
}

//我们还可以使用带有调用签名的对象字面量来定义泛型函数
let myIdentity: {<T>(arg: T): T} = identity;
