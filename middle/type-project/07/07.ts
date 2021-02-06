type res = {
    top:number,
    right:number,
    bottom: number,
    left: number
}

function padding(all: number):res;
function padding(topAndBottom: number, leftAndRight: number):res;
function padding(top: number, right: number, bottom: number, left: number):res;
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  };
}

console.log(padding(1))
console.log(padding(1, 1))
console.log(padding(1, 1, 1, 1))
// padding(1); // Okay: all
// padding(1, 1); // Okay: topAndBottom, leftAndRight
// padding(1, 1, 1, 1); // Okay: top, right, bottom, left

// padding(1, 1, 1); // Error: Not a part of the available overloads

type LongHand = {
  (a: number): number;
};


function test(a:number):any{
  return a
}

const demo: LongHand = test(1)
type ShortHand = (a: number) => number;

// 上面代码中的两个例子完全相同。但是，当你想使用函数重载时，只能用第一种方式

type LongHandAllowsOverloadDeclarations = {
  (a: number): number;
  (a: string): string;
};