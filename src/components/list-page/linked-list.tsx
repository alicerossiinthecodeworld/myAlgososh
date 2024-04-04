export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;

  public addToHead(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  public addToTail(value: T): void {
    const newNode = new ListNode(value);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  public deleteFromHead(): T | null {
    if (!this.head) return null;
    const deletedValue = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return deletedValue;
  }

  public deleteFromTail(): T | null {
    if (!this.tail) return null;
    const deletedValue = this.tail.value;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current!.next !== this.tail) {
        current = current!.next;
      }
      current!.next = null;
      this.tail = current;
    }
    this.length--;
    return deletedValue;
  }

  public insertAtIndex(index: number, value: T): void {
    if (index < 0 || index > this.length) throw new Error("Index out of bounds");

    if (index === 0) {
      this.addToHead(value);
      return;
    }

    if (index === this.length) {
      this.addToTail(value);
      return;
    }

    const newNode = new ListNode(value);
    let current = this.head;
    let previous: ListNode<T> | null = null;
    for (let i = 0; i < index; i++) {
      previous = current;
      current = current!.next;
    }

    newNode.next = current;
    if (previous) previous.next = newNode;
    this.length++;
  }

  public deleteAtIndex(index: number): T | null {
    if (index < 0 || index >= this.length) throw new Error("Index out of bounds");

    if (index === 0) return this.deleteFromHead();

    let current = this.head;
    let previous: ListNode<T> | null = null;
    for (let i = 0; i < index; i++) {
      previous = current;
      current = current!.next;
    }

    const deletedValue = current!.value;
    previous!.next = current!.next;
    if (previous!.next === null) this.tail = previous;
    this.length--;
    return deletedValue;
  }

  public getLength(): number {
    return this.length;
  }

  public printList(): void {
    let current = this.head;
    while (current !== null) {
      console.log(current.value);
      current = current.next;
    }
  }
  public getHead(): ListNode<T> | null {
    return this.head;
  }
  public clone(): LinkedList<T> {
    const clonedList = new LinkedList<T>();
    let current = this.head; 
    while (current !== null) { 
      clonedList.addToTail(current.value); 
      current = current.next;
    }
    return clonedList;
  }
}
