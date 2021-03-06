/**
 * 买卖股票时机
 * 
给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）

输入: [2,4,1], k = 2
输出: 2
解释: 在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。


1、 可以定义如下
 // dp[i][j][0] 表示第i天交易了j次时卖出后的累计最大利润
 //  dp[i][j][1] 表示第i天交易了j次时买入后的累计最大利润

2、确定状态转移方程
 // dp[i][j][0] 当第i天不持股的话，我们需要确定昨天是否持有股票
 // dp[i][j][0] = max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
 // dp[i][j][1] 同样的第i天,我们需要去确定昨天是否持有股票
 // dp[i][j][1] = max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i])

3、 所有不持股的状态值初始化的时候为 0。所有持股的状态值都设置为一个很大的负数（至少应该是最大的股价的负数 - 1），表示未知。
// dp[0][j][0] = 0;
// dp[0][j][1] = -prices[i];

* ! 当k大于len/2的时候，我们需要做一个处理，或者说，我们需要利用状态压缩
 */

var maxProfit = function(k, prices) {
  let len = prices.length;
  if(len === 0) return 0;
  if(k >= len/2) return maxProfit2(prices);
  let dp = Array.from(new Array(len), () => new Array(k+1));
  for (let i = 0; i < len; i++) {
      for (let j = 0; j <= k; j++) {
          dp[i][j] = new Array(2).fill(0);
      }
  }
  for (let i = 0; i < len; i++) {
      for (let j = k; j > 0; j--) {
          if(i===0) {
              dp[i][j][0] = 0;
              dp[i][j][1] = -prices[i];
              continue;
          }
          dp[i][j][0] = Math.max(dp[i-1][j][0], dp[i-1][j][1] + prices[i]);
          dp[i][j][1] = Math.max(dp[i-1][j][1], dp[i-1][j-1][0] - prices[i]);
      }
  }
  return dp[len-1][k][0];
};

function maxProfit2(prices) {
  let profits = 0;
  for (let i = 0; i < prices.length + 1; i++) {
      if(prices[i + 1] - prices[i] > 0) {
          profits += prices[i + 1] - prices[i]
      }
  }
  return profits;
};
