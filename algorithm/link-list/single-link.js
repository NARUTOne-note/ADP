/**
 * 单链表 next-nex-null
 * ? 查找：从头节点开始查找，时间复杂度为 O(n)
 * ? 插入或删除：在某一节点后插入或删除一个节点（后继节点）的时间复杂度为 O(1)
 */

function Node (val) {
  this.val = val;
  this.next = null;
}

function SingleLink () {
  // 初始头节点为 null
  this.head = null
  // 链表长度
  this.length = 0
}

SingleLink.prototype.createNode = function (val) {
  return new Node(val);
}

//遍历节点
SingleLink.prototype.disPlay = function() {
  let res = new Array()
  let current = this.head
  while (current !== null) {
    res.push(current.val)
    current = current.next
  }
  return res
}

SingleLink.prototype.append = function(val) {
  let node = new Node(val);
  let p = this.heade;
  if (!this.head) {
    this.head = node;
  } else {
    while (p.next) {
      p = p.next;
    }
    p.next = node
  }
  this.length += 1;
}

SingleLink.prototype.getNode = function (val) {
  let p = this.header;
  if (!p) return null;
  while (p) {
    if (p.val === val) return p;
    p = p.next;
  }
  return null;
}

// 获取值为nodeVal的前一个节点,找不到为-1,参数是val
// 适用于链表中无重复节点
SingleLink.prototype.findNodePreByVal = function (nodeVal) {
  let current = this.head;
  while (current.next !== null && current.next.val !== nodeVal)
    current = current.next
  return current !== null ? current : -1
}

// 根据index查找当前节点, 参数为index
SingleLink.prototype.findByIndex = function (index) {
  let current = this.head,
    pos = 1
  while (current.next !== null && pos !== index) {
    current = current.next
    pos++
  }

  return (current && pos === index) ? current : -1
}

SingleLink.prototype.insertNode = function (pos, val) {
  const node = this.createNode(val);

  if (pos < 0 || pos > this.length) return;

  if (!pos) {
    node.next = this.head;
    this.head = node;
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
    node.next = curr;
  }
  this.length += 1;
}

SingleLink.prototype.deleteNode = function (pos) {
  if (!this.head) return;
  if (pos < 0 || pos > this.length) return;
  if (!pos) {
    const p = this.head;
    const nextNode = this.head.next;
    p.next = null;
    this.head = nextNode;
  } else {
    let prev = this.head;
    let curr = this.head;
    let index = 0;

    while (index < pos) {
      prev = curr;
      curr = curr.next;
      index ++;
    }

    const nextNode = curr.next;
    prev.next = nextNode;
  }
  this.length -= 1;
}

// ! 循环单链表： 首尾相连的环   next1 - next2 - ... - next1- next2 - ...

// 插入 position 的后继节点: 遍历到尾节点，然后在尾节点后插入节点
function insert (position, val) {
  // 创建插入节点
  let node = new createNode(val)
  if (position >= 0 && position <= length) {
    let prev = head, 
        curr = head,
        index = 0
    if(position === 0) {
      // 与单链表插入不同的
      while(index < length) {
        prev = curr
        curr = curr.next
        index ++
      }
      prev.next = node
      node.next = curr
      head = node
    } else {
      while(index < position) {
        prev = curr
        curr = curr.next
        index ++
      }
      prev.next = node
      node.next = curr
    }
    length += 1
  } else {
    return null
  }
}

// 测试
list.insert(10)

// 判断链表中是否存在某节点: 循环结束条件为 index++ < length
function search(val) {
  if (!head) return false
  let p = head, index = 0
  // 和单链表的不同所在
  while(index++ < length) {
    if (p.val === val) return true
    p = p.next
  }
  return false
}

// 测试
list.search(4) // true
list.search(11) // false


// 删除值为 val 节点: 循环结束条件为 index++ < length
function remove (val) {
  let p = head, prev = head, index = 0
  // 空链表
  if(!head) return
  // 仅有一个节点且val一致
  if(length === 1 && head.val === val){  
    head = null
    length-- 
    return  
  }
  while(index++ < length) {
    if(p.val === val) {
      p = p.next
      prev.next = p
      length --
    } else {
        prev = p
        p = p.next  
    }
  }
}
