// 在 axios.ts 文件中对 axios 进行了处理，例如添加通用配置、拦截器等
import Ax from "axios";

import { ResponseData } from "./interface";

export function getUser<T>() {
  return Ax.get<ResponseData<T>>("/somepath")
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

interface User {
  name: string;
  age: number;
}

async function test() {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser<User>();
}
