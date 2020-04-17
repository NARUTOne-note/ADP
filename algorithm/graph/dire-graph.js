/**
 * ! 有向图
 * 点间的连接有方向
 * [
// v0  v1  v2  v3  v4
   0,  0,  1,  0,  0, // v0
   0,  0,  0,  0,  1, // v1
   0,  0,  0,  1,  0, // v2
   1,  1,  0,  0,  0, // v3
   0,  0,  1,  1,  0, // v4
]

 * ? 特点
第i个顶点的度为第i行与第i列非零元素个数之和
矩阵的length必然是顶点个数的平方 lengt^2
矩阵斜边必然无值
第i行非零元素的个数为第i个顶点的出度
第i列非零元素的个数为第i个顶点的入度
 */



/**
 * ! 加权有向图
 * 由于当前节点与本身的是存在存在关联关系的，所以权重为0
 */

// const arr = [
//   v0  v1  v2  v3  v4
//   0,  ∞,  1,  ∞,  ∞, // v0
//   ∞,  0,  ∞,  ∞,  4, // v1
//   ∞,  ∞,  0,  3,  ∞, // v2
//   5,  3,  ∞,  0,  ∞, // v3
//   ∞,  ∞,  1,  6,  0, // v4
// ]

// 搜寻链路
lookupLink (params) {
  return params.reduceRight((total, current) => {
    if (total[total.length - 1] === current[0] && current[1]) {
      total.push(current[1]);
    }
    return total;
  }, params[params.length - 1]).reverse();
}

// 迪科斯彻最短路径  
dijkstra (startId, endID) {
  const stack = this.getVertexRow(startId).map((item, index) => [
    item,
    this.vertex[index],
    startId,
  ]).sort((a, b) => b[0] - a[0]);
  const nodes = [];

  while (stack.length) {
    // 删除最后节点
    const node = stack.pop();
    const [weights, side] = node;

    nodes.push(node);
    if (side === endID) break;

    if (weights) {
      const children = this.getVertexRow(side).map((item, index) => [item, this.vertex[index]]);
      children.forEach((item) => {
        let single = [];
        stack.some((value) => {
          if (value[1] === item[1]) {
            single = value;
            return true;
          }
          return false;
        });

        const [nodeWeights, id] = single;
        // const index
        if (id && weights + item[0] < nodeWeights) {
          single[0] = weights + item[0];
          single[2] = side;
        }
      });
    }
    stack.sort((a, b) => b[0] - a[0]);
  }

  return nodes;
}

const router = demo2.dijkstra('v4', 'v3');
console.log(`距离：${router[router.length - 1][0]}, 路线：${demo.lookupLink(router.map(item => [item[1], item[2]]))}`);
// 距离：4, 路线：v4,v2,v3
