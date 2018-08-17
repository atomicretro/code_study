# Abstract Data Structures
A half academic, half practical attempt at creating some of the various abstract data types and structures in JavaScript. Each completed structure has been designed with both usability and efficiency in mind. Each file contains everything the associated structure would need to be usable in real-world applications.

Imports are currently done through CommonJS syntax. To use a data structure you must initialize the structure at the top of your file: `const [DataStructureClass] = require('[file_name.js]');`

The current working data structures are as follows:

### Stack
`new Stack([element])`

FIFO stack implementation of a hash map. The keys of the hash represent their associated value's position in the stack. The 'top-most' element is kept track of using an internal `_pointer` property.

A Stack can be declared with or without a starting element.

* `push(element)` — adds `element` to the top of the stack. O(1) time complexity.
* `pop()` — removes and returns the current top-most element. O(1) time complexity.
* `peek()` — returns the current top-most element. O(1) time complexity.
* `length()` — returns the number of elements in the stack as an integer value. O(1) time complexity.

### Queue
`new Queue([element])`

LIFO queue implementation of a hash map. The keys of the hash represent their associated value's position in the queue. Both the 'front' and 'back' elements are kept track of using internal `_front` and `_back` properties.

A Queue can be declared with or without a starting element.

* `enqueue(element)` — adds `element` to the back of the queue. O(1) time complexity.
* `dequeue()` — removes and returns the element at the front of the queue. O(1) time complexity.
* `length()` — returns the number of elements in the queue as an integer value. O(1) time complexity.
* `peek([n])` — without an argument: returns the next element to be dequeued (AKA the current front-most element). With an argument: returns the nth most element from the front of the queue. O(1) time complexity.
* `peekBack([n])` — without an argument: returns the current back-most element. With an argument: returns the nth most element from the back of the queue. O(1) time complexity.

### Linked List
`new LinkedList([element])`

A doubly-linked list made up of component Nodes. The Nodes are a separate class included in the `linked_list.js` file. The Linked List class keeps track of its `head` and `tail` nodes as well as its `length`.

A Linked List can be declared with or without a starting value. If declared with a value, the Linked List will create a Node with with that value.

**Linked List Properties**
* `head` — returns the current head node. Initializes to `null` if list is empty. O(1) time complexity.
* `tail` — returns the current tail node. Initializes to `null` if list is empty. O(1) time complexity.
* `pointer` — points to a specific node in the list. Initializes to head node if applicable or `null` if list is empty.
* `length` — returns the number of nodes in the list as an integer value. O(1) time complexity.

**Head and Tail Node specific methods**
* `setHead(value)` — creates and assigns a head node on an empty list, or reassigns the head node of a non-empty list. O(1) time complexity.
* `replaceHead(value)` — reassigns the head node of a non-empty list. Will throw a `LinkedListException` if called on an empty-list. O(1) time complexity.
* `replaceTail(value)` — reassigns the tail node of a non-empty list. Will throw a `LinkedListException` if called on an empty-list. O(1) time complexity.

**Pointer methods**
* `select` — returns the current `pointer` node. O(1) time complexity.
* `next` — moves `pointer` to the next node in the list. O(1) time complexity.
* `previous` — moves `pointer` to the previous node in the list. O(1) time complexity.
* `nextAndSelect` — moves `pointer` to the next node in the list and returns that node. O(1) time complexity.
* `previousAndSelect` — moves `pointer` to the previous node in the list and returns that node. O(1) time complexity.

**Insertion methods**
* `insertAfter(value, targetValue)` — inserts a Node with a value of `value` after the first instance of `targetValue` in the list. O(n) time complexity.
* `insertBefore(value, targetValue)` — inserts a Node with the value of `value` before the first instance of `targetValue` in the list. O(n) time complexity.
* `insertAtIndex(value, targetIndex)` — inserts a Node with the value of `value` at `targetIndex`, pushing all subsequent nodes up by one. O(n) time complexity.
* `insertAfterHead(value)` — inserts a Node with the value of `value` immediately after the head node. O(1) time complexity.
* `insertBeforeHead(value)` — inserts a Node with the value of `value` at the beginning of the list, reassigning the head node. O(1) time complexity.
* `insertAfterTail(value)` — inserts a Node with the value of `value` at the end of the list, reassigning the tail node. O(1) time complexity.
* `insertBeforeTail(value)` — inserts a Node with the value of `value` immediately before the tail node. O(1) time complexity.
* `unshift(value)` — alias of `insertBeforeHead(value)`. O(1) time complexity.
* `push(value)` — alias of `insertAfterTail(value)`. O(1) time complexity.
* `insertAfterPointer(value)` — inserts a Node with the value of `value` immediately after the pointer node. O(1) time complexity.
* `insertBeforePointer(value)` — inserts a Node with the value of `value` immediately before the pointer node. O(1) time complexity.

**Removal methods**
* `remove(target)` — removes and returns the first node whose `value` matches the `target`. O(n) time complexity.
* `removeAtIndex(targetIndex)` — removes and returns the node at `targetIndex`. O(n) time complexity.
* `removeHead()` — removes and returns the head node. Reassigns the head node to the new first node. Will throw a `LinkedListException` if called on a list with only one node. O(1) time complexity.
* `removeTail()` — removes and returns the tail node. Reassigns the tail node to the new last node. Will throw a `LinkedListException` if called on a list with only one node. O(1) time complexity.
* `shift()` — alias of `removeHead()`. O(1) time complexity.
* `pop()` — alias of `removeTail()`. O(1) time complexity.
* `removePointer()` — removes and returns the pointer node. Reassigns `pointer` to the next node in the list. Will throw a `LinkedListException` if called on a list with only one node. O(1) time complexity.

**Count and Find methods**
* `count([target])` — without a `target`: enumerates through each Node of the Linked List to return a count of all the nodes. with a `target`: enumerates through each Node of the Linked List to return a count of all the nodes whose `value` matches `target`; O(n) time complexity.
* `includes(target)` — returns a boolean indicating whether a node in the list has a value of `target`. O(n) time complexity.
* `find(target)` — returns the index number of the first node whose value matches `target`, or `-1` if there are no matches. O(n) time complexity.
* `findAtIndex(targetIndex)` — returns the Node at `targetIndex`, or `-1` if `targetIndex` is out of range. O(n) time complexity.
* `findAll(target)` — returns a count of all the nodes whose values match `target`. O(n) time complexity.
