// // 泛型 Id 类型
// type Id<T extends string> = {
//   type: T;
//   value: string;
// };

// // 特殊的 Id 类型
// type FooId = Id<"foo">;
// type BarId = Id<"bar">;

// // 可选：构造函数
// const createFoo = (value: string): FooId => ({ type: "foo", value });
// const createBar = (value: string): BarId => ({ type: "bar", value });

// let foo3 = createFoo("sample");
// let bar3 = createBar("sample");

// // foo3 = bar3; // Error
// foo3 = foo3; // Okey
