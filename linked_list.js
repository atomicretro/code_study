function LinkedListException(message) {
   this.message = message;
   this.name = 'LinkedListException';
}

class LLNode {
  constructor(value, next, previous) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
};

class LinkedList {
  constructor(value) {
    if(value !== undefined) {
      this.setHead(value);
    } else {
      this.head = null;
      this.tail = null;
      this.pointer = null;
      this.length = 0;
    };
  }

  setHead(value) {
    if(this.head) {
      this.replaceHead(value)
    } else {
      this.head = new LLNode(value, null, null);
      this.tail = this.head;
      this.pointer = this.head;
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
      throw new LinkedListException("No head set");
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
      throw new LinkedListException("No tail set");
    };
  }

  select() {
    return this.pointer;
  }

  next() {
    if(this.pointer.next) this.pointer = this.pointer.next;
    else return undefined;
  }

  previous() {
    if(this.pointer.previous) this.pointer = this.pointer.previous;
    else return undefined;
  }

  nextAndSelect() {
    this.forward();
    return this.pointer;
  }

  previousAndSelect() {
    this.back();
    return this.pointer();
  }

  insertAfter(value, target) {
    if(!this.head) return undefined;
    let insertCallback = this._insertAfter.bind(this);
    return this._insertHelper(value, target, insertCallback);
  }

  insertBefore(value, target) {
    if(!this.head) return undefined;
    let insertCallback = this._insertBefore.bind(this);
    return this._insertHelper(value, target, insertCallback);
  }

  insertAtIndex(value, targetIdx) {
    if(!this.head) return undefined;
    let insertCallback = this._insertBefore.bind(this);
    return this._insertHelperIdx(value, targetIdx, insertCallback);
  }

  insertAfterHead(value) {
    if(!this.head) return undefined;
    this._insertAfter(value, this.head);
  }

  insertBeforeHead(value) {
    if(!this.head) return undefined;
    this._insertBefore(value, this.head);
  }

  insertAfterTail(value) {
    if(!this.head) return undefined;
    this._insertAfter(value, this.tail);
  }

  insertBeforeTail(value) {
    if(!this.head) return undefined;
    this._insertBefore(value, this.tail);
  }

  unshift(value) {
    if(!this.head) return undefined;
    this._insertBefore(value, this.head);
  }

  push(value) {
    if(!this.head) return undefined;
    this._insertAfter(value, this.tail);
  }

  insertAfterPointer(value) {
    if(!this.head) return undefined;
    this._insertAfter(value, this.pointer);
  }

  insertBeforePointer(value) {
    if(!this.head) return undefined;
    this._insertBefore(value, this.pointer);
  }

  remove(target) {
    if(!this.head) return undefined;
    if(this.head.value === target) return this.removeHead();
    return this._removeHelper(target);
  }

  removeAtIndex(targetIndex) {
    if(!this.head) return undefined;
    if(targetIndex === 0) return this.removeHead();
    return this._removeHelperIdx(targetIndex);
  }

  removeHead() {
    let toBeRemoved = this.head;
    if(this.length === 1) {
      throw new LinkedListException("Cannot empty out List");
      // this.head = null; this.tail = null;
      // eventually implement ability to completely empty out list
    } else {
      toBeRemoved.next.previous = null;
      this.head = toBeRemoved.next;
    };
    this.length--;
    return toBeRemoved;
  }

  shift() {
    return this.removeHead();
  }

  removeTail() {
    let toBeRemoved = this.tail;
    if(this.length === 1) {
      throw new LinkedListException("Cannot empty out List");
    } else {
      toBeRemoved.previous.next = null;
      this.tail = toBeRemoved.previous;
    };
    this.length--;
    return toBeRemoved;
  }

  pop() {
    return this.removeTail();
  }

  removePointer() {
    let toBeRemoved = this.pointer;
    if(this.length === 1) {
      throw new LinkedListException("Cannot empty out List");
    } else {
      this._remove(this.pointer);
      this.pointer = toBeRemoved.next;
    };
    return toBeRemoved;
  }

  count(target) {
    if(target !== undefined) {
      return this.findAll(target);
    } else {
      let count = 0;
      let thisNode = this.head;
      while(thisNode) {
        count++;
        thisNode = thisNode.next;
      };
      return count;
    };
  }

  includes(target) {
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) return true;
      else thisNode = thisNode.next;
    };
    return false;
  }

  find(target) {
    let count = 0;
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) {
        return count;
      } else {
        count++;
        thisNode = thisNode.next;
      };
    };
    return -1;
  }

  findAtIndex(target) {
    let count = 0;
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) {
        return thisNode;
      } else {
        count++;
        thisNode = thisNode.next;
      };
    };
    return -1;
  }

  findAll(target) {
    let count = 0;
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) count++;
      thisNode = thisNode.next;
    };
    return count;
  }

  _insertHelper(value, target, insertCallback) {
    let foundTarget = false;
    let thisNode = this.head;
    while(!foundTarget) {
      if(thisNode.value === target) {
        insertCallback(value, thisNode);
        foundTarget = true;
      } else if(thisNode === this.tail) {
        return -1;
      } else {
        thisNode = thisNode.next;
      };
    };
  }

  _insertHelperIdx(value, targetIdx, insertCallback) {
    let currentIdx = 0;
    let foundTarget = false;
    let thisNode = this.head;
    while (!foundTarget) {
      if(currentIdx === targetIdx) {
        insertCallback(value, thisNode);
        foundTarget = true;
      } else if(thisNode === this.tail) {
        return -1;
      } else {
        currentIdx++;
        thisNode = thisNode.next;
      };
    };
  }

  _insertAfter(newValue, thisNode) {
    let newNode = new LLNode(newValue, thisNode.next, thisNode);
    if(thisNode.next) thisNode.next.previous = newNode;
    else this.tail = newNode;
    thisNode.next = newNode;
    this.length++;
  }

  _insertBefore(newValue, thisNode) {
    let newNode = new LLNode(newValue, thisNode, thisNode.previous);
    if(thisNode.previous) thisNode.previous.next = newNode;
    else this.head = newNode;
    thisNode.previous = newNode;
    this.length++;
  }

  _removeHelper(target) {
    let thisNode = this.head.next;
    while(thisNode) {
      if(thisNode.value === target) {
        this._remove(thisNode);
        return thisNode;
      } else {
        thisNode = thisNode.next;
      };
    };
    return -1;
  }

  _removeHelperIdx(targetIndex) {
    let currentIdx = 1;
    let thisNode = this.head.next;
    while(thisNode) {
      if(currentIdx === targetIndex) {
        this._remove(thisNode);
        return thisNode;
      } else {
        currentIdx++;
        thisNode = thisNode.next;
      }
    }
    return -1;
  }

  _remove(thisNode) {
    thisNode.previous.next = thisNode.next;
    if(thisNode.next) thisNode.next.previous = thisNode.previous;
    else this.tail = thisNode.previous
    this.length--;
  }
};

export default LinkedList;
