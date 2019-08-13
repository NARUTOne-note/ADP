/**
 * 利用正则查询出现次数最多的字符
 */

function mostStr (str) {
  //排序，正则匹配子项
  var arr = str.split("");
  arr.sort();
  str = arr.join('');

  // \1匹配前面相同的，也就是说跟（\w）相同的
  var reg = /(\w)\1+/g;
  var num = 0;
  var v = "";

  // $0，字符串
  str.replace(reg, ($0, $1) => {
    if (num < $0.length) {
      num = $0.length;
      v = $0;
    }
  });

  return {v, num};
}