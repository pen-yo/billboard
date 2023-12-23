/**
 * 有限队列
 */
export class LimitedQueue<DataUnit> {
  arr: DataUnit[];
  limit: number;

  constructor(arr: DataUnit[], limit: number = 20) {
    this.arr = arr;
    this.limit = limit;
  }

  /**
   * 向尾部添加元素。
   */
  addToTail(e: DataUnit) {
    if (this.arr.push(e) > this.limit) this.removeFromHead();
  }

  /**
   * 从头部移除元素。
   */
  removeFromHead() {
    return this.arr.shift() !== undefined;
  }

  /**
   * 获取数组形式。
   */
  toArray() {
    return [...this.arr];
  }

  /**
   * 直接暴露元数据。
   */
  expose() {
    return this.arr;
  }
}
