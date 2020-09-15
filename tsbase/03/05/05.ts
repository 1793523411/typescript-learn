// TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用

//!函数
// Named function
// function add(x, y) {
//     return x + y;
// }

// // Anonymous function
// let myAdd = function(x, y) { return x + y; };

let z = 100;

function addToZ(x, y) {
  return x + y + z;
}

//!函数类型
// TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它
function add(x: number, y: number): number {
  return x + y;
}

// let myAdd = function(x: number, y: number): number { return x + y; };

//!书写完整函数类型
let myAdd: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

let myAdd2: (baseValue: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

// 只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确
// 对于返回值，我们在函数和返回值类型之前使用( =>)符号，使之清晰明了。 如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 void而不能留空

//!推断类型
// myAdd has the full function type
let myAdd3 = function (x: number, y: number): number {
  return x + y;
};

// The parameters `x` and `y` have the type number
let myAdd4: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};
// 这叫做“按上下文归类”，是类型推论的一种。 它帮助我们更好地为程序指定类型

//!可选参数和默认参数
// 传递给一个函数的参数个数必须与函数期望的参数个数一致

// function buildName(firstName: string, lastName: string) {
//     return firstName + " " + lastName;
// }

// // let result1 = buildName("Bob");                  // error, too few parameters
// // let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
// let result3 = buildName("Bob", "Adams");         // ah, just right

// function buildName(firstName: string, lastName?: string) {
//     if (lastName)
//         return firstName + " " + lastName;
//     else
//         return firstName;
// }

// let result1 = buildName("Bob");  // works correctly now
// // let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
// let result3 = buildName("Bob", "Adams");  // ah, just right

// function buildName(firstName: string, lastName = "Smith") {
//     return firstName + " " + lastName;
// }

// let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
// let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
// // let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
// let result4 = buildName("Bob", "Adams");         // ah, just right

// ?在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型

// // 与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。 例如，我们重写最后一个例子，让 firstName是带默认值的参数

// function buildName(firstName = "Will", lastName: string) {
//     return firstName + " " + lastName;
// }

// // let result1 = buildName("Bob");                  // error, too few parameters
// // let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
// let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
// let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"

//!剩余参数
// 必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 arguments来访问所有传入的参数

function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

// 这个省略号也会在带有剩余参数的函数类型定义上使用到;
function buildName2(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName2;


//!this
//!this和箭头函数
// JavaScript里，this的值在函数被调用的时候才会指定。 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。 但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

// let deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function() {
//         return () => {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);

//             return {suit: this.suits[pickedSuit], card: pickedCard % 13};
//         }
//     }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

//!this参数
// 不幸的是，this.suits[pickedSuit]的类型依旧为any。 这是因为 this来自对象字面量里的函数表达式。 修改的方法是，提供一个显式的 this参数。 this参数是个假的参数，它出现在参数列表的最前面

interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

//!this参数在回调函数里
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

// class Handler {
//     info: string;
//     onClickBad(this: Handler, e: Event) {
//         // oops, used this here. using this callback would crash at runtime
//         // this.info = e.message;
//     }
// }
// let h2 = new Handler();
// // uiElement.addClickListener(h.onClickBad); // error!

// class Handler2 {
//     info: string;
//     onClickGood(this: void, e: Event) {
//         // can't use this here because it's of type void!
//         console.log('clicked!');
//     }
// }
// let h = new Handler();
// // uiElement.addClickListener(h.onClickGood);

class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = "aaa"}
}
// 这是可行的因为箭头函数不会捕获this，所以你总是可以把它们传给期望this: void的函数。 缺点是每个 Handler对象都会创建一个箭头函数。 另一方面，方法只会被创建一次，添加到 Handler的原型链上。 它们在不同 Handler对象间是共享的

//!重载

// let suits = ["hearts", "spades", "clubs", "diamonds"];

// function pickCard(x): any {
//     // Check to see if we're working with an object/array
//     // if so, they gave us the deck and we'll pick the card
//     if (typeof x == "object") {
//         let pickedCard = Math.floor(Math.random() * x.length);
//         return pickedCard;
//     }
//     // Otherwise just let them pick the card
//     else if (typeof x == "number") {
//         let pickedSuit = Math.floor(x / 13);
//         return { suit: suits[pickedSuit], card: x % 13 };
//     }
// }

// let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
// let pickedCard1 = myDeck[pickCard(myDeck)];
// // alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

// let pickedCard2 = pickCard(15);
// alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// pickCard方法根据传入参数的不同会返回两种不同的类型。 如果传入的是代表纸牌的对象，函数作用是从中抓一张牌。 如果用户想抓牌，我们告诉他抓到了什么牌。 但是这怎么在类型系统里表示呢

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
// alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
// alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
// 为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面

// 注意，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误