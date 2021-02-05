"use strict";
function handler(event) {
    var element = event; // ok
}
// function handler(event: Event) {
//   const element = (event as any) as HTMLElement; // ok
// }
