class LinkedList {
  constructor(headNode, tailNode) {
    this.head = headNode;
    this.tail = tailNode;
  }

  insertNodeAtStart(value) {

  }
};

class Node {
  constructor(value, next, previous) {
    this.value = value;

    if(next) this.next = next;
    else this.next = null;

    if(previous) this.previous = previous;
    else this.previous = null;
  }
};
