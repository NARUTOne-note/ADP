/**
 * 数字取整
 */

// parseInt()
// * parseInt()处理在处理字符串时，会从第一个不是空格的字符开始处理。如果第一个不是数字字符或者负号，则返回NaN；如果是数字字符，则会一直处理到不是数字字符为止。
// !注意，parseInt()可以识别各种整数格式（十进制，八进制和十六进制）。

var 
  num1 = parseInt("2015nov"),  //2015
  num2 = parseInt(""),  //NaN
  num3 = parseInt("0xA"),  //10(十六进制)
  num4 = parseInt(20.15),  //20
  num5 = parseInt(-20.15),  //-20
  num6 = parseInt("070");  //56(八进制数)

// ~~ number 取整之中最快的

var num1 = ~~20.15,  //20
    num2 = ~~(-20.15);  //-20

// 指数取整 number^0

var num1 = 20.15^0,  //20
    num2 = (-20.15)^0;  //-20

// number<<0
var num1 = 20.15 << 0,  //20
    num2 = (-20.15) << 0,  //-20

/** 计算取整 */ 

// 四舍五入 Math.round(number)

var num1 = Math.round(20.1),  //20
    num2 = Math.round(20.5),  //21
    num3 = Math.round(20.9),  //21
    num4 = Math.round(-20.1),  //-20
    num5 = Math.round(-20.5),  //-20 注意这里是-20而不是-21
    num6 = Math.round(-20.9);  //-21

// 向上取整Math.ceil(number)

var num1 = Math.ceil(20.1),  //21
    num2 = Math.ceil(20.5),  //21
    num3 = Math.ceil(20.9),  //21
    num4 = Math.ceil(-20.1),  //-20
    num5 = Math.ceil(-20.5),  //-20
    num6 = Math.ceil(-20.9);  //-20

// 向下取整Math.floor(number)

var num1 = Math.floor(20.1),  //20
    num2 = Math.floor(20.5),  //20
    num3 = Math.floor(20.9),  //20
    num4 = Math.floor(-20.1),  //-21
    num5 = Math.floor(-20.5),  //-21
    num6 = Math.floor(-20.9),  //-21


/**
 * 进阶整除整数
 */

/**
 * ? 任意一个数，获取离它最近的一个被 10的倍数（10, 100  1000）整除的 数
 * TODO
 */