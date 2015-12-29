/**
 * Author :  neron
 * time   : 2015/12/11
 * description: ...
 */
var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

var phoneNum = '18659262460';//手机号码

var flag = reg.test(phoneNum); //true

console.log(flag);

