class Stack {
  constructor(element) {
    this._stack = {};
    this._pointer = 0;
    if(element !== undefined) this.push(element);
  }

  push(element) {
    this._stack[this._pointer] = element;
    this._pointer++;
  }

  pop() {
    if(this._pointer === 0) {
      return undefined; // Stack is empty
    } else {
      this._pointer--;
      let toBeRemoved = this._stack[this._pointer];
      delete this._stack[this._pointer];
      return toBeRemoved;
    };
  }

  peek() {
    return this._stack[this._pointer - 1];
  }

  length() {
    return this._pointer;
  }
}

export default Stack;
