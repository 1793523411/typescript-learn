// const foo0: {
//     readonly bar: number;
//   } = {
//     bar: 123
//   };
  
//   function iMutateFoo(foo0: { bar: number }) {
//     foo0.bar = 456;
//   }
  
//   iMutateFoo(foo0);
//   console.log(foo0.bar); // 456


interface Foo {
    readonly bar: number;
  }
  
  let foo0: Foo = {
    bar: 123
  };
  
  function iTakeFoo(foo: Foo) {
    // foo.bar = 456; // Error: bar 属性只读
  }
  
  iTakeFoo(foo0);