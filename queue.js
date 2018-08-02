class Queue {
  constructor(value) {
    this._queue = {};
    this._front = 0;
    this._back = 0;
    if(value !== undefined) this.enqueue(value);
  }

  enqueue(value) {
    this._queue[this._back] = value;
    this._back++;
  }

  dequeue() {
    if(this._front === this._back) {
      return undefined; // Queue is empty
    } else {
      let toBeRemoved = this._queue[this._front];
      delete this._queue[this._front];
      this._front++;
      return toBeRemoved;
    };
  }

  length() {
    return this._back - this._front;
  }

  peek() {
    return this._queue[this._front];
  }

  peekBack() {
    return this._queue[this._back - 1];
  }
}
