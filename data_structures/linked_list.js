// continue testing set / replace head / tail

class LinkedList {
  constructor(value) {
    if(value) {
      this.head = new Node(value, null, null);
      this.length = 1;
    } else {
      this.head = null;
      this.length = 0;
    };
    this.tail = null;
  }

  setHead(value) {
    if(!this.head) {
      this.head = new Node(value, null, null);
      this.length++;
    } else {
      throw "Head already set";
    };
  }

  replaceHead(value) {
    if(!this.head) {
      throw "No head set";
    } else {
      let next = this.head.next;
      this.head = new Node(value, next, null);
      if(next) next.previous = this.head;
    };
  }

  replaceTail(value) {
    if(!this.tail) {
      throw "No tail set";
    } else {
      let previous = this.tail.previous;
      this.tail = new Node(value, null, previous);
      previous.next = this.tail;
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
