# 装饰器模式

> 在不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求

对它已有的功能做个拓展，只关心拓展出来的那部分新功能如何实现?
程序员说：“我不想努力了，我想开挂”，于是便有了装饰器模式

```js
// 将展示Modal的逻辑单独封装
function openModal() {
    const modal = new Modal()
    modal.style.display = 'block'
}

// 按钮文案修改逻辑
function changeButtonText() {
    const btn = document.getElementById('open')
    btn.innerText = '快去登录'
}

// 按钮置灰逻辑
function disableButton() {
    const btn =  document.getElementById('open')
    btn.setAttribute("disabled", true)
}

// 新版本功能逻辑整合
function changeButtonStatus() {
    changeButtonText()
    disableButton()
}

document.getElementById('open').addEventListener('click', function() {
    openModal()
    changeButtonStatus()
})

// es6
// 定义打开按钮
class OpenButton {
    // 点击后展示弹框（旧逻辑）
    onClick() {
        const modal = new Modal()
        modal.style.display = 'block'
    }
}

// 定义按钮对应的装饰器
class Decorator {
    // 将按钮实例传入
    constructor(open_button) {
        this.open_button = open_button
    }
    
    onClick() {
        this.open_button.onClick()
        // “包装”了一层新逻辑
        this.changeButtonStatus()
    }
    
    changeButtonStatus() {
        this.changeButtonText()
        this.disableButton()
    }
    
    disableButton() {
        const btn =  document.getElementById('open')
        btn.setAttribute("disabled", true)
    }
    
    changeButtonText() {
        const btn = document.getElementById('open')
        btn.innerText = '快去登录'
    }
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)

document.getElementById('open').addEventListener('click', function() {
    // openButton.onClick()
    // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
    decorator.onClick()
})
```

## ES7装饰器

> @语法糖轻松地给一个类或方法装上装饰器

- 装饰器语法糖首先帮我们做掉的工作 —— 函数传参&调用

**类装饰器**：

```js
// target 为类本身
function classDecorator(target) {
    target.hasDecorator = true
    return target
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
    // Button类的相关逻辑
}
```

**方法装饰器**：

```js
// target：class.prototype
// name: 修饰目标方法属性名
// description: 属性描述对象
function funcDecorator(target, name, descriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function() {
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

class Button {
    @funcDecorator
    onClick() { 
        console.log('我是Func的原有逻辑')
    }
}   
```

- target
此处的 target 变成了`Button.prototype`，即类的原型对象。这是因为 onClick 方法总是要依附其实例存在的，修饰 onClik 其实是修饰它的实例。但我们的装饰器函数执行的时候，Button 实例还并不存在。为了确保实例生成后可以顺利调用被装饰好的方法，装饰器只能去修饰 Button 类的原型对象。

- 调用时机
装饰器函数执行的时候，Button 实例还并不存在。这是因为实例是在我们的代码运行时动态生成的，而装饰器函数则是在编译阶段就执行了。所以说装饰器函数真正能触及到的，就只有类这个层面上的对象。

- description
`Object.defineProperty`方法我想大家多少都用过，它的调用方式是这样的：`Object.defineProperty(obj, prop, descriptor)`此处的descriptor和装饰器函数里的 descriptor 是一个东西。很明显，拿到了 descriptor，就相当于拿到了目标方法的控制权。通过修改 descriptor，我们就可以对目标方法为所欲为的逻辑进行拓展了

  - 数据描述符：包括 value（存放属性值，默认为默认为 undefined）、writable（表示属性值是否可改变，默认为true）、enumerable（表示属性是否可枚举，默认为 true）、configurable（属性是否可配置，默认为true）。
  - 存取描述符：包括 get 方法（访问属性时调用的方法，默认为 undefined），set（设置属性时调用的方法，默认为 undefined ）

## HOC高阶组件

> HOC (Higher Order Component) 即高阶组件。它是装饰器模式在 React 中的实践，同时也是 React 应用中非常重要的一部分。通过编写高阶组件，我们可以充分复用现有逻辑，提高编码效率和代码的健壮性。

```js
import React, { Component } from 'react'

const BorderHoc = WrappedComponent => class extends Component {
  render() {
    return <div style={{ border: 'solid 1px red' }}>
      <WrappedComponent />
    </div>
  }
}
export default borderHoc
```

用它来装饰目标组件

```js
import React, { Component } from 'react'
import BorderHoc from './BorderHoc'

// 用BorderHoc装饰目标组件
@BorderHoc 
class TargetComponent extends React.Component {
  render() {
    // 目标组件具体的业务逻辑
  }
}

// export出去的其实是一个被包裹后的组件
export default TargetComponent
```

## React-Redux

> connect 也是一种对组件的装饰器模式
