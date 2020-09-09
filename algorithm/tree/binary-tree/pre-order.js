/**
 * @host 二叉树 binary tree
 * @member 前序遍历 Pre-order Traversal
 * 根左右
 */

// 迭代实现
function preOrderTree (tree) {
  const res = [];
  const stack = [];
  let currNode = null;

  stack.push(tree);

  while (stack.length) {
    currNode = stack.pop();
    if (currNode) {
      res.push(currNode); // 根
      stack.push(currNode.left) // 左
      stack.push(currNode.right) // 右
    }
  }
  return res;
}

// 递归实现
// 前序遍历
var preorderTraversal = (root) => {
  let result = []
  var preOrderTraverseNode = (node) => {
      if(node) {
          // 先根节点
          result.push(node.val)
          // 然后遍历左子树
          preOrderTraverseNode(node.left)
          // 再遍历右子树
          preOrderTraverseNode(node.right)
      }
  }
  preOrderTraverseNode(root)
  return result
};
