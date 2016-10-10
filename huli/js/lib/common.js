(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        if(windowWidth > 550){
            html.style.fontSize = '80px';
        } else {
            html.style.fontSize = windowWidth / 7.5 + 'px';
        }
    }, false);
})();

var common = common || {};


common.Util = {
    //配置全局根路径http://120.26.241.5:80/hesheng/
    baseUrl: 'http://www.xmemoo.cn/hulijiedao/',
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
    //ajax回调获取get方式，不建议使用，统一使用post
    executeGetJsonAjaxCallback: function (url, param, callbackFun) {
        $.getJSON(url, param, function (result) {
            console.log("success\nurl:" + url + "\nparam:" + JSON.stringify(param) + "\nresult:" + JSON.stringify(result));
            callbackFun(result);
        });
    },
    //jsonp回调获取get方式
    executeGetJsonpCallback: function (url, param, callbackFun) {
        $.ajax({
            url: url,
            data: param,
            type: 'get',
            dataType: 'jsonp',
            success: function(data){
                callbackFun(data);
            }
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        $(render).html($(templateId).tmpl(data));
    }
};
/*定义校验工具对象*/
common.validate = {
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
/*加载中*/
common.loading = {
    show: function(){
        var $load = $('<div class="loading-box"><div class="loading"></div></div>');
        $('body').append($load);
    },
    hide: function(){
        $('.loading-box').remove();
    }
};
//toast
common.toast = {
    /*
     *描述：自定义提示框，3秒后自动消失
     *id：必须惟一
     *content：提示的文本内容
     *icon（可选）： 提示框的图标，图标为圆
     */
    show: function (id, content, icon) {
        var toast = $("<div class='popup-mask'><div class='popup-content'>" + content + "</div></div>");
        $('body').append(toast);
        setTimeout(function () {
            toast.remove();
        }, 2500);
    }
};

$(function () {
    console.info(document.location.href);
});