System.register("mod", [], function (exports_1, context_1) {
    "use strict";
    var mod;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            mod = {
                something: 1
            };
        }
    };
});
System.register("SimpleModule", ["mod"], function (exports_2, context_2) {
    "use strict";
    var m, t;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (m_1) {
                m = m_1;
            }
        ],
        execute: function () {
            exports_2("t", t = m.something + 1);
        }
    };
});
