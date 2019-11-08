/**
 * 图结构
 * 图是一种复杂的非线性结构，它由边（边Edge）和点（顶点Vertex）组成。一条边连接的两个点称为相邻顶点。
 * G = (V, E)
 * 有向图
 * 无向图
 */

/**
 * ! 无向图
 * * 邻接矩阵：使用二维数组来表示点与点之间是否有边，如 arr[i][j] = 1表示节点 i 与节点 j 之间有边，arr[i][j] = 0表示节点 i 与节点 j 之间没有边
 * *邻接表：邻接表是图的一种链式储存结构，这种结构类似树的子链表，对于图中的每一个顶点Vi，把所有邻接于Vi的顶点Vj链成一个单链表，这个单链表就是顶点Vi的邻接表，单链表一般由数组或字典结构表示。
 */

// Vertex 用数组结构表示，Edge 用 map结构表示

function Graph() {
  this.vertices = [] // 顶点集合
  this.edges = new Map() // 边集合
}
Graph.prototype.addVertex = function(v) { // 添加顶点方法
  this.vertices.push(v)
  this.edges.set(v, [])
}
Graph.prototype.addEdge = function(v, w) { // 添加边方法
  let vEdge = this.edges.get(v)
  vEdge.push(w)
  let wEdge = this.edges.get(w)
  wEdge.push(v)
  this.edges.set(v, vEdge)
  this.edges.set(w, wEdge)
}
Graph.prototype.toString = function() {
  var s = ''
  for (var i=0; i<this.vertices.length; i++) {
      s += this.vertices[i] + ' -> '
      var neighors = this.edges.get(this.vertices[i])
      for (var j=0; j<neighors.length; j++) {
          s += neighors[j] + ' '
      }
      s += '\n'
  }
  return s
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
for (var i=0; i<vertices.length; i++) {
    graph.addVertex(vertices[i])
}
graph.addEdge(1, 4); //增加边
graph.addEdge(1, 3);
graph.addEdge(2, 3);
graph.addEdge(2, 5);

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