// 深度优先遍历复制, 借助队列, 循环
function deepCopy(obj) {
    var newObj = {},
        srcQueue = [obj], srcVisitedQueue = [],
        copyQueue = [newObj], copyVisitedQueue = [];

    while (srcQueue.length > 0) {
        var currentSrcElement = srcQueue.shift(),
            currentCopyElement = copyQueue.shift();

        srcVisitedQueue.push(currentSrcElement);
        copyVisitedQueue.push(currentCopyElement);

        for (var key in currentSrcElement) {
            if (typeof currentCopyElement[key] !== 'object') {
                currentCopyElement[key] = currentSrcElement[key];
            } else {
                // 有环的情况
                var index = srcVisitedQueue.indexOf(currentSrcElement[key]);
                if (index >= 0) {
                    currentCopyElement[key] = copyVisitedQueue[index];
                } else {
                    srcQueue.push(currentSrcElement[key]);
                    currentCopyElement[key] = {};
                    copyQueue.push(currentCopyElement[key]);
                }
            }
        }
    }

    return newObj;
}

// Test case
// 1. 只含有简单类型的Object{a: 1, b:2} => pass
// 2. 简单类型和复杂类型同时存在的情况下的Object => pass:
// var obj1 = {
//     a: 1,
//     b: 2,
//     c: {
//         d: 3,
//         e: {
//             f: 4,
//             g: 5
//         }
//     },
//     h: {
//         i: 6,
//         j: 7
//     }
// };
// 3. 有环的情况下的Object => pass:
// var obj1 = {
//     a: 1,
//     b: 2,
//     c: obj1
// };


/**
 * 递归
 */

const deepCopy = (o) => {
  if (o instanceof Array) {
    const n = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;

  } else if (o instanceof Object) {
    const n = {};
    let i;
    for (i in o) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else {
    return o;
  }
};