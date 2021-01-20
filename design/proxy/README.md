# 代理人模式

> 在某些情况下，出于种种考虑/限制，一个对象不能直接访问另一个对象，需要一个第三者（代理）牵线搭桥从而间接达到访问目的，这样的模式就是代理模式

- 代理服务器vpn
- ES6中的Proxy 对象代理
- 运算缓存代理

## 事件代理

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>事件代理</title>
</head>
<body>
  <div id="father">
    <a href="#">链接1号</a>
    <a href="#">链接2号</a>
    <a href="#">链接3号</a>
    <a href="#">链接4号</a>
    <a href="#">链接5号</a>
    <a href="#">链接6号</a>
  </div>
</body>
</html>
```

不代理委托，则每个都得绑定事件监听

```js
// 假如不用代理模式，我们将循环安装监听函数
const aNodes = document.getElementById('father').getElementsByTagName('a')
  
const aLength = aNodes.length

for(let i=0;i<aLength;i++) {
    aNodes[i].addEventListener('click', function(e) {
        e.preventDefault()
        alert(`我是${aNodes[i].innerText}`)
    })
}
```

父元素委托代理

```js
// 获取父元素
const father = document.getElementById('father')

// 给父元素安装一次监听函数
father.addEventListener('click', function(e) {
    // 识别是否是目标子元素
    if(e.target.tagName === 'A') {
        // 以下是监听函数的函数体
        e.preventDefault()
        alert(`我是${e.target.innerText}`)
    }
} )
```

## 虚拟代理

> 图片懒加载（先占位后加载）、预加载

```js
class PreLoadImage {
    // 占位图的url地址
    static LOADING_URL = 'xxxxxx'

    constructor(imgNode) {
        // 获取该实例对应的DOM节点
        this.imgNode = imgNode
    }

    // 该方法用于设置真实的图片地址
    setSrc(targetUrl) {
        // img节点初始化时展示的是一个占位图
        this.imgNode.src = PreLoadImage.LOADING_URL
        // 创建一个帮我们加载图片的Image实例
        const virtualImage  = new Image()
        // 监听目标图片加载的情况，完成时再将DOM上的img节点的src属性设置为目标图片的url
        virtualImage .onload = () => {
            this.imgNode.src = targetUrl
        }
        // 设置src属性，Image实例开始加载图片
        virtualImage .src = targetUrl
    }
}
```

## 缓存代理

> 用空间换时间， 将结果暂存

```js
// addAll方法会对你传入的所有参数做求和操作
const addAll = function() {
    console.log('进行了一次新计算')
    let result = 0
    const len = arguments.length
    for(let i = 0; i < len; i++) {
        result += arguments[i]
    }
    return result
}

// 为求和方法创建代理
const proxyAddAll = (function(){
    // 求和结果的缓存池
    const resultCache = {}
    return function() {
        // 将入参转化为一个唯一的入参字符串
        const args = Array.prototype.join.call(arguments, ',')

        // 检查本次入参是否有对应的计算结果
        if(args in resultCache) {
            // 如果有，则返回缓存池里现成的结果
            return resultCache[args]
        }
        return resultCache[args] = addAll(...arguments)
    }
})()
```

## 保护代理

对部分信息获取进行校验保护拦截
