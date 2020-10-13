/**
 * @host 二叉树 binary tree
 * @member 后序遍历 post-order Traversal
 * 左右根
 */

function postOrderTree (tree) {
  const res = [];
  const stack = []; // 栈
  let currNode = null;

  // 首先将根结点入栈
  stack.push(tree);

  while (stack.length) {
    currNode = stack.pop();
    if (currNode) {
      res.unshift(currNode); // 根
      // 若当前子树根结点有左孩子，则将左孩子入栈
      if(cur.left) {
        stack.push(cur.left)
      }
      // 若当前子树根结点有右孩子，则将右孩子入栈
      if(cur.right) {
        stack.push(cur.right)
      }
    }
  }
  return res;
}

function postOrderTree2 (tree) {
  const res = [];
  const stack = [];
  let currNode = tree;
  let last = null;

  while (currNode || stack.length) {
    while (currNode) {
      stack.push(currNode);
      currNode = currNode.left;
    }

    currNode = stack.pop();

    // last限制，不能重复进入右子树
    if (currNode.right && last !== currNode.right) {
      stack.push(currNode);
      currNode = currNode.right;
    } else {
      res.push(currNode);
      last = currNode;
      currNode = null;
    }
  }
 
  return res;
}