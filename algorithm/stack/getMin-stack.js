/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。
示例:

MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
 */

class MinStack {
  constructor () {
    this.length = 0;
    this.content = [];
    this.mins = [];
  }
  push (val) {
    const curMin = this.mins[this.length - 1] !== undefined ? this.mins[this.length - 1] : Infinity;
    this.content[this.length++] = val;
    this.mins[this.length - 1] = Math.min(curMin, val);
  }
  pop () {
    const num = this.content[--this.length]
    this.content.pop();
    // 若出栈的值和当前最小值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
    if (num == this.mins[this.length-1]) {
      this.mins.pop();
    }
    return num;
  }
  top () {
    return this.content[this.length - 1]
  }
  getMin () {
    return this.mins[this.length - 1];
  }
}