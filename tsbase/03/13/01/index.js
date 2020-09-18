"use strict";
exports.__esModule = true;
var ZipCodeValidator_1 = require("./ZipCodeValidator");
var myValidator2 = new ZipCodeValidator_1.ZipCodeValidator();
var validator = require("./ZipCodeValidator");
var myValidator = new validator.ZipCodeValidator();
// 尽管不推荐这么做，一些模块会设置一些全局状态供其它模块使用。 这些模块可能没有任何的导出或用户根本就不关注它的导出。 使用下面的方法来导入这类模块
require("./my-module.js");
