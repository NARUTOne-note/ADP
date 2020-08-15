/**
 * @host 二叉树 binary tree
 * @member 前序遍历 Pre-order Traversal
 * 根左右
 */

function preOrderTree (tree) {
  const res = [];
  const stack = [];
  let currNode = null;

  stack.push(tree);

  while (stack.length) {
    currNode = stack.pop();
    if (currNode) {
      res.push(currNode);
      stack.push(currNode.right)
      stack.push(currNode.left)
    }
  }
  return res;
}