const Stack = require('./stack');

describe('initialize Stack without a starting element', () => {
  let stack;
  beforeEach(() => {
    stack = new Stack;
  });

  test('Stack initializes empty', () => {
    expect(stack.peek()).toBeUndefined();
  });

  test('Stack.push(el) adds element to the top of the stack', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
  });

  test('Stack has no trouble pushing on equivalent elements', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push(1);
    expect(stack.peek()).toBe(1);
  })

  test('Stack.peek() only returns last element', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push(2);
    expect(stack.peek()).not.toBe(1);
  });

  test('Stack.length() returns the correct length of the stack', () => {
    expect(stack.length()).toBe(0);
    stack.push(1);
    expect(stack.length()).toBe(1);
    stack.push(2);
    expect(stack.length()).toBe(2);
  });

  test('Stack.pop() returns undefined on an empty stack', () => {
    expect(stack.pop()).toBeUndefined();
  });

  test('Stack.pop() returns correct element  on a non-empty stack', () => {
      stack.push(1);
      expect(stack.pop()).toBe(1);
  });

  test('Stack.length() returns correct length *after* Stack.pop()', () => {
    stack.push(1);
    expect(stack.length()).toBe(1);
    stack.pop()
    expect(stack.length()).toBe(0);
  });

  test('Stack integrity remains through 100,000 random operations', () => {
    for(let i = 0; i < 100000; i++) {
      if(Math.random() < 0.5) stack.push(i);
      else stack.pop();
    };

    let internalStackLength = 0;
    for(key in stack._stack) {
      expect(parseInt(key)).toBeGreaterThanOrEqual(0);
      internalStackLength++;
    };
    expect(stack.length()).toBe(internalStackLength);
    expect(stack._pointer).toBe(internalStackLength);
    expect(stack.peek()).toBe(stack._stack[internalStackLength - 1]);
  });
});

describe('initialize Stack with a starting element', () => {
  let stack;
  beforeEach(() => {
    stack = new Stack(1);
  });

  test('Stack initializes with one element', () => {
    expect(stack.peek()).toBe(1);
  });

  test('Stack.push(el) adds element to the top of the stack', () => {
    stack.push(2);
    expect(stack.peek()).toBe(2);
    stack.push(3);
    expect(stack.peek()).toBe(3);
  });

  test('Stack has no trouble pushing on equivalent elements', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push(1);
    expect(stack.peek()).toBe(1);
  })

  test('Stack.peek() only returns last element', () => {
    expect(stack.peek()).toBe(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    stack.push(3);
    expect(stack.peek()).not.toBe(2);
  });

  test('Stack.length() returns the correct length of the stack', () => {
    expect(stack.length()).toBe(1);
    stack.push(2);
    expect(stack.length()).toBe(2);
    stack.push(3);
    expect(stack.length()).toBe(3);
  });

  test('Stack.pop() returns undefined on an empty stack', () => {
    stack.pop();
    expect(stack.pop()).toBeUndefined();
  });

  test('Stack.pop() returns correct element  on a non-empty stack', () => {
      stack.push(2);
      expect(stack.pop()).toBe(2);
  });

  test('Stack.length() returns correct length *after* Stack.pop()', () => {
    stack.push(2);
    expect(stack.length()).toBe(2);
    stack.pop()
    expect(stack.length()).toBe(1);
    stack.pop()
    expect(stack.length()).toBe(0);
  });

  test('Stack integrity remains through 100,000 random operations', () => {
    for(let i = 0; i < 100000; i++) {
      if(Math.random() < 0.5) stack.push(i);
      else stack.pop();
    };

    let internalStackLength = 0;
    for(key in stack._stack) {
      expect(parseInt(key)).toBeGreaterThanOrEqual(0);
      internalStackLength++;
    };
    expect(stack.length()).toBe(internalStackLength);
    expect(stack._pointer).toBe(internalStackLength);
    expect(stack.peek()).toBe(stack._stack[internalStackLength - 1]);
  });
});
