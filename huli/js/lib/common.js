var common = common || {};

common.Util = {
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

    //wx
    if (common.validate.isWeiXin()) {
        //$('.bar').hide();
        //$('.bar-nav~.content').css('top', '0');
    }
    //android
    if (common.validate.isAndroid()) {
        //$('.bar').hide();
        //$('.bar-nav~.content').css('top', '0');
    }
    //ios
    if (common.validate.isIos()) {
        //$('.bar').hide();
        //$('.bar-nav~.content').css('top', '0');
    }
});