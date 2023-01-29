// program to implement queue data structure

export class Queue {
  constructor() {
      this.items = [];
  }
  
  // add element to the queue
  enqueue(element) {
      return this.items.push(element);
  }
  
  // remove element from the queue
  dequeue() {
      if(this.items.length > 0) {
          return this.items.shift();
      }
  }
  
  // view the last element
  peek() {
      return this.items[this.items.length - 1];
  }
  
  // check if the queue is empty
  isEmpty(){
     return this.items.length == 0;
  }
 
  // the size of the queue
  size(){
      return this.items.length;
  }

  // empty the queue
  clear(){
      this.items = [];
  }
  // empty the queue
  reverse(){
      this.items = this.items.reverse();
  }
}


/*

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(4);
queue.enqueue(8);
console.log(queue.items);

queue.dequeue();
console.log(queue.items);

console.log(queue.peek());

console.log(queue.isEmpty());

console.log(queue.size());

queue.clear();
console.log(queue.items);



OUTPUT:

[1, 2, 4, 8]
[2, 4, 8]
8
false
3
[]

*/