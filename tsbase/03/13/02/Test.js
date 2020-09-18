"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ZipCodeValidator_1 = __importDefault(require("./ZipCodeValidator"));
var myValidator = new ZipCodeValidator_1.default();
var StaticZipCodeValidator_1 = __importDefault(require("./StaticZipCodeValidator"));
var strings = ["Hello", "98052", "101"];
strings.forEach(function (s) {
    console.log("\"" + s + "\" " + (StaticZipCodeValidator_1.default(s) ? " matches" : " does not match"));
});
