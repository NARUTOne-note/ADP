/*
 * @File: package.js
 * @Project: oop
 * @File Created: Thursday, 8th August 2019 8:17:49 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Thursday, 8th August 2019 8:17:53 pm
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2019 bairong, bairong
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓      ┏┓
 *  ┏┛┻━━━┛┻┓
 *  |           |
 *  |     ━    |
 *  |  ┳┛ ┗┳ |
 *  |          |
 *  |     ┻   |
 *  |           |
 *  ┗━┓     ┏━┛
 *     |      | 神兽保佑 🚀🚀🚀
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

/**
 * OOP——封装
 * 属性、方法封装到构造函数中，面向对象模拟类，首字母大写
 */

var Book = function (id, name, price) {
  // 私有属性
  var num = 1;
  // 私有方法
  function checkId () {
    return this.id;
  }

  // 公有属性
  this.id = id;
  this.name = name;
  this.price = price;
  // 公有方法
  this.copy = () => {}

  // 特权方法
  this.getName = () => {}
  this.setName = () => {}
  this.setPrice = () => {}

  // 特权方法调用 =》 类的构造器
  this.setName(name);
  this.setPrice(price);
}

// 类静态公有属性、方法，new创建对象不能直接访问， 只能直接通过Book.isChinese Book.resetTime使用
Book.isChinese = true;
Book.resetTime = () => {}

// 原型公有属性、方法
// Book.prototype.display = () => {}
Book.prototype = {
  isJsBook: false,
  display: () => {}
}

var book = new Book(10, "javascript", 120);

// book.__proto__ == Book.prototype  => Book prototype
// Book.prototype.constructor == Book
