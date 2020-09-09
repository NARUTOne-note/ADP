/**
 * tree 表示
 * 
 */

// ! 链式表示
// 一棵二叉树可以由根节点通过左右指针连接起来形成一个树
function BinaryTree() {
  let Node = function (val) {
    this.val = val
    this.left = null
    this.right = null
  }
  let root = null
}

// 数组存储法（适用于完全二叉树）
// 如果我们选取 B 节点 i=2 ，则它父节点为 i/2 = 1 ，左子节点 2i=4 ，右子节点 2i+1=5 。
