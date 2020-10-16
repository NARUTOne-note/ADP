/**
 * 背包问题
 * 背包问题（Knapsack problem）是一种组合优化的NP完全（NP-Complete，NPC）问题。问题可以描述为：给定一组物品，每种物品都有自己的重量和价格，在限定的总重量内，我们如何选择，才能使得物品的总价格最高。
 */


/**
 * 1、01背包
 * 一共有N件物品，第i（i从1开始）件物品的重量为w[i]，价值为v[i]。在总重量不超过背包承载上限W的情况下，能够装入背包的最大价值是多少
 * dp[i][j]表示将前i件物品装进限重为j的背包可以获得的最大价值, 0<=i<=N, 0<=j<=W
 * 
那么当 i > 0 时dp[i][j]有两种情况：

不装入第i件物品，即dp[i−1][j]；当前价值不变  
装入第i件物品（前提是能装下），即dp[i−1][j−w[i]] + v[i]。
即状态转移方程为

dp[i][j] = max(dp[i−1][j], dp[i−1][j−w[i]]+v[i]) // j >= w[i]
 */

/**
 * dp[i][j]表示将前i件物品装进限重为j的背包可以获得的最大价值, 0<=i<=N, 0<=j<=W
 * @param {*} [ws=[]] 物品重量
 * @param {*} [vs=[]] 价值
 * @param {*} W 总重量
 */
function knapsack(ws = [], vs = [], W) {
  const wlen = ws.length - 1;
  const f = []; // 二维数组可以进行空间优化存储
  f[0] = [];
  for (let j = 0; j <= W; j ++) {
    if (j < ws[0]) { // 如果容量不能放下物品0的重量，则价值为0
      f[0][j] = 0;
    } else { // 否则为物品0的价值
      f[0][j] = vs[0];
    }
  }

  for (let j = 0; j <= W; j++) {
    for(var i = 1; i <= wlen; i++) {
      if (!f[i]) {
        f[i] = [];
      }

      if (j < ws[i]) {
        f[i][j] = f[i - 1][j];
      } else {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - ws[i]] + vs[i]);
      }
    }
  }

  // 倒推得出选择的物品及质量、价值
  let j = W;
  const selected = [];
  const wa = 0; // 总重量
  for(let i = wlen; i >= 0; i --) {
    if (f[i][j] > f[i - 1][j]) { // 取出
      selected.push(i);
      console.log(`物品${i} 重量${ws[i]} 价格${vs[i]}`);
      j = j - ws[i];
      wa += ws[i];
    }
  }

  console.log(`最大承重${W}, 现在总重量${wa}, 总价格${f[wlen][W]}`)

  return f[wlen][W];
}

let a = knapsack([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10);
console.log(a);

// ! 优解
// 所谓“滚动数组”，顾名思义，就是让数组“滚动”起来：固定一块存储空间，滚动更新这块存储空间的内容，确保每个时刻空间内的数据都是当前真正会用到的最新数据，从而达到节约内存的效果，这种手段就叫做滚动数组。
// 入参是物品的个数和背包的容量上限，以及物品的重量和价值数组
function knapsack2(n, c, w, value) {
  // dp是动态规划的状态保存数组
  const dp = (new Array(c+1)).fill(0)  

  for (let j = 0; j <= c; j ++) {
    if (j < w[0]) { // 如果容量不能放下物品0的重量，则价值为0
      dp[j] = 0;
    } else { // 否则为物品0的价值
      dp[j] = value[0];
    }
  }

  // res 用来记录所有组合方案中的最大值
  let res = -Infinity
  for(let i=1;i<=n;i++) {
      for(let v=c;v>=w[i];v--) {
          // 写出状态转移方程
          dp[v] = Math.max(dp[v], dp[v-w[i]] + value[i])
          // 即时更新最大值
          if(dp[v] > res) {
              res = dp[v]
          }
      }
  }
  return res
}