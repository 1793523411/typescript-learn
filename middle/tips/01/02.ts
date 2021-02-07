// // FOO
// enum FooIdBrand {
//   _ = "",
// }
// type FooId = FooIdBrand & string;

// // BAR
// enum BarIdBrand {
//   _ = "",
// }
// type BarId = BarIdBrand & string;

// // user

// let fooId: FooId;
// let barId: BarId;

// // 类型安全
// //   fooId = barId; // error
// //   barId = fooId; // error

// // 创建一个新的
// fooId = "foo" as FooId;
// barId = "bar" as BarId;

// // 两种类型都与基础兼容
// let str1: string;
// str1 = fooId;
// str1 = barId;
