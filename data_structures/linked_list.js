class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHead(value) {
    if(this.head) this.head = new Node(value, this.head.next, null);
    else this.head = new Node(value, null, null);

    if(this.head.next === null) this.tail = this.head;
  }

  setTail(value) {
    if(this.tail) {
      if(this.tail.previous) {
        let newTail = new Node(value, null, this.tail.previous);
        this.tail.previous.next = newTail;
        this.tail = newTail;
      } else {
        let newTail = new Node(value, null, this.head);
        this.head.next = newTail;
        this.tail = newTail;
      };
    } else {
      throw "Cannot set tail on empty list";
    };
  }

  insertAfter(value, target) {
    let thisNode = this.head;
    let foundTarget = false;
    while(!foundTarget) {
      if(thisNode.value === target) {
        let newNode = new Node(value, thisNode.next, thisNode);
        if(thisNode.next !== null) thisNode.next.previous = newNode;
        else this.tail = newNode;
        thisNode.next = newNode;
        foundTarget = true;
      } else {
        thisNode = thisNode.next;
      };
    };
  }

  insertBefore(value, target) {
    let thisNode = this.head;
    let foundTarget = false;
    while(!foundTarget) {
      if(thisNode.value === target) {
        let newNode = new Node(value, thisNode, thisNode.previous);
        if(thisNode.previous !== null) thisNode.previous.next = newNode;
        else this.head = newNode;
        thisNode.previous = newNode;
        foundTarget = true;
      } else {
        thisNode = thisNode.next;
      };
    };
  }

  inList(target) {
    let thisNode = this.head;
    while(true) {
      if(thisNode.value === target) return true;
      else if(thisNode === this.tail) return false;
      else thisNode = thisNode.next;
    };
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
