/*
* @name: tree结构生成 示例
*	@author: NARUTOne
*	@time: 2017/08/17
*/

/*
* 无层级的扁平对象， 转为树形结构{value, children}
* @param {array} tableData  扁平化数据 
* @param {array} keys 顺序key 
* @return {array}  树形结构对象 
*/

var posData = [{
	province: '四川',
	city: '成都',
	name: '锦里'
},{
	province: '四川',
	city: '成都',
	name: '方所'
},{
	province: '浙江',
	city: '杭州',
	name: '西湖'
}]

var transTree = function(tableData, keys) {
	//hashTable, key下的tree
	let hashTable = {}, res = []
  for( let i = 0; i < tableData.length; i++ ) {
    if(!hashTable[tableData[i][keys[0]]]) {
      let len = res.push({
        value: tableData[i][keys[0]],
        children: []
      }) //获取res.length
      // 在这里要保存key对应的数组序号,不然还要涉及到查找
      hashTable[tableData[i][keys[0]]] = { $$pos: len - 1 }
    }
    if(!hashTable[tableData[i][keys[0]]][tableData[i][keys[1]]]) { //设置 children
      let len = res[hashTable[tableData[i][keys[0]]].$$pos].children.push({
        value: tableData[i][keys[1]],
        children: []
      })
      hashTable[tableData[i][keys[0]]][tableData[i][keys[1]]] = { $$pos: len - 1 }
    }

    //设置第三级
    res[hashTable[tableData[i][keys[0]]].$$pos].children[hashTable[tableData[i][keys[0]]][tableData[i][keys[1]]].$$pos].children.push({
      value: tableData[i][keys[2]]
    })
  }
  return res
}

var keys = ['province', 'city', 'name']

console.log(transTree(posData, keys))

//升级版 ，无keys 长度限制  trie树

var transTree_trie = function(tableData, keys) {
  let hashTable = {}, res = []
  for (let i = 0; i < tableData.length; i++) {
    let arr = res, cur = hashTable
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j], filed = tableData[i][key]
      if (!cur[filed]) {
        let pusher = {
          value: filed
        }, tmp
        if (j !== (keys.length - 1)) {
          tmp = []
          pusher.children = tmp
        }
        cur[filed] = { $$pos: arr.push(pusher) - 1 }
        cur = cur[filed]
        arr = tmp  //tem 即为 pusher.children
      } else {
        cur = cur[filed]
        arr = arr[cur.$$pos].children
      }
    }
  }
  return res
}

var keys = ['province', 'city', 'name']

console.log(transTree_trie(posData, keys))


//另一数据结构 ，指针

var plainData = {
  h3: {
    parent: 'h2',
    name: '副总经理(市场)'
  },
  h1: {
    parent: 'h0',
    name: '公司机构'
  },
  h7: {
    parent: 'h6',
    name: '副总经理(总务)'
  },
  h4: {
    parent: 'h3',
    name: '销售经理'
  },
  h2: {
    parent: 'h1',
    name: '总经理'
  },
  h8: {
    parent: 'h0',
    name: '财务总监'
  },
  h6: {
    parent: 'h4',
    name: '仓管总监'
  },
  h5: {
    parent: 'h4',
    name: '销售代表'
  },
  h0: {
    parent: '',
    name: 'root'
  }
};


var plain2Tree = function (obj) {
  var key, res
  for(key in obj) {
    var parent = obj[key].parent
    if(parent === '') {
      res = obj[key]
    } else {
      obj[parent][key] = obj[key]
    }
  }
  return res
}

console.log(plain2Tree(plainData))

/**
 * 
 * 遍历多叉树（递归、非递归广度优先、深度优先）
 * 深度优先遍历：从根节点出发，沿着左子树方向进行纵向遍历，直到找到叶子节点为止。然后回溯到前一个节点，进行右子树节点的遍历，直到遍历完所有可达节点为止。
 * 广度优先遍历：从根节点出发，在横向遍历二叉树层段节点的基础上纵向遍历二叉树的层次。
 */

;(function (window, undefined) {
    var treeNodes = [
       {
            id: 1,
            name: '1',
            children: [
                 {
                      id: 11,
                      name: '11',
                      children: [
                           {
                                id: 111,
                                name: '111',
                                children:[]
                           },
                           {
                                id: 112,
                                name: '112'
                           }
                      ]
                 },
                 {
                      id: 12,
                      name: '12',
                      children: []
                 }
            ],
            users: []
       },
       {
            id: 2,
            name: '2',
            children: [
                {
                    id: 22,
                    name: '22',
                    children: []
                }
            ]
       }
    ];

    //递归实现
    var parseTreeJson = function(treeNodes){
       if (!treeNodes || !treeNodes.length) return;

       for (var i = 0, len = treeNodes.length; i < len; i++) {
            var childs = treeNodes[i].children;
            console.log(treeNodes[i].id);
            if(childs && childs.length > 0){
                 parseTreeJson(childs);
            }
       }
    };

    console.log('------------- 递归实现 ------------------');
    parseTreeJson(treeNodes);

    //非递归广度优先实现
    var iterator1 = function (treeNodes) {
        if (!treeNodes || !treeNodes.length) return;

        var stack = [];

        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }

        var item;

        while (stack.length) {
            item = stack.shift();

            console.log(item.id);

            //如果该节点有子节点，继续添加进入栈底
            if (item.children && item.children.length) {
                //len = item.children.length;

                // for (i = 0; i < len; i++) {
                //  stack.push(item.children[i]);
                // }

                stack = stack.concat(item.children);
            }
        }
    };

    console.log('------------- 非递归广度优先实现 ------------------');
    iterator1(treeNodes);

    //非递归深度优先实现
    var iterator2 = function (treeNodes) {
        if (!treeNodes || !treeNodes.length) return;

        var stack = [];

        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }

        var item;

        while (stack.length) {
            item = stack.shift();

            console.log(item.id);

            //如果该节点有子节点，继续添加进入栈顶
            if (item.children && item.children.length) {
                // len = item.children.length;

                // for (; len; len--) {
                //  stack.unshift(item.children[len - 1]);
                // }
                stack = item.children.concat(stack);
            }
        }
    };

    console.log('------------- 非递归深度优先实现 ------------------');
    iterator2(treeNodes);
})(window);