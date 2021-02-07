type SomethingComplex = {
  foo: number;
  bar: string;
};

function takeSomethingComplex(arg: SomethingComplex) {}

function getBar(): string {
  return "some bar";
}

// 一个可能会出现的错误使用
const fail2 = {
  foo: 123,
//   bar: getBar,
  bar: getBar(),
};

takeSomethingComplex(fail2); // 在这里 TypeScript 会报错

// 类型“{ foo: number; bar: () => string; }”的参数不能赋给类型“SomethingComplex”的参数。
//   属性“bar”的类型不兼容。
//     不能将类型“() => string”分配给类型“string”。ts(2345)
