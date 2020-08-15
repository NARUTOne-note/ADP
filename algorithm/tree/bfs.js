/**
 * 广度优先bfs
 */


/**
 * 非递归实现
 *
 * @param {*} nodes
 * @param {*} fn
 */
function bfs(nodes, fn) {
  if (!nodes || !nodes.length) return [];

  const rs = [];
  const stack = [];

  //先将第一层节点放入栈
  for (let i = 0, len = nodes.length; i < len; i++) {
    stack.push(nodes[i]);
  }
  while (stack.length) {
    const n = stack.shift(); // 栈顶
    const cn = fn(n);
    rs.push(cn);

    if (cn.children && cn.children.length) {
      const len = cn.children.length;
      for (let i = 0; i < len; i++) {
        stack.push(cn.children[i]); // 栈尾
      }
    }
  }
  return rs;
}