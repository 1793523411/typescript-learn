"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zip = require("./ZipCodeValidator");
// Some samples to try
var strings = ["Hello", "98052", "101"];
// Validators to use
var validator = new zip();
// Show whether each string passed each validator
strings.forEach(function (s) {
    console.log("\"" + s + "\" - " + (validator.isAcceptable(s) ? "matches" : "does not match"));
});
