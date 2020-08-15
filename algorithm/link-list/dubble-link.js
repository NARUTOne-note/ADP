/**
 * 双链表  null - (prev, next) - (prev, next) - null
 * ? 查找：查找前驱节点或后继节点时间复杂度为 O(1)，其它节点仍为 O(n)
 * ? 插入或删除：插入或删除前驱节点或后继节点的时间复杂度都为 O(1)
 */

function Node (element) {
  this.element = element;
  this.prev = null;
  this.next = null;
}

function DubbleLink () {
  // 初始头节点, 尾节点为 null
  this.head = null;
  this.tail = null;
  // 链表长度
  this.length = 0
}

DubbleLink.prototype.createNode = function (element) {
  return new Node(element);
}

DubbleLink.prototype.getNode = function (element) {
  let p = this.header;
  if (!p) return null;
  while (p) {
    if (p.element === element) return p;
    p = p.next;
  }
  return null;
}

DubbleLink.prototype.insertNode = function (pos, element) {
  const node = this.createNode(element);
  if (pos < 0 || pos > this.length) return;

  if (!pos) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      // 双向
      node.next = this.head;
      this.head.prev = node;

      this.head = node;
    }
  } else if (pos === this.length - 1) { 
    const curr = this.tail;
    curr.next = node;
    node.prev = curr;

    this.tail = node;
  } else {
    let index = 1;
    let prev = this.head;
    let curr = this.head.next;
    while(pos > index) {
      prev = curr;
      curr = curr.next;
      index ++;
    }
    prev.next = node;
    node.prev = prev;
    node.next = curr;
    curr.prev = node;
  }
  this.length += 1;
}

DubbleLink.prototype.deleteNode = function (pos) {
  if (!this.head) return;
  if (pos < 0 || pos > this.length) return;

  if (!pos) {
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
  } else if (pos === this.length -1) {
    this.tail = this.tail.prev;
    this.tail.next = null;
  } else {
    let index = 1;
    let prev = this.head;
    let curr = this.head.next;
    while(pos > index) {
      prev = curr;
      curr = curr.next;
      index ++;
    }

    prev.next = curr.next;
    curr.next.prev = prev;
  }

  this.length -= 1;
}



