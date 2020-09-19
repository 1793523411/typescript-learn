// var foo = <foo>bar;
// 这里断言bar变量是foo类型的。 因为TypeScript也使用尖括号来表示类型断言，在结合JSX的语法后将带来解析上的困难。因此，TypeScript在.tsx文件里禁用了使用尖括号的类型断言。

//!as操作符
// 由于不能够在.tsx文件里使用上述语法，因此我们应该使用另一个类型断言操作符：as。 上面的例子可以很容易地使用as操作符改写
// var foo = bar as foo;
// as操作符在.ts和.tsx里都可用，并且与尖括号类型断言行为是等价的

//!类型检查

//!固有元素

// declare namespace JSX {
//     interface IntrinsicElements {
//         foo: any
//     }
// }

// <foo />; // 正确
// <bar />; // 错误

// declare namespace JSX {
//     interface IntrinsicElements {
//         [elemName: string]: any;
//     }
// }
