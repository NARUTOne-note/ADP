# 工厂模式

> 工厂模式其实就是将创建对象的过程单独封装, 工厂模式的目的，就是为了实现无脑传参.

```js
function User(name , age, career, work) {
    this.name = name
    this.age = age
    this.career = career 
    this.work = work
}

// 可以将work抽离单独维护
function Factory(name, age, career) {
    let work
    switch(career) {
        case 'coder':
            work =  ['写代码','写系分', '修Bug'] 
            break
        case 'product manager':
            work = ['订会议室', '写PRD', '催更']
            break
        case 'boss':
            work = ['喝茶', '看报', '见客户']
        case 'xxx':
            // 其它工种的职责分配
            ...
            
    return new User(name, age, career, work)
}
```

构造器解决的是多个对象实例的问题，简单工厂解决的是多个类的问题。那么当复杂度从多个类共存上升到多个工厂共存时又该怎么处理呢?
