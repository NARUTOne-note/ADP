/**
 * 堆排序
将原序列（n个）转化成一个大顶堆
设置堆的有效序列长度为 n
将堆顶元素（第一个有效序列）与最后一个子元素（最后一个有效序列）交换，并有效序列长度减1
堆化有效序列，使有效序列重新称为一个大顶堆
重复以上2步，直到有效序列的长度为 1，排序完成
 */

// 原地建堆
// items: 原始序列
// heapSize: 初始有效序列长度
function buildHeap(items, heapSize) {
  // 从最后一个非叶子节点开始，自上而下式堆化
  for (let i = Math.floor(heapSize/2); i >= 1; --i) {    
      heapify(items, heapSize, i);  
  }
}
function heapify(items, heapSize, i) {
  // 自上而下式堆化
  while (true) {
      var minIndex = i;
      if(2*i <= heapSize && items[i] > items[i*2] ) {
          minIndex = i*2;
      }
      if(2*i+1 <= heapSize && items[minIndex] > items[i*2+1] ) {
          minIndex = i*2+1;
      }
      if (minIndex === i) break;
      swap(items, i, minIndex); // 交换 
      i = minIndex; 
  }
}  
function swap(items, i, j) {
  let temp = items[i]
  items[i] = items[j]
  items[j] = temp
}

// 测试
var items = [,5, 2, 3, 4, 1]
// 因为 items[0] 不存储数据
// 所以：heapSize = items.length - 1
buildHeap(items, items.length - 1)
console.log(items)
// [empty, 1, 2, 3, 4, 5]
