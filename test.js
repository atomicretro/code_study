import LinkedList from './linked_list.js';

let l = new LinkedList(2);
l.push(3);
l.push(4);
console.log(l.head);
console.log(l.head.next);
console.log(l.head.next.next);
console.log(l.head.next.next.next);
