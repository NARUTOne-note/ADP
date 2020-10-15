/*
 
 * javascript算法之排序
 * Date 2017/07/17
 * author NARUTOne
 * 
 * */


/*
 冒泡排序
 * @name {bubbleSort} [function] 
 * @param {arr}  无序数字元素数组
 * @return {arr} 从小到大的有序数组
 * @description 
 * 冒泡排序是一种简单的排序算法。
 * 它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。
 * 走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。
 * 这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
 * 
 * @design
 *  <1>.比较相邻的元素。如果第一个比第二个大，就交换它们两个；
		<2>.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
		<3>.针对所有的元素重复以上的步骤，除了最后一个；
		<4>.重复步骤1~3，直到排序完成。
 * */

function bubbleSort (arr) {
	console.time('改进前冒泡排序耗时');
	var len = arr.length;
	var i, j;
	for(i = 0; i < len; i++) {
		// 尾部慢慢有序
		for(j = 0; j < len - 1 - i; j++) {
			if(arr[j] > arr[j+1]) {
				arr[j] += arr[j+1];
				arr[j+1] = arr[j] - arr[j+1];
				arr[j] = arr[j] - arr[j+1];
			}
		}
	}
	console.timeEnd('改进前冒泡排序耗时');
	return arr;
}

//改进一：设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。
//由于pos位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到pos位置即可。

function bubbleSort2 (arr) {
	console.time('改进1冒泡排序耗时');
	var len = arr.length;
	var i, j, pos;
	
	i = len - 1;
	// 若一次交换也没发生，则说明数组有序，直接返回
	while(i > 0) {
		pos = 0; // 每次无记录交换
		for(j = 0; j < i; j++) {
		  if (arr[j]> arr[j+1]) {
        pos= j; //记录交换的位置
        var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
      }
		}
		i = pos;
	}
	
	console.timeEnd('改进1冒泡排序耗时');
  return arr;
}

//改进二：
//传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值。
//我们考虑利用在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者) , 从而使排序趟数几乎减少了一半。

function bubbleSort3 (arr) {
	var low = 0;
	var height = arr.length - 1;
	var j, temp;
	console.time('改进2冒泡排序耗时');
	while(low < height) {
		for(j = 0; j < height; j ++) { //正向冒泡，取最大值
			if (arr[j]> arr[j+1]) {
        tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
      }
		}
		--height;
		for(j = height; j > 0; j--) {
			if(arr[j] < arr[j-1]) {
				tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
			}
		}
		++low;
	}
	
	console.timeEnd('改进2冒泡排序耗时');
  return arr;
}

//冒泡排序测试
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log(bubbleSort2(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log(bubbleSort3(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]


/*
 选择排序
 * @name {selectionSort}[function]
 * @param {arr}  无序数字元素数组
 * @return {arr} 从小到大的有序数组
 * @description 
 * 选择排序(Selection-sort)是一种简单直观的排序算法。
 * 它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，
 * 然后，再从剩余未排序元素中继续寻找最小（大）元素，
 * 然后放到已排序序列的末尾。
 * 以此类推，直到所有元素均排序完毕。
 * @design
 * <1>.初始状态：无序区为R[1..n]，有序区为空；
 * <2>.第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。
 * 	该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，
 * 使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
 * <3>n-1趟结束，数组有序化了。
 * 
 * */

function selectionSort (arr) {
	var len = arr.length;
	var minIndex, temp, i, j;
	console.time('选择排序耗时');
	for(i = 0; i < len; i ++) {
		minIndex = i;
		for(j = i + 1; j < len; j ++) {
			if(arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		
		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	}
	console.timeEnd('选择排序耗时');
  return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(selectionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]


/*
 插入排序
 * @name {insertionSort}[function]
 * @param {arr}  无序数字元素数组
 * @return {arr} 从小到大的有序数组
 * @description 
 * 插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。
 * 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
 * 插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），
 * 因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。
 * @design [in-place]
 * <1>.从第一个元素开始，该元素可以认为已经被排序；
 * <2>.取出下一个元素，在已经排序的元素序列中从后向前扫描；
 * <3>.如果该元素（已排序）大于新元素，将该元素移到下一位置；
 * <4>.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
 * <5>.将新元素插入到该位置后；
 * <6>.重复步骤2~5。
 * 
 * */

function insertionSort (arr) {
	if(Object.prototype.toString.call(arr).slice(8, -1) == 'Array') {
		var i, j, key;
		var len = arr.length;
		console.time('插入排序耗时：');
		for(i = 1; i < len; i ++) {
			key = arr[i];
			j = i - 1;
			while(j >= 0 && arr[j] > key) { 
				arr[j+1] = arr[j]; //后移
				j --;
			}
			
			arr[j+1] = key
		}
		console.timeEnd('插入排序耗时：');
    return arr;
	}
	else {
		return 'array is not an Array!';
	}
}

//改进：查找插入位置时使用二分查找的方式

function binaryInsertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('二分插入排序耗时：');
        for (var i = 1; i < array.length; i++) {
            var key = array[i], left = 0, right = i - 1;
            while (left <= right) {
                var middle = parseInt((left + right) / 2);
                if (key < array[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }
            for (var j = i - 1; j >= left; j--) {
              array[j + 1] = array[j]; //后移
            }
            array[left] = key;
        }
        console.timeEnd('二分插入排序耗时：');
        return array;
    } else {
        return 'array is not an Array!';
    }
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(binaryInsertionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log(insertionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]


/*
 希尔排序 （Shell Sort）
 * @name {shellSort}[function]
 * @param {arr}  无序数字元素数组
 * @return {arr} 从小到大的有序数组
 * @description 
 * 希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。
 * 动态定义间隔序列的算法是《算法（第4版》的合著者Robert Sedgewick提出的。
 * @design 
 * 先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序
 * <1>. 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
 * <2>.按增量序列个数k，对序列进行k 趟排序；
 * <3>.每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。
 * 仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
 * 
 * */

function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    console.time('希尔排序耗时:');
    while(gap < len/5) {          //动态定义间隔序列
      gap = gap*5+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/5)) {
        for (var i = gap; i < len; i++) { //插入排序
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(shellSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]


/*
 归并排序 （Merge Sort）
 * @name {mergeSort}[function]
 * @param {arr}  无序数字元素数组
 * @return {arr} 从小到大的有序数组
 * @description 
 * 归并排序是建立在归并操作上的一种有效的排序算法。
 * 该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
 * 归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；
 * 即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。
 * @design 
 * <1>.把长度为n的输入序列分成两个长度为n/2的子序列；
 * <2>.对这两个子序列分别采用归并排序；
 * <3>.将两个排序好的子序列合并成一个最终的排序序列。
 * 
 * */

function mergeSort(arr) {  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right)
{
    var result = [];
    console.time('归并排序耗时');
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());
    console.timeEnd('归并排序耗时');
    return result;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(mergeSort(arr));


/*
 快速排序（Quick Sort）
 * @name {quickSort}[function]
 * @param {arr}  无序数字元素数组
 * @return {arr} 从小到大的有序数组
 * @description 
 * 快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，
 * 则可分别对这两部分记录继续进行排序，以达到整个序列有序。
 * @design 
 * 快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）
 * <1>.从数列中挑出一个元素，称为 “基准”（pivot）；
 * <2>.重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
 * 在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
 * <3>.递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
 * 
 * */

function quickSort (arr, left, right) {
	if(Object.prototype.toString.call(arr).slice(8, -1) == 'Array' && typeof left == 'number' && typeof right == 'number') {
		console.time('快速排序1耗时：')
		if(left < right) {
			var x = arr[right],
					i = left -1,
					temp;
			for (var j = left; j <= right; j++) {
				if(arr[j] <= x) {
					i ++;
					temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
			quickSort(arr, left, i - 1);
			
			quickSort(arr, i + 1, right);
		}
		console.timeEnd('快速排序1耗时：');
		return arr;
	}
	else {
		return 'arr is not an Array or left or right is not a number'
	}
}

// 快速排序2

var quickSort2 = function (arr) {
	console.time('快速排序2耗时：');
	if(arr.length <= 1) return arr;
	
	var pivotIndex = Math.floor(arr.length / 2);
	var pivot = arr.splice(pivotIndex, 1)[0];
	var left = [];
	var right = [];
	for(var i = 0; i < arr.length; i ++) {
		if(arr[i] < pivot) {
			left.push(arr[i]);
		}
		else {
			right.push(arr[i])
		}
	}
	console.timeEnd('快速排序2耗时：');
	return quickSort2(left).concat([pivot], quickSort2(right));
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(quickSort(arr, 0, arr.length - 1));

console.log(quickSort2(arr));

// 快速排序3，避免修改原数组
var quickSort3 = function (arr) {
  if (arr.length <= 1) { return arr }
  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr[pivotIndex]
  var left = []
  var right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } 

    if (arr[i] > pivot) {
      right.push(arr[i])
    }
  }
  return quickSort3(left).concat([pivot], quickSort3(right))
}

/*
 堆排序（Heap Sort）
 * @name {quickSort}[function]
 * @param {arr}  无序数字元素数组
 * @return {arr} 从小到大的有序数组
 * @description 
 * 堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。
 * 堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
 * @design 
 * <1>.将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
 * <2>.将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
 * <3>.由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，
 * 然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。
 * 不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
 * 
 * */

function heapSort (arr) {
	console.time('堆排序耗时：');
	if(Object.prototype.toString.call(arr).slice(8, -1) == 'Array') {
		//建堆
		var heapSize = arr.length, temp;
		for(var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
			heapify(arr, i, heapSize);
		}
		
		//堆排序
		for(var j = heapSize - 1; j >= 1; j ++) {
			temp = arr[0];
			arr[0] = arr[j];
			arr[j] = temp;
			heapify(arr, 0, --heapSize);
		}
		
		console.timeEnd('堆排序耗时：');
		return arr;
	}
	else {
		return 'arr is not an Array';
	}
}

/*
 建堆，维护堆的性质
 * @param arr 数组
 * @param x 数组下标
 * @param len 堆大小
 * 
 * */

function heapify (arr, x, len) {
	if(Object.prototype.toString.call(arr).slice(8, -1) == 'Array' && typeof left == 'number') {
		var l = 2 * x + 1,
				r = 2 * x + 2,
				largest = x,
				temp;
		
		if(l < len && arr[l] > arr[largest]) {
			largest = l;
		}
		if(r < len && arr[r] > arr[largest]) {
			largest = r;
		}
		if( largest != x) {
			temp = arr[x];
			arr[x] = arr[largest];
			arr[largest] = temp;
			heapify(arr, largest, len);
		}
	}
	else {
		return 'arr is not an Array or x is not a number';
	}
}



/*
 计数排序（Counting Sort）
 * @name {countingSort}[function]
 * @param {arr}  无序数字元素数组
 * @return {arr} 从小到大的有序数组
 * @description 
 * 计数排序(Counting sort)是一种稳定的排序算法。
 * 计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。
 * 然后根据数组C来将A中的元素排到正确的位置。它只能对整数进行排序。
 * @design 
 * <1>. 找出待排序的数组中最大和最小的元素；
 * <2>. 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
 * <3>. 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
 * <4>. 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。
 * 
 * */

function countingSort (arr) {
	var len = arr.length,
			B = [],
			C = [],
			min = max = arr[0];
	console.time('计数排序耗时：');
	
	for(var i = 0; i < len; i ++) {
		min = min <= arr[i] ? min : arr[i];
		max = max >= arr[i] ? max : arr[i];
		C[arr[i]] = C[arr[i]] ? C[arr[i]] + 1 : 1;
	}
	
	for(var j = min; j < max; j ++) {
		C[j+1] = (C[j + 1] || 0 ) + (C[j] || 0) ;
	}
	
	for (var k = len -1 ; k >= 0; k --) {
			B[C[arr[k]] - 1] = arr[k];
			C[arr[k]] -- ;
	}
	
	console.timeEnd('计数排序耗时：');
	return B;
}
 
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(countingSort(arr));



/*
 桶排序（Bucket Sort）
 * @name {countingSort}[function]
 * @param {arr}  无序数字元素数组
 * @param {num}  桶的数量
 * @return {arr} 从小到大的有序数组
 * @description 
 * 桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，
 * 每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序。
 * @design 
 * <1>.设置一个定量的数组当作空桶；
 * <2>.遍历输入数据，并且把数据一个一个放到对应的桶里去；
 * <3>.对每个不是空的桶进行排序；
 * <4>.从不是空的桶里把排好序的数据拼接起来。
 * 
 * */

function bucketSort(arr, num) {
	if (arr.length <= 1) return arr;
	
	var len = arr.length,
			buckets = [],
			result = [],
			min = max = arr[0],
			regex = /^[1-9]+[0-9]*$/,
			space,
			n = 0;
			
	num = num || ((num > 1 && regex.test(num))? num : 10);
	
	console.time('桶排序耗时：');
	for(var i = 1; i < len ; i ++) {
		min = min <= arr[i] ? min : arr[i];
		max = max >= arr[i] ? max : arr[i];
	}
	
	space = (max -min + 1) /num;
	
	for (var j = 0; j < len; j++) {
		var index = Math.floor((arr[j] - min) / space);
		if(buckets[index]) {
			var k = buckets[index].length -1;
			while(k >= 0 && buckets[index][k] > arr[j]) {
				buckets[index][k + 1] = buckets[index][k];
				k--;
			}
			
			buckets[index][k + 1] = arr[j];
		}
		else {
			buckets[index] = [];
			buckets[index].push(arr[j]);
		}
	}
	
	while (n < num) {
		result = result.concat(buckets[n]);
		n ++;
	}
	
	console.timeEnd('桶排序耗时：');
	return result;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bucketSort(arr, 4));


/*
 基数排序（Radix Sort）
 * @name {countingSort}[function]
 * @param {arr}  无序数字元素数组
 * @param {maxDigit}  最大位数
 * @return {arr} 从小到大的有序数组
 * @description 
 * 基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。
 * 有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。
 * 最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。
 * 基数排序基于分别排序，分别收集，所以是稳定的。
 * @design 
 * <1>.取得数组中的最大数，并取得位数；
 * <2>.arr为原始数组，从最低位开始取每个位组成radix数组；
 * <3>.对radix进行计数排序（利用计数排序适用于小范围数的特点）；
 * 
 * */


function radixSort (arr, maxDigit) {
	var mod = 10;
	var dev = 1;
	var counter = [];
	console.time('基数排序耗时：');
	
	for( var i = 0; i < maxDigit; i ++, dev *= 10, mod *= 10) {
		for (var j = 0; j < arr.length; j++) {
			var bucket = parseInt((arr[j] % mod) / dev);
			if(counter[bucket] == null) {
				counter[bucket] = [];
			}
			counter[bucket].push(arr[j]);
		}
		var pos = 0;
		for(var j = 0; j < counter.length; j ++) {
			var value = null ;
			if(counter[j] != null) {
				while ((value = counter[j].shift()) != null) {
					arr[pos++] = value;
				}
			}
		}
	}
	
	console.timeEnd('基数排序耗时：');
	return arr;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(radixSort(arr, 2));

