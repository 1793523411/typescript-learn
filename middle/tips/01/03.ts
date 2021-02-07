// FOO
interface FooId extends String {
  _fooIdBrand: string; // 防止类型错误
}

// BAR
interface BarId extends String {
  _barIdBrand: string; // 防止类型错误
}

// 使用
let fooId: FooId;
let barId: BarId;

// 类型安全
// fooId = barId; // error
// barId = fooId; // error
// fooId = <FooId>barId; // error
// barId = <BarId>fooId; // error

// 创建新的
fooId = "foo" as any;
barId = "bar" as any;

// 如果你需要以字符串作为基础
var str2: string;
str2 = fooId as any;
str2 = barId as any;
