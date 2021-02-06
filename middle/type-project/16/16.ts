// Compile with --noImplicitThis

// 通过 API 转换参数的形式来生成 this 的值的情景下，可以通过创建一个新的 ThisType<T> 标记接口，可用于在上下文中表明转换后的类型。尤其是当字面量中的上下文类型为 ThisType<T> 或者是包含 ThisType<T> 的交集时，显得尤为有效，对象字面量方法中 this 的类型即为 T
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
