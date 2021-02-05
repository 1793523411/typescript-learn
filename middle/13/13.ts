// interface Point2D {
//   x: number;
//   y: number;
// }
// interface Point3D {
//   x: number;
//   y: number;
//   z: number;
// }

// let iMakePoint2D = (): Point2D => ({ x: 0, y: 0 });
// let iMakePoint3D = (): Point3D => ({ x: 0, y: 0, z: 0 });

// iMakePoint2D = iMakePoint3D;
// iMakePoint3D = iMakePoint2D; // ERROR: Point2D 不能赋值给 Point3D

interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}

let iTakePoint2D = (point: Point2D) => {};
let iTakePoint3D = (point: Point3D) => {};

iTakePoint3D = iTakePoint2D; // ok, 这是合理的
// iTakePoint2D = iTakePoint3D; // ok，为什么？
