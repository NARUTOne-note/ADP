# P43

> 是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域

## 查找数据域为某一特定值的结点

假设这个目标结点的数据域值为 n，借助二叉搜索树数据域的有序性进行遍历判断寻找

```js
/**
 * @param {TreeNode} root
 * @param {number} n
 */
function search(root, n) {
    // 若 root 为空，查找失败，直接返回
    if(!root) {
        return
    }
    // 找到目标结点，输出结点对象
    if(root.val === n) {
        console.log('目标结点是：', root)
    } else if(root.val > n) {
        // 当前结点数据域大于n，向左查找
        search(root.left, n)
    } else {
        // 当前结点数据域小于n，向右查找
        search(root.right, n)
    }
}
```

## 插入新节点

> 根据二叉搜索树，寻找空位子填充

```js
function insertIntoBST(root, n) {
    // 若 root 为空，说明当前是一个可以插入的空位
    if(!root) {
        // 用一个值为n的结点占据这个空位
        root = new TreeNode(n)
        return root
    }

    if(root.val > n) {
        // 当前结点数据域大于n，向左查找
        root.left = insertIntoBST(root.left, n)
    } else {
        // 当前结点数据域小于n，向右查找
        root.right = insertIntoBST(root.right, n)
    }

    // 返回插入后二叉搜索树的根结点
    return root
}
```

## 删除指定节点

- 结点不存在，定位到了空结点。直接返回即可。
- 需要删除的目标结点没有左孩子也没有右孩子——它是一个叶子结点，删掉它不会对其它结点造成任何影响，直接删除即可。
- 需要删除的目标结点存在左子树，那么就去左子树里寻找小于目标结点值的最大结点，用这个结点覆盖掉目标结点
- 需要删除的目标结点存在右子树，那么就去右子树里寻找大于目标结点值的最小结点，用这个结点覆盖掉目标结点
- 需要删除的目标结点既有左子树、又有右子树，这时就有两种做法了：要么取左子树中值最大的结点，要么取右子树中取值最小的结点。两个结点中任取一个覆盖掉目标结点，都可以维持二叉搜索树的数据有序性

```js
function deleteNode(root, n) {
    // 如果没找到目标结点，则直接返回
    if(!root) {
        return root
    }
    // 定位到目标结点，开始分情况处理删除动作
    if(root.val === n) {
        // 若是叶子结点，则不需要想太多，直接删除
        if(!root.left && !root.right) {
            root = null
        } else if(root.left) {
            // 寻找左子树里值最大的结点
            const maxLeft = findMax(root.left)
            // 用这个 maxLeft 覆盖掉需要删除的当前结点  
            root.val = maxLeft.val
            // 覆盖动作会消耗掉原有的 maxLeft 结点
            root.left = deleteNode(root.left, maxLeft.val)
        } else {
            // 寻找右子树里值最小的结点
            const minRight = findMin(root.right)
            // 用这个 minRight 覆盖掉需要删除的当前结点  
            root.val = minRight.val
            // 覆盖动作会消耗掉原有的 minRight 结点
            root.right = deleteNode(root.right, minRight.val)
        }
    } else if(root.val > n) {
        // 若当前结点的值比 n 大，则在左子树中继续寻找目标结点
        root.left = deleteNode(root.left, n)
    } else  {
        // 若当前结点的值比 n 小，则在右子树中继续寻找目标结点
        root.right = deleteNode(root.right, n)
    }
    return root
}

// 寻找左子树最大值
function findMax(root) {
    while(root.right) {
        root = root.right
    }
    return root
}

// 寻找右子树的最小值
function findMin(root) {
    while(root.left) {
        root = root.left
    }
    return root
}
```
