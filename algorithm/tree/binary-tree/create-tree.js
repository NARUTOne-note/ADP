/**
 * 二叉树构建
 * ? 前序 + 中序
 * ? 中序 + 后续
 * 
 * 前序：12473568
 * 中序：47215386
 * 后序：74258631
 */

// ! DFS方式

/**
 * 前序 + 中序
 * 1、前序获取根节点 1
 * 2、中序获取左子树 472 右子树 5386
 * 3、以此类推
 */
function buildTree (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  function helper (start, end) {
    if (start > end) return null;

    const node = preorder.shift(); // 前序逐步递归进行分配
    const index = inorder.indexOf(node); // 获取索引

    if (index < 0) return node;

    node.left = helper(start, index - 1);
    node.right = helper(index + 1, end);

    return node;
  }

  return helper(0, preorder.length - 1);
}

/**
 * 后序 + 中序
 * 1、后序获取根节点 1
 * 2、中序获取左子树 472 右子树 5386
 * 3、以此类推
 */
function buildTree (inorder, postorder) {
  if (!postorder.length || !inorder.length) return null;

  function helper (li, ri, lp, rp) {
    const rootNode = postorder[rp];
    const index = inorder.indexOf(rootNode);

    if (li >= ri) {
      return inorder[li] || inorder[ri];
    }

    if (index > -1) {
      rootNode.left = index > li ? helper(
        li, 
        index - 1, 
        lp, 
        lp + index - 1 - li // 后左 数量等于 中左
      ) : null;
      rootNode.right = ri > index ? helper(
        index + 1, 
        ri, 
        lp + index - li, // 后左 + 1
        rp - 1 // 后右 - 1
      ) : null;
    }
    return rootNode;
  }

  return helper(0, inorder.length -1, 0, postorder.length - 1);
}

// ! BFS 遍历：进行序列化和反序列化构建树的

function serialize (root) {
  let q1 = [root];
  let q2 = [];
  const res = [];

  while (q1.length && root) {
    q2 = []; // 清空当前层容器

    for (let i = 0; i < q1.length; i ++) {
      if (q1[i]) {
        res.push(q1[i].val)
        q2.push(q1[i].left);
        q2.push(q1[i].right);
      } else {
        res.push(null);
      }
    }
    q1 = q2;
  }

  // 去除末尾null
  while(res[res.length - 1] === null) {
    res.pop();
  }
  return JSON.stringify(res);
}

function deserialize (ds) {
  const data = JSON.parse(ds);
  const queue = [];
  let root = null;
  let val = null;

  if (data.length) {
    val = data.shift(); // 获取根
    root = val;
    queue = [root];
  }

  while(data.length) {
    while(queue.length) {
      const lnode = data.shift() || null;
      const rnode = data.shift() || null;
      val = queue.shift();

      if (lnode !== null) {
        val.left = lnode;
        queue.push(val.left);
      }

      if (rnode !== null) {
        val.right = rnode;
        queue.push(val.right);
      }

    }
  }
  return root;
}
