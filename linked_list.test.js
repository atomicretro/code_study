const LinkedList = require('./linked_list');

describe('initialize Linked List without a starting element', () => {
  let list;
  beforeEach(() => {
    list = new LinkedList;
  });

  test('list is initialized without head or tail nodes', () => {
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  test('list is initialized without a pointer', () => {
    expect(list._pointer).toBeNull();
  });

  test('list is initialized with a length of 0', () => {
    expect(list.length).toBe(0);
  });

  describe('test head and tail methods', () => {
    test('setHead(v) on empty list assigns head node', () => {
      list.setHead('a');
      expect(list.head).not.toBeNull();
      expect(list.head.value).toBe('a');
    });

    test('setHead(v) on empty list assigns tail to head node', () => {
      list.setHead('a');
      expect(list.tail).toBe(list.head);
    });

    test('setHead(v) on empty list assigns pointer to head node', () => {
      list.setHead('a');
      expect(list._pointer).toBe(list.head);
    });

    test('setHead(v) on empty list updates length to 1', () => {
      list.setHead('a');
      expect(list.length).toBe(1);
    });

    test('replaceHead(v) on empty list throws LinkedListException', () => {
      expect(() => list.replaceHead('b')).toThrow();
    });

    test('setHead(v) on filled list calls replaceHead()', () => {
      list.setHead('a');
      list.setHead('b');
      expect(list.head.value).toBe('b');
    });

    test('setHead(v) on list w/only one node updates tail and pointer', () => {
      list.setHead('a');
      list.setHead('b');
      expect(list.tail.value).toBe(list.head.value);
      expect(list._pointer.value).toBe(list.head.value);
    });

    test('setHead(v) on filled list does not update length', () => {
      list.setHead('a');
      list.setHead('b');
      expect(list.length).toBe(1);
    });

    test('replaceTail(v) on empty list throws LinkedListException', () => {
      expect(() => list.replaceTail('c')).toThrow();
    });

    test('replaceTail(v) on list with one node calls replaceHead', () => {
      list.setHead('a');
      list.replaceTail('c');
      expect(list.head.value).toBe('c');
      expect(list.tail.value).toBe('c');
    });
  });

  describe('test insertion methods', () => {
    test('insertAfter(v, t) on empty list returns undefined', () => {
      expect(list.insertAfter()).toBeUndefined();
    });

    test('insertAfter(v, t) on filled list updates tail when inserted node is placed at end of list', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      expect(list.tail.value).toBe('b');
    });

    test('insertAfter(v, t) on list with one node correctly sets head and tail', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      expect(list.head.value).toBe('a');
      expect(list.tail.value).toBe('b');
    });

    test('insertAfter(v, t) on filled list adds node with value v to list after first instance of t', () => {
      list.setHead('a');
      list.insertAfter('a', 'a');
      expect(list.head.next.value).toBe('a');
      list.insertAfter('b', 'a');
      expect(list.head.next.value).toBe('b');
      list.insertAfter('c', 'b');
      expect(list.head.next.next.value).toBe('c');
    });

    test('insertAfter(v, t) on filled list returns -1 if t isn\'t in list', () => {
      list.setHead('a');
      expect(list.insertAfter('c', 'b')).toBe(-1);
    });

    test('insertBefore(v, t) on empty list returns undefined', () => {
      expect(list.insertBefore()).toBeUndefined();
    });

    test('insertBefore(v, t) on filled list updates head when inserted node is placed at front of list', () => {
      list.setHead('a');
      list.insertBefore('b', 'a');
      expect(list.head.value).toBe('b');
    });

    test('insertBefore(v, t) on list with one node correctly sets head and tail', () => {
      list.setHead('a');
      list.insertBefore('b', 'a');
      expect(list.head.value).toBe('b');
      expect(list.tail.value).toBe('a');
    });

    test('insertBefore(v, t) on filled list adds node with value v to list before first instance of t', () => {
      list.setHead('a');
      list.insertBefore('a', 'a');
      expect(list.head.value).toBe('a');
      list.insertBefore('b', 'a');
      expect(list.head.value).toBe('b');
      list.insertBefore('c', 'b');
      expect(list.head.value).toBe('c');
      expect(list.head.next.value).toBe('b');
      expect(list.head.next.next.value).toBe('a');
    });

    test('insertAtIndex(v, n) adds node with value v before nth node', () => {
      list.setHead('a');
      list.insertAfter('c', 'a');
      list.insertAtIndex('b', 1);
      expect(list.head.next.value).toBe('b');
      expect(list.head.next.next.value).toBe('c');
    });

    test('insertAfterHead(v) on empty list returns undefined', () => {
      expect(list.insertAfterHead('a')).toBeUndefined();
    });

    test('insertAfterHead(v) on filled list adds node with value v after head node', () => {
      list.setHead('a');
      list.insertAfterHead('b');
      expect(list.head.next.value).toBe('b');
      list.insertAfterHead('c');
      expect(list.head.next.value).toBe('c');
    });

    test('insertAfterHead(v) on list with one node updates tail node', () => {
      list.setHead('a');
      list.insertAfterHead('b');
      expect(list.tail.value).toBe('b');
    });

    test('insertBeforeHead(v) on empty list returns undefined', () => {
      expect(list.insertBeforeHead('a')).toBeUndefined();
    });

    test('insertBeforeHead(v) on filled list adds node with value v before head node and updates list.head', () => {
      list.setHead('a');
      list.insertBeforeHead('b');
      expect(list.head.value).toBe('b')
      expect(list.head.next.value).toBe('a')
    });

    test('insertAfterTail(v) on empty list returns undefined', () => {
      expect(list.insertAfterTail('a')).toBeUndefined();
    });

    test('insertAfterTail(v) on filled list adds node with value v after tail node and updates list.tail', () => {
      list.setHead('a');
      list.insertAfterTail('b');
      expect(list.tail.value).toBe('b');
      list.insertAfterTail('c');
      expect(list.tail.value).toBe('c');
    });

    test('insertBeforeTail(v) on empty list returns undefined', () => {
      expect(list.insertBeforeTail('a')).toBeUndefined();
    });

    test('insertBeforeTail(v) on filled list adds node with value v before tail node', () => {
      list.setHead('a');
      list.insertAfterHead('b');
      list.insertBeforeTail('c');
      expect(list.tail.value).toBe('b');
      expect(list.tail.previous.value).toBe('c');
    });

    test('unshift(v) on empty list returns undefined', () => {
      expect(list.unshift('a')).toBeUndefined();
    });

    test('unshift(v) on filled list adds node with value v before head node and updates list.head', () => {
      list.setHead('a');
      list.unshift('b');
      expect(list.head.value).toBe('b')
      expect(list.head.next.value).toBe('a')
    });

    test('push(v) on empty list returns undefined', () => {
      expect(list.push('a')).toBeUndefined();
    });

    test('push(v) on filled list adds node with value v after tail node and updates list.tail', () => {
      list.setHead('a');
      list.push('b');
      expect(list.tail.value).toBe('b');
      list.push('c');
      expect(list.tail.value).toBe('c');
    });

    test('insertAfterPointer(v) on empty list returns undefined', () => {
      expect(list.insertAfterPointer('a')).toBeUndefined();
    });

    test('insertAfterPointer(v) on list with one node adds node with value v after head and updates list.tail', () => {
      list.setHead('a');
      list.insertAfterPointer('b');
      expect(list.head.value).toBe('a');
      expect(list.head.next.value).toBe('b');
      expect(list.tail.value).toBe('b');
    });

    test('insertAfterPointer(v) on filled list adds node with value v after pointer node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.next();
      list.insertAfterPointer('d');
      expect(list.head.next.next.value).toBe('d');
      expect(list.head.next.next.next.value).toBe('c');
    });

    test('insertAfterPointer(v) on filled list when pointer is at tail updates list.tail', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.next();
      list.insertAfterPointer('c');
      expect(list.tail.value).toBe('c');
    });

    test('insertBeforePointer(v) on empty list returns undefined', () => {
      expect(list.insertBeforePointer('a')).toBeUndefined();
    });

    test('insertBeforePointer(v) on filled list adds node with value v before pointer node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.next();
      list.insertBeforePointer('c');
      expect(list.head.next.value).toBe('c');
      expect(list.head.next.next.value).toBe('b');
    });

    test('insertBeforePointer(v) on filled list when pointer is at head updates list.head', () => {
      list.setHead('a');
      list.insertBeforePointer('b');
      expect(list.head.value).toBe('b');
    });
  });

  describe('test pointer methods', () => {
    test('select() on empty list returns null', () => {
      expect(list.select()).toBeNull();
    });

    test('select() on filled list returns pointer node', () => {
      list.setHead('a');
      expect(list.select()).toBe(list._pointer);
    });

    test('next() on empty list returns undefined', () => {
      expect(list.next()).toBeUndefined()
    });

    test('next() on filled list moves _pointer forward one node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.next();
      expect(list._pointer).toBe(list.head.next);
    });

    test('next() when _pointer is at tail doesn\'t move _pointer and returns undefined', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.next();
      expect(list.next()).toBeUndefined();
      expect(list._pointer).toBe(list.tail);
    });

    test('nextAndSelect() on filled list moves _pointer forward one node then returns that node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      expect(list.nextAndSelect()).toBe(list.head.next);
    });

    test('previous() on empty list returns undefined', () => {
      expect(list.previous()).toBeUndefined();
    });

    test('previous() on filled list moves _pointer back one node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.next();
      list.previous();
      expect(list._pointer).toBe(list.head);
    });

    test('previous() when _pointer is at head doesn\'t move _pointer and returns undefined', () => {
      list.setHead('a');
      expect(list.previous()).toBeUndefined();
      expect(list._pointer).toBe(list.head);
    });

    test('previousAndSelect() on filled list moves _pointer back one node then returns that node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.next();
      expect(list.previousAndSelect()).toBe(list.head);
    });
  });

  describe('test removal methods', () => {
    test('remove(t) returns undefined on empty list', () => {
      expect(list.remove('a')).toBeUndefined();
    });

    test('remove(t) can remove head node from list', () => {
      list.setHead('a');
      list.insertAfterHead('b');
      list.remove('a');
      expect(list.head.value).toBe('b');
      expect(list.tail.value).toBe('b');
    });

    test('remove(t) can remove tail node from list', () => {
      list.setHead('a');
      list.insertAfterHead('b');
      list.insertAfter('c', 'b');
      list.remove('c');
      expect(list.tail.value).toBe('b');
    });

    test('remove(t) on filled list removes and returns first instance of target', () => {
      list.setHead('a');
      list.insertAfterHead('b');
      list.insertAfter('b', 'b');
      list.insertAfterTail('c');
      expect(list.remove('b').value).toBe('b');
      expect(list.head.next.value).toBe('b');
      expect(list.head.next.next.value).toBe('c');
    });

    test('remove(t) on filled list resets _pointer to head if removing pointer node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.next();
      list.remove('b');
      expect(list.select()).toBe(list.head);
    });

    test('removeAtIndex(n) returns undefined on empty list', () => {
      expect(list.removeAtIndex(0)).toBeUndefined();
    });

    test('removeAtIndex(n) can remove head node from list', () => {
      list.setHead('a');
      list.insertAfterHead('b');
      list.removeAtIndex(0);
      expect(list.head.value).toBe('b');
      expect(list.tail.value).toBe('b');
    });

    test('removeAtIndex(n) can remove tail node from list', () => {
      list.setHead('a');
      list.insertAfterHead('b');
      list.insertAfter('c', 'b');
      list.removeAtIndex(2);
      expect(list.tail.value).toBe('b');
    });

    test('removeAtIndex(n) on filled list removes and returns nth node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      expect(list.removeAtIndex(1).value).toBe('b');
      expect(list.head.next.value).toBe('c');
      expect(list.tail.previous.value).toBe('a');
    });

    test('removeAtIndex(n) on filled list resets _pointer to head if removing pointer node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.next();
      list.removeAtIndex(1);
      expect(list.select()).toBe(list.head);
    });

    test('removeHead() returns undefined on empty list', () => {
      expect(list.removeHead()).toBeUndefined();
    });

    test('removeHead() on filled list removes, returns, and reassigns head', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      expect(list.removeHead().value).toBe('a');
      expect(list.head.value).toBe('b');
      expect(list.head.next.value).toBe('c');
    });

    test('removeHead() on filled list decrements list.length by 1', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.removeHead();
      expect(list.length).toBe(2);
    });

    test('removeHead() sets _pointer to new head if removing pointer node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.removeHead();
      expect(list.select()).toBe(list.head);
    });

    test('shift() returns undefined on empty list', () => {
      expect(list.shift()).toBeUndefined();
    });

    test('shift() on filled list removes, returns, and reassigns head', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      expect(list.shift().value).toBe('a');
      expect(list.head.value).toBe('b');
      expect(list.head.next.value).toBe('c');
    });

    test('shift() on filled list decrements list.length by 1', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.shift();
      expect(list.length).toBe(2);
    });

    test('removeTail() returns undefined on empty list', () => {
      expect(list.removeTail()).toBeUndefined();
    });

    test('removeTail() on filled list removes, returns, and reassigns tail', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      expect(list.removeTail().value).toBe('c');
      expect(list.tail.value).toBe('b');
      expect(list.tail.previous.value).toBe('a');
    });

    test('removeTail() on filled list decrements list.length by 1', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.removeTail();
      expect(list.length).toBe(2);
    });

    test('removeTail() resets _pointer to head if removing pointer node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.next();
      list.next();
      list.removeTail();
      expect(list.select()).toBe(list.head);
    });

    test('pop() returns undefined on empty list', () => {
      expect(list.pop()).toBeUndefined();
    });

    test('pop() on filled list removes, returns, and reassigns head', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      expect(list.pop().value).toBe('c');
      expect(list.tail.value).toBe('b');
      expect(list.tail.previous.value).toBe('a');
    });

    test('pop() on filled list decrements list.length by 1', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.pop();
      expect(list.length).toBe(2);
    });

    test('removePointer() returns undefined on empty list', () => {
      expect(list.removePointer()).toBeUndefined();
    });

    test('removePointer() on filled list removes and returns pointer node and shifts _pointer to next node', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.next();
      expect(list.removePointer().value).toBe('b');
      expect(list.head.next).toBe(list.tail);
      expect(list.tail.previous).toBe(list.head);
      expect(list.select()).toBe(list.tail);
    });

    test('removePointer() on filled list shifts _pointer to previous node if pointer was on tail', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.next();
      list.next();
      list.removePointer();
      expect(list.select()).toBe(list.tail);
    });

    test('removePointer() on filled list can remove head', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      expect(list.removePointer().value).toBe('a');
      expect(list.head.value).toBe('b');
      expect(list.head.next.value).toBe('c');
    });

    test('removePointer() on filled list can remove tail', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.next();
      list.next();
      expect(list.removePointer().value).toBe('c');
      expect(list.tail.value).toBe('b');
      expect(list.tail.previous.value).toBe('a');
    });

    test('removePointer() on filled list decrements list.length by 1', () => {
      list.setHead('a');
      list.insertAfter('b', 'a');
      list.insertAfter('c', 'b');
      list.insertAfter('d', 'c');
      list.removePointer();
      expect(list.length).toBe(3);
      list.next();
      list.removePointer();
      expect(list.length).toBe(2);
      list.next();
      list.removePointer();
      expect(list.length).toBe(1);
    });

    test('', () => {

    });
  });
});
