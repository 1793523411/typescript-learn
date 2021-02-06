"use strict";
// const foo0: {
//     readonly bar: number;
//   } = {
//     bar: 123
//   };
var foo0 = {
    bar: 123
};
function iTakeFoo(foo) {
    // foo.bar = 456; // Error: bar 属性只读
}
iTakeFoo(foo0);
