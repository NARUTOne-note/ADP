/**
 * 题目：closest number
 * 
	一个K位的数N  (K≤2000，N≤10^20):
	找出一个比N大且最接近的数，这个数的每位之和与N相同，用代码实现之。

	例如：0050 所求书数字为0104；112 所求数为121；
 */

/**
 * 思考：
 * step1: 从右边开始的最小位数开始，分解最后一位数字，分解出1来拿给前面的一位; 
 * 				9 和 0 特殊,因此 可以进行翻转利用数组进行分解调换：遇到0 跳过，遇到非0 的 换到数字的最后也就是翻转数组的最前面
 * step2: 开始找第一个非9的数字，如果遇到9，就把9放到最后面去，遇到非9，就+1，结束运算。
 */

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getNumber(k) {
	var numberArr = [];
	var n = 0;

	for(i = 0; i <= k; i++) {
		n = getRandomIntInclusive(0, 9)
		numberArr.push(n)
	}

	return numberArr
}

// 模拟 arr  reverse
function reverse(arr) {
	var i, temp;

	var len = arr.length

	for (i = 0; i < len/2; i++) {
      // _swap
      temp = arr[i];
      arr[i] = arr[len - 1 - i];
      arr[len-1-i] = temp;
  }

  return arr
}

function getClosest(numberArr) {
	var arr = reverse(numberArr)
	var length_of_number = arr.length

	var step1 = 1,
      step2 = 0,
      i = 0,
      zero = 0,
      cnt = 0;

  for (i = 0; i < length_of_number; i++)
  {
      if (step1)
      {
          if (arr[i] == '0')
          {
              zero++;
          }
          else
          {
              arr[i] = arr[i] - 1;
              if (zero > 0)
              {
                  arr[cnt] = arr[i];
                  arr[i] = '0';
              }
              step1 = 0, step2 = 1;
          }
      }
      else if (step2)
      {
          if (arr[i] == '9')
          {
              if (zero == 0)
              {
                  arr[cnt + 1] = arr[cnt];
                  arr[cnt] = '9';
                  cnt++;
                  if (i != cnt)
                  {
                      arr[i] = arr[i-1];
                  }
              }
              else
              {
                  arr[cnt + 1] = arr[cnt];
                  arr[cnt] = '9';
                  cnt++;
                  arr[i] = '0';
              }
          }
          else
          {
              arr[i] ++;
              step2 = 0;
              break;
          }
      }
  }

  if (step2)
  {
      arr[length_of_number] = '1';
      length_of_number ++;
  }

	return arr.reverse().join('')
}


var numArr = getNumber(5);
console.log(numArr);
console.log(getClosest(numArr));

var test = [0, 0, 3, 4, 9 ,0]
console.log(getClosest(test)) // 003508