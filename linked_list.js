function LinkedListException(message) {
   this.message = message;
   this.name = 'LinkedListException';
}

function NodeException(message) {
   this.message = message;
   this.name = 'NodeException';
}

class LinkedList {
  constructor(value) {
    if(value) {
      this.setHead(value);
    } else {
      this.head = null;
      this.tail = null;
      this.length = 0;
    };
  }

  setHead(value) {
    if(this.head) {
      throw new NodeException("Head already set");
    } else {
      this.head = new LLNode(value, null, null);
      this.tail = this.head;
      this.length = 1;
    };
  }

  replaceHead(value) {
    if(this.head) {
      let next = this.head.next;
      this.head = new LLNode(value, next, null);
      if(next) next.previous = this.head;
      else this.tail = this.head;
    } else {
      throw new NodeException("No head set");
    };
  }

  replaceTail(value) {
    if(this.tail && this.tail === this.head) {
      this.repalceHead(value);
    } else if(this.tail) {
      let previous = this.tail.previous;
      this.tail = new LLNode(value, null, previous);
      previous.next = this.tail;
    } else {
      throw new NodeException("No tail set");
    };
  }

  insertAfter(value, target) {
    if(!this.head) throw new LinkedListException("Empty list");

    let foundTarget = false;
    let thisNode = this.head;
    while(!foundTarget) {
      if(thisNode.value === target) {
        let newNode = new LLNode(value, thisNode.next, thisNode);
        if(thisNode.next) thisNode.next.previous = newNode;
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
    if(!this.head) throw new LinkedListException("Empty list");

    let foundTarget = false;
    let thisNode = this.head;
    while(!foundTarget) {
      if(thisNode.value === target) {
        let newNode = new LLNode(value, thisNode, thisNode.previous);
        if(thisNode.previous) thisNode.previous.next = newNode;
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

  insertAfterIdx(value, index) {

  }

  insertBeforeIdx(value, index) {

  }

  insertAfterHead(value) {
    if(!this.head) throw new NodeException("No head set");
    this.insertAfter(value, this.head.value);
  }

  insertBeforeHead(value) {
    if(!this.head) throw new NodeException("No head set");
    this.insertBefore(value, this.head.value);
  }

  unshift(value) {
    if(!this.head) throw new LinkedListException("Empty list");
    this.insertBefore(value, this.head.value);
  }

  insertAfterTail(value) {
    if(!this.tail) throw new NodeException("No tail set");

    let newNode = new LLNode(value, null, this.tail);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  } //gotta add if/else's like insertBeforeTail

  push(value) {
    this.insertAfterTail(value);
  }

  insertBeforeTail(value) {
    if(this.tail && this.tail === this.head) {
      let newNode = new LLNode(value, this.tail, null);
      this.tail.previous = newNode;
      this.head = newNode;
      this.length++;
    } else if(this.tail) {
      let newNode = new LLNode(value, this.tail, this.tail.previous);
      this.tail.previous.next = newNode;
      this.tail.previous = newNode;
      this.length++;
    } else {
      throw new NodeException("No tail set");
    };
  }

  remove(target) {
    if(!this.head) throw new LinkedListException("Empty list");

    if(this.head.value === target) {
      let toBeRemoved = this.head;
      toBeRemoved.next.previous = null;
      this.head = toBeRemoved.next;
      this.length--;
      return toBeRemoved;
    };

    let thisNode = this.head.next;
    while(thisNode) {
      if(thisNode.value === target) {
        thisNode.previous.next = thisNode.next;
        if(thisNode.next) thisNode.next.previous = thisNode.previous;
        else this.tail = thisNode.previous
        this.length--;
        return thisNode;
      } else {
        thisNode = thisNode.next;
      };
    };

    return -1;
  }

  removeAtIdx(index) {

  }

  removeHead() {

  }

  shift() {
    this.removeHead();
  }

  removeTail() {

  }

  pop() {
    this.removeTail();
  }

  count() {
    let count = 0;
    let thisNode = this.head;
    while(thisNode) {
      thisNode = thisNode.next;
      count++;
    };
    return count;
  } //add optional value; if included will count all instances of value in LL

  inList(target) {
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) return true;
      else thisNode = thisNode.next;
    };
    return false;
  }

  findAtIndex(target) {
    let count = 0;
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) {
        return thisNode;
      } else {
        thisNode = thisNode.next;
        count++;
      };
    };
    return -1;
  }

  findAll(target) {

  }
};

class LLNode {
  constructor(value, next, previous) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
};
