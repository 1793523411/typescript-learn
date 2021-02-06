interface Overloaded {
  (foo: string): string;
  (foo: number): number;
}

// 实现接口的一个例子：
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
  if (typeof foo === "number") {
    return foo * foo;
  } else if (typeof foo === "string") {
    return `hello ${foo}`;
  }
}

const overloaded: Overloaded = stringOrNumber;

// 使用
const str = overloaded(""); // str 被推断为 'string'
const num = overloaded(123); // num 被推断为 'number'
