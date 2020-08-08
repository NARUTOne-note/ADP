/**
 * @host 二叉树 binary tree
 * @member 后序遍历 post-order Traversal
 * 左右根
 */

function postOrderTree (tree) {
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