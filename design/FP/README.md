# 函数式编程

> 面向对象编程(OOP)通过封装变化使得代码更易理解。函数式编程(FP)通过最小化变化使得代码更易理解。

函数式编程的目的是**使用函数来抽象作用在数据之上的控制流和操作，从而在系统中消除副作用并减少对状态的改变。**

## 示例

> 组合函数实现

- 参数是多个函数，返回值是一个“组合函数”。
- 组合函数内的所有的函数从右至左一个一个执行（主要符合数学从右到左的操作概念）。
- 组合函数内除了第一个执行函数的参数是多元的，其它函数的参数都是接收上一个函数的返回值。

```js
// 闭包 + 循环
function compose(funs) {
  var len = funs.length;
  var index = len - 1;
  return function() {
    var result = len ? funs[index].apply(this, arguments) : arguments[0];
    while (--index >= 0) {
      result = funs[index].call(this, result);
    }
    return result;
  };
}

// 闭包 + 递归
function compose(funs) {
  var len = funs.length;
  var index = len - 1; //从右向左执行。
  var result; //保存执行或递归执行的结果。
  return function recursion() {
    result = funs[index].apply(this, arguments);
    if (index <= 0) {
      index = len - 1; //条件不满足时，重置递归索引
      return result; //返回最终的结果
    }
    index--;
    return recursion.call(this, result);
  };
}

// ES6
function compose(...funs) {
  if (funs.length === 0) {
    return arg => arg;
  }
  if (funs.length === 1) {
    return funs[0];
  }

  return funs.reverse().reduce((a, b) => (...arg) => b(a(arg)));
}

```


## 特点

- 声明式编程
- 纯函数
- 引用透明
- 不可变性

### 声明式编程

函数式编程属于声明是编程范式：**这种范式会描述一系列的操作，但并不会暴露它们是如何实现的或是数据流如何传过它们。**

我们所熟知的 SQL 语句就是一种很典型的声明式编程，它由一个个描述查询结果应该是什么样的断言组成，对数据检索的内部机制进行了抽象

```js
// 命令式方式
var array = [0, 1, 2, 3]
for(let i = 0; i < array.length; i++) {
    array[i] = Math.pow(array[i], 2)
}

array; // [0, 1, 4, 9]

// 声明式方式
[0, 1, 2, 3].map(num => Math.pow(num, 2))
```

可以看到命令式很具体的告诉计算机如何执行某个任务。

而声明式是将程序的描述与求值分离开来。它关注如何用各种表达式来描述程序逻辑，而不一定要指明其控制流或状态关系的变化。

为什么我们要去掉代码循环呢？循环是一种重要的命令控制结构，但很难重用，并且很难插入其他操作中。而函数式编程旨在尽可能的提高代码的无状态性和不变性。要做到这一点，就要学会使用无副作用的函数--也称纯函数

### 纯函数

> 纯函数指没有副作用的函数。相同的输入有相同的输出

副作用: 

- 改变一个全局的变量、属性或数据结构
- 改变一个函数参数的原始值
- 处理用户输入
- 抛出一个异常
- 屏幕打印或记录日志
- 查询 HTML 文档，浏览器的 Cookie 或访问数据库

```js
// 命令式代码

function showStudent(id) {
    // 这里假如是同步查询
    var student = db.get(id)
    if(student !== null) {
          // 读取外部的 elementId
          document.querySelector(`${elementId}`).innerHTML = `${student.id},${student.name},${student.lastname}`
    } else {
        throw new Error('not found')
    }
}

showStudent('666')

// 函数式代码

// 通过 find 函数找到学生
var find = curry(function(db, id) {
    var obj = db.get(id)
    if(obj === null) {
        throw new Error('not fount')
    }

    return obj
})

// 将学生对象 format
var csv = (student) => `${student.id},${student.name},${student.lastname}`

// 在屏幕上显示
var append = curry(function(elementId, info) {
    document.querySelector(elementId).innerHTML = info
})

var showStudent = compose(append('#student-info'), csv, find(db))

showStudent('666')
```

### 引用透明

> 纯度在这个意义上表面一个函数的参数和返回值之间映射的纯的关系。**如果一个函数对于相同的输入始终产生相同的结果**，那么我们就说它是引用透明。

```js
// 非引用透明
var counter = 0

function increment() {
    return ++counter
}

// 引用透明
var increment = (counter) => counter + 1
```

### 不可变数据

> 不可变数据是指那些创建后不能更改的数据。与许多其他语言一样，JavaScript 里有一些基本类型(String,Number 等)从本质上是不可变的，但是对象就是在任意的地方可变。

```js
var sortDesc = function(arr) {
    return arr.sort(function(a, b) {
        return b - a
    })
}

var arr = [1, 3, 2]
sortDesc(arr) // [1, 2, 3]
arr // [1, 2, 3]
```

这段代码看似没什么问题，但是会导致在排序的过程中会产生副作用，修改了原始引用，可以看到原始的 arr 变成了 [1, 2, 3]。这是一个语言缺陷.
