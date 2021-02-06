// export const someVar = 123;
// export type someType = {
//   foo: string;
// };

const someVar = 123;
type someType = {
  type: string;
};

export { someVar as aDifferentName, someType };