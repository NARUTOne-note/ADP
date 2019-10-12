/**
 * 洗牌乱序算法 Fisher–Yates shuffle
 * 
 *  使用array.sort()进行乱序存在一定问题，增大样本进行实验之后可以发现这种乱序方案并不是完全随机的（所有元素会大概率停留在自己的初始位置）
 * （v8处理排序是小于10个是插入排序，大于10个是快排，排序算法复杂度介于O(n)与O(n2)之间，也就是存在两个元素都没有比较的机会，因此不是完全随机）
 */

function shuffle () { 
  var input = this; 
  for (var i = input.length-1; i >=0; i--) { 
    var randomIndex = Math.floor(Math.random()*(i+1)); 
    var itemAtIndex = input[randomIndex]; 
    input[randomIndex] = input[i]; 
    input[i] = itemAtIndex; 
  }
  return input; 
} 

var tempArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
tempArray.shuffle(); 
console.log(tempArray);
