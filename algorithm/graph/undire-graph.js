/**
 * 图结构
 * 图是一种复杂的非线性结构，它由边（边Edge）和点（顶点Vertex）组成。一条边连接的两个点称为相邻顶点。
 * G = (V, E)
 * 有向图
 * 无向图
 * @link https://juejin.im/post/5de7c053518825125d1497e2?utm_source=gold_browser_extension
 */

/**
 * ! 无向图
 * ? 特性
 *  1、矩阵的length必然是顶点个数的平方 lengt^2
    2、矩阵斜边必然无值
    3、矩阵依据斜边对称
    
 * * 邻接矩阵：使用二维数组来表示点与点之间是否有边，如 arr[i][j] = 1表示节点 i 与节点 j 之间有边，arr[i][j] = 0表示节点 i 与节点 j 之间没有边
 * *邻接表：邻接表是图的一种链式储存结构，这种结构类似树的子链表，对于图中的每一个顶点Vi，把所有邻接于Vi的顶点Vj链成一个单链表，这个单链表就是顶点Vi的邻接表，单链表一般由数组或字典结构表示。
 */

// Vertex 用数组结构表示，Edge 用 map结构表示
/**
 * [
 *    0, 0, 1, 1,
 *    0, 0, 0, 1,
 *    1, 0, 0, 1,
 *    1, 1, 1, 0
 * ]
 *
 */
function Graph() {
  this.vertices = [] // 顶点集合
  this.edges = new Map() // 边集合
  this.graphJoin = []; // 图集合
}

Graph.prototype.addVertex = function(v) { // 添加顶点方法
  this.addVertexs([v]);
  this.edges.set(v, [])
}

Graph.prototype.addEdge = function (v, w) { // 添加边方法
  // 需要注意key内存地址不一致问题， Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
  let vEdge = this.edges.get(v);
  let wEdge = this.edges.get(w);
  vEdge ? vEdge.push(w) : this.edges.set(v, [w]);
  wEdge ? wEdge.push(v) : this.edges.set(w, [v]);
  this.edges.set(v, vEdge);
  this.edges.set(w, wEdge);

  const vIndex = this.vertices.indexOf(v);
  const wIndex = this.vertices.indexOf(w);
  const len = this.vertices.length;
  this.graphJoin[vIndex * len + wIndex] = 1; // 图填充值
}

Graph.prototype.addVertexs = function(vs) { // 批量添加
  this.vertices = Array.from(new Set([].concat(this.vertices, vs)));
  const len = this.vertices.length;

  this.graphJoin = Array.from({length: len * len});
  
  vs.forEach(v => {
    const edge = this.edges.get(v);
    if (!edge) {
      this.edges.set(v, []);
    }
  })
}

Graph.prototype.addEdges = function (key, links) { // 批量加边
  if (links && links.length) {
    links.forEach((k) => {
      this.addEdge(key, k);
    })
  }
}

Graph.prototype.getEdgesByKey = function (key) {
  return this.edges.get(key);
}

Graph.prototype.getVertexRow = function (key) {
  const index = this.vertices.indexOf(key);
  const len = this.vertices.length;
  const col = len.map(i => this.graphJoin[index + len * i]);
  return col;
}

Graph.prototype.toString = function() {
  var s = '';
  for (var i=0; i<this.vertices.length; i++) {
      s += this.vertices[i] + ' -> ';
      var neighors = this.edges.get(this.vertices[i]);
      for (var j=0; j<neighors.length; j++) {
          s += neighors[j] + ' ';
      }
      s += '\n';
  }
  return s;
}

// 深度优先遍历
Graph.prototype.dfs = function() {
  var marked = []
  for (var i=0; i<this.vertices.length; i++) {
      if (!marked[this.vertices[i]]) {
          dfsVisit(this.vertices[i])
      }
  }
  
  function dfsVisit(u) {
      let edges = this.edges
      marked[u] = true
      console.log(u)
      var neighbors = edges.get(u)
      for (var i=0; i<neighbors.length; i++) {
          var w = neighbors[i]
          if (!marked[w]) {
              dfsVisit(w)
          }
      }
  }
}
// 广度优先遍历
Graph.prototype.bfs = function(v) {
  var queue = [], marked = []
  marked[v] = true
  queue.push(v) // 添加到队尾
  while(queue.length > 0) {
      var s = queue.shift() // 从队首移除
      if (this.edges.has(s)) {
          console.log('visited vertex: ', s)
      }
      let neighbors = this.edges.get(s)
      for(let i=0;i<neighbors.length;i++) {
          var w = neighbors[i]
          if (!marked[w]) {
              marked[w] = true
              queue.push(w)
          }
      }
  }
}

var graph = new Graph()
var vertices = [1, 2, 3, 4, 5]
graph.addVertexs(vertices);
graph.addEdges(1, [3, 4]); //增加边
graph.addEdges(2, [3, 5]);

console.log(graph.toString())
// 1 -> 4 3 
// 2 -> 3 5 
// 3 -> 1 2 
// 4 -> 1 
// 5 -> 2

graph.dfs()
// 1
// 4
// 3
// 2
// 5