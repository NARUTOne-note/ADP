/**
 * 打家劫
 * 这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

输入: [1,2,3,1]
输出: 4
解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。

1、状态定义
这里就利用二维状态,既然可以选择偷或者是不偷
dp[i][0] 表示不偷当前第i个房间,获取最高金币数
dp[i][1] 表示的是偷第i房间,获取最高金币数

2、确定状态转移方程
第i个房间偷的话,dp[i][1] = nums[i] + dp[i-1][0]
第i个房间不偷的话, dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1])

3、初始化状态，dp数组
dp[0][0] = 0 // 不偷为 0 
dp[0][1] = nums[0]

 */

function houseRobber(houses = []) {
  const hs = houses.length;

  if (!hs) return 0;
  if (hs === 1) return houses[0];

  function dpHandle(dhs = []) {
    const ds = dhs.length;

    if (!ds) return 0;
    if (ds === 1) return dhs[0];

    const dp = Array.from(new Array(ds), () => new Array(ds).fill(0));

    dp[0][0] = 0;
    dp[0][1] = houses[0];

    for (var i = 1; i < ds; i ++) {
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
      dp[i][1] = dp[i - 1][0] + nums[i];
    }

    return Math.max(dp[ds - 1][0], dp[ds - 1][1]);
  }

  // 两种方案
  const ans1 = dpHandle(houses.slice(1));
  const ans2 = dpHandle(houses.slice(0, hs - 1));

  return Math.max(ans1, ans2);
}
