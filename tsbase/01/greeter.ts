// function greeter(person:string) {
//     return "Hello, " + person;
// }

// let user = "Jane User";
// // let user = [1,2,3];

// document.body.innerHTML = greeter(user);


//tsc greeter.ts 过后生成对应的js文件，但是该文件报了重复声明错误，这是加上tsconfig.json文件即可，空文件也可


// interface Person {
//     firstName: string;
//     lastName: string;
// }

// // 我们使用接口来描述一个拥有firstName和lastName字段的对象。 在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements语句
// function greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }

// let user = { firstName: "Jane", lastName: "User" };

// document.body.innerHTML = greeter(user);


// 创建一个Student类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别

class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
//只在两个类型内部的结构兼容那么这两个类型就是兼容的
let user = new Student("Jane~~~", "M.", "User");

document.body.innerHTML = greeter(user);
