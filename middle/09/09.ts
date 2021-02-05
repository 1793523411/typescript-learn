function logName(something: { name: string }) {
  console.log(something.name);
}

const person = { name: "matt", job: "being awesome" };
const animal2 = { name: "cow", diet: "vegan, but has milk of own specie" };
const randow = { note: `I don't have a name property` };

logName(person); // ok
logName(animal2); // ok
// logName(randow); // Error: 没有 `name` 属性

function logName2(something: { name: string }) {
  console.log(something.name);
}

logName2({ name: "matt" }); // ok
// logName2({ name: "matt", job: "being awesome" }); // Error: 对象字面量只能指定已知属性，`job` 属性在这里并不存在。
