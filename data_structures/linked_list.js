class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHead(value) {
    if(this.head) this.head = new Node(value, this.head.next, null);
    else this.head = new Node(value, null, null);

    if(this.head.next == null) this.tail = this.head
  }

  setTail(value) {
    if(this.tail) this.tail = new Node(value, null, this.tail.previous);
    else throw new NodeError("Cannot set tail on empty list");
  }

  insertNodeAtStart(value) {

  }
};

class Node {
  constructor(value, next, previous) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
};
