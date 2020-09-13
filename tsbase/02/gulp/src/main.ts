// import { sayHello } from "./greet";

// console.log(sayHello("TypeScript"));

// 即使我们使用了ES2015的模块语法，TypeScript还是会生成Node.js使用的CommonJS模块

import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHello("greeting", "TypeScript");
