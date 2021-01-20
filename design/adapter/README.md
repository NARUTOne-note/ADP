# 适配器模式

> 通过把一个类的接口变换成客户端所期待的另一种接口，可以帮我们解决不兼容的问题

把变化留给自己，把统一留给用户, 化腐朽为神奇。

- 适配旧代码中的`ajax`， `Fetch` 转为 `axios`
- 适配旧代码调用方法

```js
// 兼容 事件绑定
function on(type, fn){
  // 对于支持dom2级事件处理程序
  if(document.addEventListener){
      dom.addEventListener(type,fn,false);
  }else if(dom.attachEvent){
  // 对于IE9一下的ie浏览器
      dom.attachEvent('on'+type,fn);
  }else {
      dom['on'+ type] = fn;
  }
}
```
