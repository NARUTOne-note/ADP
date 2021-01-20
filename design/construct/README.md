# 构造器模式

> 在 JavaScript 中，我们使用构造函数去初始化对象，就是应用了构造器模式。**抽取共性，传入变性**

```js
function User(name , age, career) {
    this.name = name
    this.age = age
    this.career = career 
}

const user = new User(name, age, career)
```

- 共性：对象属性
- 个性：传入值
