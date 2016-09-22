"use strict";
/*
 *   虚拟数字键盘
 */
var number = [];
var $input = document.querySelector('.word');
var $keys = document.querySelector('.keys');
$input.addEventListener('touchstart', function () {
    $keys.style.display = "block";
}, false);
//隐藏键盘
document.querySelector('.keys-hide').addEventListener('touchstart', function () {
    $keys.style.display = "none";
}, false);
//按键点击
var keyAll = document.querySelectorAll('.key');
for (var i = 0; i < keyAll.length; i++) {
    var that = keyAll[i];
    if (!that.classList.contains('key-back')) {
        that.addEventListener('touchstart', function () {
            number.push(this.innerText);
            $input.value = number.join("");
        }, false);
    }
}
//删除
document.querySelector('.key-back').addEventListener('touchstart', function () {
    var temp = number.pop();
    $input.value = number.join("");
}, false);

