"use strict";
// interface Point2D {
//   x: number;
//   y: number;
// }
// interface Point3D {
//   x: number;
//   y: number;
//   z: number;
// }
var iTakePoint2D = function (point) { };
var iTakePoint3D = function (point) { };
iTakePoint3D = iTakePoint2D; // ok, 这是合理的
// iTakePoint2D = iTakePoint3D; // ok，为什么？
