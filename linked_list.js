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
      this.length = 0;
      this._pointer = null;
    };
  }

  setHead(value) {
    if(this.head) {
      this.head.value = value;
    } else {
      this.head = new LLNode(value, null, null);
      this.tail = this.head;
      this._pointer = this.head;
      this.length = 1;
    };
  }

  replaceHead(value) {
    if(this.head) this.head.value = value;
    else throw new LinkedListException("No head set");
  }

  replaceTail(value) {
    if(this.tail && this.tail === this.head) {
      this.replaceHead(value);
    } else if(this.tail) {
      let previous = this.tail.previous;
      this.tail = new LLNode(value, null, previous);
      previous.next = this.tail;
    } else {
      throw new LinkedListException("No tail set");
    };
  }

  select() {
    return this._pointer;
  }

  next() {
    if(!this._pointer || !this._pointer.next) return undefined;
    else this._pointer = this._pointer.next;
  }

  previous() {
    if(!this._pointer || !this._pointer.previous) return undefined;
    else this._pointer = this._pointer.previous;
  }

  nextAndSelect() {
    this.next();
    return this._pointer;
  }

  previousAndSelect() {
    this.previous();
    return this._pointer;
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
    this.insertBeforeHead(value);
  }

  push(value) {
    this.insertAfterTail(value);
  }

  insertAfterPointer(value) {
    if(!this.head) return undefined;
    this._insertAfter(value, this._pointer);
  }

  insertBeforePointer(value) {
    if(!this.head) return undefined;
    this._insertBefore(value, this._pointer);
  }

  remove(target) {
    if(!this.head) return undefined;
    if(this.length === 1) return this._removeOnlyNode();
    if(this.head.value === target) return this._removeHead();
    let thisNode = this.head.next;
    while(thisNode) {
      if(thisNode.value === target) {
        if(this.select() === thisNode) this._pointerHelper();
        this._remove(thisNode);
        return thisNode;
      } else {
        thisNode = thisNode.next;
      };
    };
    return -1;
  }

  removeAtIndex(targetIndex) {
    if(!this.head) return undefined;
    if(this.length === 1 && targetIndex === 0) return this._removeOnlyNode();
    if(targetIndex === 0) return this._removeHead();
    let currentIdx = 1;
    let thisNode = this.head.next;
    while(thisNode) {
      if(currentIdx === targetIndex) {
        if(this.select() === thisNode) this._pointerHelper();
        this._remove(thisNode);
        return thisNode;
      } else {
        currentIdx++;
        thisNode = thisNode.next;
      };
    };
    return -1;
  }

  removeHead() {
    if(!this.head) return undefined;
    if(this.length === 1) return this._removeOnlyNode();
    let toBeRemoved = this.head;
    this._removeHead();
    if(this.select() === toBeRemoved) this._pointerHelper();
    return toBeRemoved;
  }

  shift() {
    return this.removeHead();
  }

  removeTail() {
    if(!this.head) return undefined;
    if(this.length === 1) return this._removeOnlyNode();
    let toBeRemoved = this.tail;
    this._remove(this.tail);
    if(this.select() === toBeRemoved) this._pointerHelper();
    return toBeRemoved;
  }

  pop() {
    return this.removeTail();
  }

  removePointer() {
    if(!this.head) return undefined;
    if(this.length === 1) return this._removeOnlyNode();
    let toBeRemoved = this._pointer;
    if(this._pointer === this.head) {
      this._removeHead();
      this._pointer = toBeRemoved.next;
    } else {
      this._remove(this._pointer);
      if(toBeRemoved.next) this._pointer = toBeRemoved.next;
      else this._pointer = this.tail;
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
    if(target > self.length - 1) return -1;
    let thisNode = this.head;
    for(let count = 0; count < target; count++) {
      thisNode = thisNode.next;
    };
    return thisNode;
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

  _remove(thisNode) {
    thisNode.previous.next = thisNode.next;
    if(thisNode.next) thisNode.next.previous = thisNode.previous;
    else this.tail = thisNode.previous
    this.length--;
  }

  _removeHead() {
    this.head.next.previous = null;
    this.head = this.head.next;
    this.length--;
  }

  _removeOnlyNode() {
    let toBeRemoved = this.head;
    this.head = null;
    this.tail = null;
    this._pointer = null;
    this.length--;
    return toBeRemoved;
  }

  _pointerHelper() {
    this._pointer = this.head;
  }
};

module.exports = LinkedList;
