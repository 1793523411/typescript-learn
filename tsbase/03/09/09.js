// TypeScript里的类型兼容性是基于结构子类型的。 结构类型是一种只使用其成员来描述类型的方式。 它正好与名义（nominal）类型形成对比。（译者注：在基于名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明和/或类型的名称来决定的。这与结构性类型系统不同，它是基于类型的组成结构，且不要求明确地声明。） 看下面的例子
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var p;
// OK, because of structural typing
p = new Person();
// 在使用基于名义类型的语言，比如C#或Java中，这段代码会报错，因为Person类没有明确说明其实现了Named接口   哦哦哦懂了
// TypeScript的结构性子类型是根据JavaScript代码的典型写法来设计的。 因为JavaScript里广泛地使用匿名对象，例如函数表达式和对象字面量，所以使用结构类型系统来描述这些类型比使用名义类型系统更好
//!关于可靠性的注意事项
// TypeScript的类型系统允许某些在编译阶段无法确认其安全性的操作。当一个类型系统具此属性时，被当做是“不可靠”的。TypeScript允许这种不可靠行为的发生是经过仔细考虑的
//!开始
// // TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性。比如
// interface Named {
//     name: string;
// }
// let x: Named;
// // y's inferred type is { name: string; location: string; }
// let y = { name: 'Alice', location: 'Seattle' };
// x = y;
// function greet(n: Named) {
//     console.log('Hello, ' + n.name);
// }
// greet(y); // OK
// // 注意，y有个额外的location属性，但这不会引发错误。 只有目标类型（这里是Named）的成员会被一一检查是否兼容,这个比较过程是递归进行的，检查每个成员及子成员
//!比较两个函数
// let x = (a: number) => 0;
// let y = (b: number, s: string) => 0;
// // 要查看x是否能赋值给y，首先看它们的参数列表。 x的每个参数必须能在y里找到对应类型的参数。 注意的是参数的名字相同与否无所谓，只看它们的类型。 这里，x的每个参数在y中都能找到对应的参数，所以允许赋值
// y = x; // OK
// // x = y; // Error
var items = [1, 2, 3];
// Don't force these extra arguments
items.forEach(function (item, index, array) { return console.log(item); });
// Should be OK!
items.forEach(function (item) { return console.log(item); });
//下面来看看如何处理返回值类型，创建两个仅是返回值类型不同的函数
// let x = () => ({name: 'Alice'});
// let y = () => ({name: 'Alice', location: 'Seattle'});
// x = y; // OK
// y = x; // Error, because x() lacks a location property
// 类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型
//!函数参数双向协变
// 当比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功。 这是不稳定的，因为调用者可能传入了一个具有更精确类型信息的函数，但是调用这个传入的函数的时候却使用了不是那么精确的类型信息。 实际上，这极少会发生错误，并且能够实现很多JavaScript里的常见模式
var EventType;
(function (EventType) {
    EventType[EventType["Mouse"] = 0] = "Mouse";
    EventType[EventType["Keyboard"] = 1] = "Keyboard";
})(EventType || (EventType = {}));
function listenEvent(eventType, handler) {
    /* ... */
}
// Unsound, but useful and common
listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
listenEvent(EventType.Mouse, (function (e) { return console.log(e.x + ',' + e.y); }));
// Still disallowed (clear error). Type safety enforced for wholly incompatible types
// listenEvent(EventType.Mouse, (e: number) => console.log(e));
//!可选参数及剩余参数
// 比较函数兼容性的时候，可选参数与必须参数是可互换的。 源类型上有额外的可选参数不是错误，目标类型的可选参数在源类型里没有对应的参数也不是错误
// 当一个函数有剩余参数时，它被当做无限个可选参数
// 这对于类型系统来说是不稳定的，但从运行时的角度来看，可选参数一般来说是不强制的，因为对于大多数函数来说相当于传递了一些undefinded
function invokeLater(args, callback) {
    /* ... Invoke callback with 'args' ... */
}
// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], function (x, y) { return console.log(x + ', ' + y); });
// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], function (x, y) { return console.log(x + ', ' + y); });
//!函数重载
// 对于有重载的函数，源函数的每个重载都要在目标函数上找到对应的函数签名。 这确保了目标函数可以在所有源函数可调用的地方调用
//!枚举
// 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的
var Status;
(function (Status) {
    Status[Status["Ready"] = 0] = "Ready";
    Status[Status["Waiting"] = 1] = "Waiting";
})(Status || (Status = {}));
;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 1] = "Blue";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
;
var status2 = Status.Ready;
// status2 = Color.Green;  // Error
console.log(Color.Green);
console.log(status2);
//!类
// 类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。 比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内
var Animal = /** @class */ (function () {
    function Animal(name, numFeet) {
    }
    return Animal;
}());
var Size = /** @class */ (function () {
    function Size(numFeet) {
    }
    return Size;
}());
var a;
var s;
a = s; // OK
s = a; // OK
//!类的私有成员和受保护成员
// 类的私有成员和受保护成员会影响兼容性。 当检查类实例的兼容时，如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的这个私有成员。 同样地，这条规则也适用于包含受保护成员实例的类型检查。 这允许子类赋值给父类，但是不能赋值给其它有同样类型的类
//!泛型
// 因为TypeScript是结构性的类型系统，类型参数只影响使用其做为类型一部分的结果类型
// interface Empty<T> {
// }
// let x: Empty<number>;
// let y: Empty<string>;
// x = y;  // OK, because y matches structure of x
// interface NotEmpty<T> {
//     data: T;
// }
// let x: NotEmpty<number>;
// let y: NotEmpty<string>;
// x = y;  // Error, because x and y are not compatible
// 在这里，泛型类型在使用时就好比不是一个泛型类型。
// 对于没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较。 然后用结果类型进行比较，就像上面第一个例子
var identity = function (x) {
    return;
};
var reverse = function (y) {
    return;
};
identity = reverse; // OK, because (x: any) => any matches (y: any) => any
//!高级主题
// !子类型与赋值
// 目前为止，我们使用了“兼容性”，它在语言规范里没有定义。 在TypeScript里，有两种兼容性：子类型和赋值。 它们的不同点在于，赋值扩展了子类型兼容性，增加了一些规则，允许和any来回赋值，以及enum和对应数字值之间的来回赋值,语言里的不同地方分别使用了它们之中的机制。 实际上，类型兼容性是由赋值兼容性来控制的，即使在implements和extends语句也不例外
