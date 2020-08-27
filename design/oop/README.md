# 原型模式

> 原型模式不仅是一种设计模式，它还是一种编程范式（programming paradigm），是 JavaScript 面向对象系统实现的根基。

在 JavaScript 里，`Object.create`方法就是原型模式的天然实现——准确地说，只要我们还在借助Prototype来实现对象的创建和原型的继承，那么我们就是在应用原型模式.

## 原型链

> ECMAScript 2015 中引入的 JavaScript 类实质上是 JavaScript 现有的基于原型的继承的语法糖。类语法不会为 JavaScript 引入新的面向对象的继承模型。 ——MDN

原型编程范式的核心思想就是**利用实例来描述对象，用实例作为定义对象和继承的基础**。在 JavaScript 中，原型编程范式的体现就是基于原型链的继承。这其中，对原型、原型链的理解是关键。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例，除了`Object.prototype`（当然，如果我们手动用`Object.create(null)`创建一个没有任何原型的对象，那它也不是 Object 的实例）

```js
// 创建一个Dog构造函数
function Dog(name, age) {
  this.name = name
  this.age = age
}

Dog.prototype.eat = function() {
  console.log('肉骨头真好吃')
}

// 使用Dog构造函数创建dog实例
const dog = new Dog('旺财', 3)

// 输出"肉骨头真好吃"
dog.eat()

// 输出"[object Object]"
dog.toString()
```

## 深拷贝

> 深拷贝没有完美方案，每一种方案都有它的边界 case

调用深拷贝方法，若属性为值类型，则直接返回；若属性为引用类型，则递归遍历。这就是我们在解这一类题时的核心的方法。

```js
function deepClone(obj) {
    // 如果是 值类型 或 null，则直接return
    if(typeof obj !== 'object' || obj === null) {
        return obj
    }
    
    // 定义结果对象
    let copy = {}
    
    // 如果对象是数组，则定义结果数组
    if(obj.constructor === Array) {
        copy = []
    }
    
    // 遍历对象的key
    for(let key in obj) {
        // 如果key是对象的自有属性
        if(obj.hasOwnProperty(key)) {
            // 递归调用深拷贝方法
            copy[key] = deepClone(obj[key])
        }
    }
    
    return copy
} 
```
