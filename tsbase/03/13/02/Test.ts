import validator from "./ZipCodeValidator";

let myValidator = new validator();

import validate from "./StaticZipCodeValidator";
let strings = ["Hello", "98052", "101"];
strings.forEach((s) => {
  console.log(`"${s}" ${validate(s) ? " matches" : " does not match"}`);
});
