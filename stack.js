function StackException(message) {
   this.message = message;
   this.name = 'StackException';
}

class Stack {
  constructor(value) {
    this._stack = {};
    this._pointer = 0;
    if(value) {
      this.push(value);
      this._pointer++;
    };
  }

  push(value) {
    this._stack[this._pointer] = value;
    this._pointer++;
  }

  pop() {
    if(this._pointer === 0) {
      return undefined;
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
}
