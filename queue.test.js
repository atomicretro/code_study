const Queue = require('./queue');

describe('initialize Queue without a starting element', () => {
  let queue;
  beforeEach(() => {
    queue = new Queue;
  });

  test('Queue initializes empty', () => {
    expect(queue._queue[0]).toBeUndefined();
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
    expect(queue.peek(1)).toBeUndefined();
  });

  test('Queue#peek() without argument returns frontmost element', () => {
    queue.enqueue(1);
    expect(queue.peek()).toBe(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
  });

  test(
    'Queue#peek(n) with valid argument returns nth most element from front',
    () => {
      queue.enqueue(1);
      expect(queue.peek(0)).toBe(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.peek(2)).toBe(3);
  });

  test(
    'Queue#peek(n) with invalid argument returns frontmost most element',
    () => {
      queue.enqueue(1);
      expect(queue.peek('a')).toBe(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.peek(null)).toBe(1);
  });

  test('Queue#peekBack() returns undefined on empty queue', () => {
    expect(queue.peekBack()).toBeUndefined();
    expect(queue.peekBack(1)).toBeUndefined();
  });

  test('Queue#peekBack() without argument returns backmost element', () => {
    queue.enqueue(1);
    expect(queue.peekBack()).toBe(1);
    queue.enqueue(2);
    expect(queue.peekBack()).toBe(2);
  });

  test(
    'Queue#peekBack(n) with valid argument returns nth most element from back',
    () => {
      queue.enqueue(1);
      expect(queue.peekBack(0)).toBe(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.peekBack(2)).toBe(1);
  });

  test(
    'Queue#peekBack(n) with invalid argument returns nth most element from back',
    () => {
      queue.enqueue(1);
      expect(queue.peekBack('a')).toBe(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.peekBack(null)).toBe(3);
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

  test('Queue#dequeue() removes and returns correct element on non-empty queue', () => {
    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue._queue[0]).toBeUndefined();
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

  test('Queue#peek() without argument returns initialized element', () => {
    expect(queue.peek()).toBe(1);
  });

  test('Queue#dequeue() removes and returns initialized element', () => {
    expect(queue.dequeue()).toBe(1);
    expect(queue._queue[0]).toBeUndefined();
  });

  test('Queue#enqueue(el) adds element to back of queue', () => {
    queue.enqueue(2);
    expect(queue._queue[1]).toBe(2);
    queue.enqueue(3);
    expect(queue._queue[2]).toBe(3);
  });
});
