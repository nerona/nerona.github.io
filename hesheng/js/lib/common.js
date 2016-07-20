//定义全局变量，调试使用
window.isdebug = false;
if (!isdebug) {//加入微信验证
    //document.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx13ea47ddb8c2bb7e&redirect_uri=http%3a%2f%2f9eagles.ngrok.cc%2fhtml%2fcustomer%2findex.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
}
var Util = Util || {};

/*定义常用方法工具对象*/
Util.common = {
    //配置全局根路径http://115.159.25.170/shanguoyinyi
    baseUrl: 'http://120.26.241.5:80/hesheng/',
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
    getImg: function(file){
        var p_url = Util.common.baseUrl + "sysUtilsController/getFile.do";
        var p_param = {
            "getfile": file,
            "getthumb": "getthumb"
        };
        return  p_url + "?getfile=" + file + "&getthumb=getthumb";
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
/*定义时间工具对象*/
Util.date = {
    /*计算时间差，返回字符串，如days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"*/
    getTimeDiffer: function (firstDate, secondDate) {
        var date3 = firstDate.getTime() - secondDate.getTime()  //时间差的毫秒数
        //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000))
        //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        var timeStr = "";
        if (days > 0) {
            timeStr += days + "天";
        }
        if (hours > 0) {
            timeStr += hours + "小时";
        }
        if (minutes > 0) {
            timeStr += minutes + "分钟";
        }
        if (seconds > 0) {
            timeStr += seconds + "秒";
        }
        return timeStr;
    },
    dateSelect: function (dataInputId) {
        var opt = {
            preset: date, //日期
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式
            mode: 'scroller', //日期选择模式
            dateFormat: 'yy-mm-dd', // 日期格式
            setText: '确定', //确认按钮名称
            cancelText: '取消',//取消按钮名籍我
            dateOrder: 'yymmdd', //面板中日期排列格式
            dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
            endYear: 2020, //结束年份
            display: 'bottom'
        };
        $("#" + dataInputId).mobiscroll(opt).date(opt);
    },
    datetimeSelect: function (dataInputId) {
        var opt = {
            theme: 'android-ics light', //皮肤样式
            mode: 'scroller', //日期选择模式
            dateFormat: 'yy-mm-dd', // 日期格式
            dateOrder: 'yymmdd', //面板中日期排列格式
            timeFormat: 'HH:ii',
            timeWheels: 'HHii',
            lang: {preset: 'hu'},
            setText: '确定', //确认按钮名称
            cancelText: '取消',//取消按钮名籍我
            datetime: {
                preset: 'datetime',
            },
            startYear: 2016, //结束年份
            endYear: 2020, //结束年份
        };
        $("#" + dataInputId).mobiscroll(opt).datetime(opt);
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

$(function () {
    console.info(document.location.href);

    if (Util.validate.isWeiXin()) {
        $('.my-header').remove();
    }

    //html font-size reset ---> rem
        document.addEventListener('DOMContentLoaded', function () {
            var html = document.documentElement;
            var windowWidth = html.clientWidth;
            if(windowWidth > 550){
                html.style.fontSize = '80px';
            } else {
                html.style.fontSize = windowWidth / 6.4 + 'px';
            }
        }, false);
});