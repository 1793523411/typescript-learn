define("mod", ["require", "exports"], function (require, exports) {
    "use strict";
    var mod = {
        something: 1
    };
    return mod;
});
define("SimpleModule", ["require", "exports", "mod"], function (require, exports, m) {
    "use strict";
    exports.__esModule = true;
    exports.t = void 0;
    exports.t = m.something + 1;
});
