class Queue {
  constructor(element) {
    this._queue = {};
    this._front = 0;
    this._back = 0;
    if(element !== undefined) this.enqueue(element);
  }

  enqueue(element) {
    this._queue[this._back] = element;
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

  peek(n) {
    if(Number.isInteger(n)) return this._queue[this._front + n];
    else return this._queue[this._front];
  }

  peekBack(n) {
    if(Number.isInteger(n)) return this._queue[this._back - (n + 1)];
    else return this._queue[this._back - 1];
  }
}

module.exports = Queue;
