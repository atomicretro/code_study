// continue testing set / replace head / tail

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
      this.head = new LLNode(value, null, null);
      this.length = 1;
    } else {
      this.head = null;
      this.length = 0;
    };
    this.tail = null;
  }

  setHead(value) {
    if(!this.head) {
      this.head = new LLNode(value, null, null);
      this.length++;
    } else {
      throw new NodeException("Head already set");
    };
  }

  replaceHead(value) {
    if(!this.head) {
      throw new NodeException("No head set");
    } else {
      let next = this.head.next;
      this.head = new LLNode(value, next, null);
      if(next) next.previous = this.head;
    };
  }

  replaceTail(value) {
    if(!this.tail) {
      throw new NodeException("No tail set");
    } else {
      let previous = this.tail.previous;
      this.tail = new LLNode(value, null, previous);
      previous.next = this.tail;
    };
  }

  insertAfter(value, target) {
    if(!this.head) return -1;

    let foundTarget = false;
    let thisNode = this.head;
    while(!foundTarget) {
      if(thisNode.value === target) {
        let newNode = new LLNode(value, thisNode.next, thisNode);
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
    if(!this.head) return -1;

    let foundTarget = false;
    let thisNode = this.head;
    while(!foundTarget) {
      if(thisNode.value === target) {
        let newNode = new LLNode(value, thisNode, thisNode.previous);
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

  insertAfterHead(value) {
    if(!this.head) throw new NodeException("No head set");

    let next = this.head.next;
    let newNode = new LLNode(value, next, this.head)
    if(next) next.previous = newNode;
    else this.tail = newNode;
    this.head.next = newNode;
    this.length++;
  }

  insertBeforeHead(value) {
    if(!this.head) throw new NodeException("No head set");

    let newNode = new LLNode(value, this.head, null);
    this.head.previous = newNode;
    if(!this.tail) this.tail = this.head;
    this.head = newNode;
    this.length++;
  }

  insertAfterTail(value) {
    if(!this.tail) throw new NodeException("No tail set");

    let newNode = new LLNode(value, null, this.tail);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  insertBeforeTail(value) {
    if(!this.tail) throw new NodeException("No tail set");

    let newNode = new LLNode(value, this.tail, this.tail.previous);
    this.tail.previous.next = newNode;
    this.tail.previous = newNode;
    this.length++;
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
};

class LLNode {
  constructor(value, next, previous) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
};
