// count returns 1 when length === 0
// some methods check for length === 0, some check for head === null
// while(true) makes me uncomfortable; while(thisNode !== this.tail)
//  doesn't check tails node

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  setHead(value) {
    if(this.head) this.head = new Node(value, this.head.next, null);
    else this.head = new Node(value, null, null);
    this.length++;
    if(this.head.next === null) this.tail = this.head;
  }

  setTail(value) {
    if(this.tail) {
      this.length++;
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
    if(this.length === 0) return -1;

    let thisNode = this.head;
    let foundTarget = false;
    while(!foundTarget) {
      if(thisNode.value === target) {
        let newNode = new Node(value, thisNode.next, thisNode);
        if(thisNode.next !== null) thisNode.next.previous = newNode;
        else this.tail = newNode;
        thisNode.next = newNode;
        this.length++;
        foundTarget = true;
      } else if(thisNode === this.tail) {
        return -1;
      } else {
        thisNode = thisNode.next;
      };
    };
  }

  insertBefore(value, target) {
    if(this.length === 0) return -1;

    let thisNode = this.head;
    let foundTarget = false;
    while(!foundTarget) {
      if(thisNode.value === target) {
        let newNode = new Node(value, thisNode, thisNode.previous);
        if(thisNode.previous !== null) thisNode.previous.next = newNode;
        else this.head = newNode;
        thisNode.previous = newNode;
        this.length++;
        foundTarget = true;
      } else if(thisNode === this.tail) {
        return -1;
      } else {
        thisNode = thisNode.next;
      };
    };
  }

  count() {
    let thisNode = this.head;
    let count = 1;
    while(thisNode !== this.tail) {
      count++;
      thisNode = thisNode.next;
    }
    return count;
  }

  inList(target) {
    if(this.head === null) return false;

    let thisNode = this.head;
    while(true) {
      if(thisNode.value === target) return true;
      else if(thisNode === this.tail) return false;
      else thisNode = thisNode.next;
    };
  }

  findIndex(target) {
    if(this.head === null) return -1;

    let thisNode = this.head;
    let count = 0;
    while(true) {
      if(thisNode.value === target) return count;
      else if(thisNode === this.tail) return -1;
      else {
        thisNode = thisNode.next;
        count++;
      };
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
