const Queue = require('./queue');

describe('initialize Queue without a starting element', () => {
  let queue;
  beforeEach(() => {
    queue = new Queue;
  });

  test('Queue initializes empty', () => {
    expect(queue.peek()).toBeUndefined();
  });

  test('Queue#enqueue(el) adds element to back of queue', () => {
    queue.enqueue(1);
    expect(queue._queue[0]).toBe(1);
    queue.enqueue(2);
    expect(queue._queue[1]).toBe(2);
  });

  test('Queue has no trouble enqueueing equivalent elements', () => {
    queue.enqueue(1);
    expect(queue._queue[0]).toBe(1);
    queue.enqueue(1);
    expect(queue._queue[1]).toBe(1);
    queue.enqueue(1);
    expect(queue._queue[2]).toBe(1);
  });

  test('Queue#peek() returns undefined on empty queue', () => {
    expect(queue.peek()).toBeUndefined();
  });

  test('Queue#peek() returns frontmost element', () => {
    queue.enqueue(1);
    expect(queue.peek()).toBe(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
  });

  test('Queue#peekBack() returns undefined on empty queue', () => {
    expect(queue.peekBack()).toBeUndefined();
  });

  test('Queue#peekBack() returns backmost element', () => {
    queue.enqueue(1);
    expect(queue.peekBack()).toBe(1);
    queue.enqueue(2);
    expect(queue.peekBack()).toBe(2);
  });

  test('Queue#peekN(n) returns undefined when n is out of range', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.peekN(2)).toBeUndefined();
  });

  test('Queue#peekN(n) returns nth most element from front', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.peekN(0)).toBe(1);
    expect(queue.peekN(1)).toBe(2);
    expect(queue.peekN(2)).toBe(3);
  });

  test('Queue#length() returns correct length of queue', () => {
    expect(queue.length()).toBe(0);
    queue.enqueue(1);
    expect(queue.length()).toBe(1);
    queue.enqueue(2);
    expect(queue.length()).toBe(2);
  });

  test('Queue#dequeue() returns undefined on empty queue', () => {
    expect(queue.dequeue()).toBeUndefined();
  });

  test('Queue#dequeue() returns correct element on non-empty queue', () => {
    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);
  });

  test('Queue#length() returns correct length *after* Queue#dequeue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.dequeue();
    expect(queue.length()).toBe(1);
  });

  test('Queue integrity remains through 100,000 random operations', () => {
    let internalQueueLength = 0;
    let queueBack = 0;
    for(let i = 0; i < 100000; i++) {
      if(Math.random() < 0.5) {
        queue.enqueue(i);
        queueBack++;
      } else {
        queue.dequeue();
      };
    };
    for(key in queue._queue) internalQueueLength++;

    expect(queue._back).toBe(queueBack);
    expect(queue.length()).toBe(internalQueueLength);
    expect(queue.peek()).toBe(queue._queue[queueBack - internalQueueLength]);
    expect(queue.peekBack()).toBe(queue._queue[queueBack - 1]);
  });
});

describe('initialize Queue with a starting element', () => {
  let queue;
  beforeEach(() => {
    queue = new Queue(1);
  });

  test('Queue initializes with starting element', () => {
    expect(queue._queue[0]).toBe(1);
  });

  test('Queue#enqueue(el) adds element to back of queue', () => {
    expect(queue._queue[0]).toBe(1);
    queue.enqueue(2);
    expect(queue._queue[1]).toBe(2);
    queue.enqueue(3);
    expect(queue._queue[2]).toBe(3);
  });

  test('Queue has no trouble enqueueing equivalent elements', () => {
    expect(queue._queue[0]).toBe(1);
    queue.enqueue(1);
    expect(queue._queue[1]).toBe(1);
    queue.enqueue(1);
    expect(queue._queue[2]).toBe(1);
  });

  test('Queue#peek() returns undefined on empty queue', () => {
    queue.dequeue()
    expect(queue.peek()).toBeUndefined();
  });

  test('Queue#peek() returns frontmost element', () => {
    expect(queue.peek()).toBe(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
  });

  test('Queue#peekBack() returns undefined on empty queue', () => {
    queue.dequeue()
    expect(queue.peekBack()).toBeUndefined();
  });

  test('Queue#peekBack() returns backmost element', () => {
    expect(queue.peekBack()).toBe(1);
    queue.enqueue(2);
    expect(queue.peekBack()).toBe(2);
  });

  test('Queue#peekN(n) returns undefined when n is out of range', () => {
    queue.enqueue(2);
    expect(queue.peekN(2)).toBeUndefined();
  });

  test('Queue#peekN(n) returns nth most element from front', () => {
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.peekN(0)).toBe(1);
    expect(queue.peekN(1)).toBe(2);
    expect(queue.peekN(2)).toBe(3);
  });

  test('Queue#length() returns correct length of queue', () => {
    expect(queue.length()).toBe(1);
    queue.enqueue(2);
    expect(queue.length()).toBe(2);
    queue.enqueue(3);
    expect(queue.length()).toBe(3);
  });

  test('Queue#dequeue() returns undefined on empty queue', () => {
    queue.dequeue()
    expect(queue.dequeue()).toBeUndefined();
  });

  test('Queue#dequeue() returns correct element on non-empty queue', () => {
    expect(queue.dequeue()).toBe(1);
  });

  test('Queue#length() returns correct length *after* Queue#dequeue', () => {
    queue.enqueue(2);
    queue.dequeue();
    expect(queue.length()).toBe(1);
  });

  test('Queue integrity remains through 100,000 random operations', () => {
    let internalQueueLength = 0;
    let queueBack = 1;
    for(let i = 0; i < 100000; i++) {
      if(Math.random() < 0.5) {
        queue.enqueue(i);
        queueBack++;
      } else {
        queue.dequeue();
      };
    };
    for(key in queue._queue) internalQueueLength++;

    expect(queue._back).toBe(queueBack);
    expect(queue.length()).toBe(internalQueueLength);
    expect(queue.peek()).toBe(queue._queue[queueBack - internalQueueLength]);
    expect(queue.peekBack()).toBe(queue._queue[queueBack - 1]);
  });
});
