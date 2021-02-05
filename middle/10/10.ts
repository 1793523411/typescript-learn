// 用于创建字符串列表映射至 `K: V` 的函数
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

// 创建 K: V
const Direction = strEnum(["North", "South", "East", "West"]);
console.log(Direction);

// 创建一个类型
type Direction = keyof typeof Direction;

// 简单的使用
let sample: Direction;

sample = Direction.North; // Okay
sample = "North"; // Okay
//   sample = 'AnythingElse'; // ERROR!
