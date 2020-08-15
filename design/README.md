# 编程设计

> 记录、学习设计模式、编程模式

## 设计原则

- 可扩展性--我是否需要不断地重构代码来支持额外的功能？
- 易模块化--如果我更改了一个文件，另一个文件是否会受到影响？
- 可重用性--是否有很多重复的代码？
- 可测性--给这些函数添加单元测试是否让我纠结？
- 易推理性--我写的代码是否非结构化严重并难以推理？

## 灵活的JS

> 各模式间可以相互组合使用

案例需求：表单验证：用户名、邮箱、密码等

1、**函数校验**

```js
function checkName () {}
function checkEmail () {}
function checkPwd () {}
```

全局变量污染，极易被覆盖。

2、**对象收编**

```js
var checkObj = {
  checkName: function () {},
  checkEmail: function () {},
  checkPwd: function () {}
}
```

3、对象复用

> 不彼此影响

```js
// 返回对象
var checkObj = function () {
  return {
    checkName: function () {},
    checkEmail: function () {},
    checkPwd: function () {}
  }
}

var a = checkObj();
```

4、类创建

> 类创建方式，新对象实例化与原对象无关联

```js
// 返回对象
var checkObj = function () {
  this.checkName = function () {}
  this.checkEmail = function () {}
  this.checkPwd = function () {}
}

var a = new checkObj();
```

每个实例化对象都有一套自己的方法，消耗大

5、原型继承

> 共用一套原型方法

```js
// 原型
var checkObj = function () {
}

checkObj.prototype = {
  checkName: function () {return this;},
  checkEmail: function () {return this;},
  checkPwd: function () {return this;}
}

// 防止被新对象覆盖
checkObj.prototype.checkName = function () {return this;}

var a = new checkObj();
a.checkName().checkEmail().checkPwd();
```

6、链式调用

> `return this`

```js
// 原型
var checkObj = function () {
}

checkObj.prototype = {
  checkName: function () {},
  checkEmail: function () {},
  checkPwd: function () {}
}

// 防止被新对象覆盖
checkObj.prototype.checkName = function () {}

var a = new checkObj();
a.checkName();
a.checkEmail();
a.checkPwd();
```

7、祖先抽象添加

> 对 `Object`, `Function` 等进行最小限度的污染添加

```js
Function.prototype.addCheck = function (name, fn) {
  this[name] = fn;
  return this;
}
var check = new Function();

check.add('checkName', function () {return this;}).add('checkEmail', function () {return this;});

check.checkName(),checkEmail();

// 类调用
var m = new check();
m.checkName(),checkEmail();
```
