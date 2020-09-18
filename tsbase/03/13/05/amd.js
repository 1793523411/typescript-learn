define("Validation", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("ZipCodeValidator", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.ZipCodeValidator = void 0;
    var numberRegexp = /^[0-9]+$/;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    exports.ZipCodeValidator = ZipCodeValidator;
});
define("LettersOnlyValidator", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.LettersOnlyValidator = void 0;
    var lettersRegexp = /^[A-Za-z]+$/;
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    exports.LettersOnlyValidator = LettersOnlyValidator;
});
define("Test", ["require", "exports", "ZipCodeValidator", "LettersOnlyValidator"], function (require, exports, ZipCodeValidator_1, LettersOnlyValidator_1) {
    "use strict";
    exports.__esModule = true;
    // Some samples to try
    var strings = ["Hello", "98052", "101"];
    // Validators to use
    var validators = {};
    validators["ZIP code"] = new ZipCodeValidator_1.ZipCodeValidator();
    validators["Letters only"] = new LettersOnlyValidator_1.LettersOnlyValidator();
    // Show whether each string passed each validator
    strings.forEach(function (s) {
        for (var name_1 in validators) {
            console.log("\"" + s + "\" - " + (validators[name_1].isAcceptable(s) ? "matches" : "does not match") + " " + name_1);
        }
    });
});
