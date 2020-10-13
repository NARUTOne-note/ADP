/**
 * @host 二叉树 binary tree
 * @member 中序遍历 In-order Traversal
 * 左根右
 */

function inOrderTree2 (tree) {
  const res = [];
  const stack = [];
  let currNode = tree;

  while (currNode || stack.length) {
    // 获取当前 所有左节点
    while (currNode) {
      stack.push(currNode);
      currNode = currNode.left;
    }

    currNode = stack.pop();
    res.push(currNode);
    currNode = currNode.right; // 当前节点（左、根）的右子树
  }

  return res;
}