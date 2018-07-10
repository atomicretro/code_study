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
    if(this.head) {
      let next = this.head.next;
      this.head = new Node(value, next, null);
      if(next) next.previous = this.head;
    } else {
      this.length++;
      this.head = new Node(value, null, null);
      this.tail = this.head;
    };
  }

  setTail(value) {
    if(this.head) {
      if(this.length === 1) this.length++;
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

    let foundTarget = false;
    let thisNode = this.head;
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

    let foundTarget = false;
    let thisNode = this.head;
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
    let count = 0;
    let thisNode = this.head;
    while(thisNode) {
      thisNode = thisNode.next;
      count++;
    };
    return count;
  }

  inList(target) {
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) return true;
      else thisNode = thisNode.next;
    };
    return false;
  }

  findIndex(target) {
    let count = 0;
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) {
        return count;
      } else {
        thisNode = thisNode.next;
        count++;
      };
    };
    return -1;
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
