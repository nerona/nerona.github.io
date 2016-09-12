//定义全局变量，调试使用
window.isdebug = false;
if (!isdebug) {//加入微信验证
    //document.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx13ea47ddb8c2bb7e&redirect_uri=http%3a%2f%2f9eagles.ngrok.cc%2fhtml%2fcustomer%2findex.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
}
var Util = Util || {};

/*定义常用方法工具对象*/
Util.common = {
    //配置全局根路径http:
    baseUrl: '',
    //配置全局版本号
    versionCode: 'v1.0',
    //获取html页面直接跳转参数值
    getParameter: function (name) {
        var re = new RegExp("[\?|\&]" + name + "=([^\&]*)", "i");
        var a = re.exec(document.location.search);
        if (a == null)
            return null;
        return decodeURIComponent(a[1]);
    },
    //ajax回调获取post方式
    executeAjaxCallback: function (url, param, callbackFun) {
        $.post(url, param, function (result) {
            console.log("success\nurl:" + url + "\nparam:" + JSON.stringify(param) + "\nresult:" + JSON.stringify(result));
            callbackFun(result);
        }, 'json');
    },
    //ajax回调获取get方式
    executeGetAjaxCallback: function (url, param, callbackFun) {
        $.get(url, param, function (result) {
            console.log("success\nurl:" + url + "\nparam:" + JSON.stringify(param) + "\nresult:" + JSON.stringify(result));
            callbackFun(result);
        }, 'json');
    },
    //ajax回调获取put方式
    executePutAjaxCallback: function (url, param, callbackFun) {
        $.ajax({
            url: url,
            data: param,
            type: 'put',
            dataType: 'json',
            success: function(data){
                callbackFun(data);
            }
        });
    },
    //ajax回调获取get方式，不建议使用，统一使用post
    executeGetJsonAjaxCallback: function (url, param, callbackFun) {
        $.getJSON(url, param, function (result) {
            console.log("success\nurl:" + url + "\nparam:" + JSON.stringify(param) + "\nresult:" + JSON.stringify(result));
            callbackFun(result);
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        $(render).html($(templateId).tmpl(data));
    },
    setWxTitle:function(title){
        setTimeout(function(){
            $('head title').html(title);
        },300);
        //需要jQuery
        var $body = $('body');
        document.title = title;
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
        $iframe.remove();
    }
};
/*定义字符串工具对象*/
Util.msg = {
    /*
     *描述：自定义提示框，3秒后自动消失
     *id：必须惟一
     *content：提示的文本内容
     *icon（可选）： 提示框的图标，图标为圆
     */
    show: function (id, content, icon) {
        var popup = $("<div class='popup-mask'><div class='popup-content'>" + content + "</div></div>");
        $('body').append(popup);
        setTimeout(function () {
            popup.remove();
        }, 2500);
    }
};
/*定义字符串工具对象*/
Util.string = {
    /*空字符串判断*/
    isEmpty: function (str) {
        return str == undefined || str == null || str == '' ? true : false;
    },
    /*空字符串判断*/
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }
}
/*定义校验工具对象*/
Util.validate = {
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    isAndroid: function () {
        return window.navigator.userAgent.match(/Android/i) ? true : false;
    },
    isIos: function () {
        return window.navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    }

};

$(function(){
    //html font-size reset ---> rem
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        if(windowWidth > 550){
            html.style.fontSize = '80px';
        } else {
            html.style.fontSize = windowWidth / 7.5 + 'px';
        }
    }, false);
});