// 当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。 一些内置的类型如 Array，Map，Set，String，Int32Array，Uint32Array等都已经实现了各自的Symbol.iterator。 对象上的 Symbol.iterator函数负责返回供迭代的值

let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}

let list = [4, 5, 6];

for (let i in list) {
    console.log(i); // "0", "1", "2",
}

for (let i of list) {
    console.log(i); // "4", "5", "6"
}

// for..in可以操作任何对象；它提供了查看对象属性的一种方法。 但是 for..of关注于迭代对象的值。内置对象Map和Set已经实现了Symbol.iterator方法，让我们可以访问它们保存的值

// let pets = new Set(["Cat", "Dog", "Hamster"]);
// pets["species"] = "mammals";

// for (let pet in pets) {
//     console.log(pet); // "species"
// }

// for (let pet of pets) {
//     console.log(pet); // "Cat", "Dog", "Hamster"
// }


let numbers = [1, 2, 3];
for (let num of numbers) {
    console.log(num);
}


var numbers2 = [1, 2, 3];
for (var _i = 0; _i < numbers.length; _i++) {
    var num = numbers[_i];
    console.log(num);
}
