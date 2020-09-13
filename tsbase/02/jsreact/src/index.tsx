import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
// 我们仅仅将Hello组件导入index.tsx。 注意，不同于 "react"或"react-dom"，我们使用Hello.tsx的相对路径 - 这很重要。 如果不这样做，TypeScript只会尝试在 node_modules文件夹里查找

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
