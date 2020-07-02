/**
 * 深度优先dfs
 */

/**
 * dfs 递归实现
 *
 * @param {*} nodes
 * @param {*} fn
 * @returns
 */
function dfsRecursion(nodes, fn) {
  if (!nodes || !nodes.length) return [];

  const rs = [...nodes];
  for(let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    rs[i] = fn(n);
    if (rs.children && rs.children.length) {
      rs[i].children = dfsRecursion(rs[i].children, fn);
    }
  }

  return rs;
}

/**
 * 非递归实现
 *
 * @param {*} nodes
 * @param {*} fn
 */
function dfs(nodes, fn) {
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
        stack.unshift(cn.children[i]); // 栈顶
      }
    }
  }
  return rs;
}