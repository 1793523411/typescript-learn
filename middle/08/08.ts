function handler(event: any) {
  const element = (event as number); // ok
}
// function handler(event: Event) {
//   const element = (event as any) as HTMLElement; // ok
// }
