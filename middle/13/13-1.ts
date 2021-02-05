class Animal {
  constructor(public name: string) {}
}
class Cat extends Animal {
  meow() {
    console.log("cat");
  }
}

let animal = new Animal("animal");
let cat = new Cat("cat");

// 多态
// Animal <= Cat

animal = cat; // ok
// cat = animal; // ERROR: cat 继承于 animal

// 演示每个数组形式
let animalArr: Animal[] = [animal];
let catArr: Cat[] = [cat];

// 明显的坏处，逆变
// Animal <= Cat
// Animal[] >= Cat[]
// catArr = animalArr; // ok, 如有有逆变
catArr[0].meow(); // 允许，但是会在运行时报错

// 另外一个坏处，协变
// Animal <= Cat
// Animal[] <= Cat[]
animalArr = catArr; // ok，协变

animalArr.push(new Animal("another animal")); // 仅仅是 push 一个 animal 至 carArr 里
catArr.forEach((c) => c.meow()); // 允许，但是会在运行时报错。
