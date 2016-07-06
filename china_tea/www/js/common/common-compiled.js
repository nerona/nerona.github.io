'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//定义全局变量，调试使用
window.isdebug = false;
if (!isdebug) {//加入微信验证
    //document.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx13ea47ddb8c2bb7e&redirect_uri=http%3a%2f%2f9eagles.ngrok.cc%2fhtml%2fcustomer%2findex.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
}
var Util = Util || {};

/*定义常用方法工具对象*/
Util.common = {
    //配置全局根路径http://115.159.25.170/shanguoyinyi
    //baseUrl: 'http://sp.xiangshanzx.com/shanguoyinyi',
    baseUrl: 'http://www.cha2u.com/shanguoyinyi',
    //配置全局版本号
    versionCode: 'v1.0',
    //获取html页面直接跳转参数值
    getParameter: function getParameter(name) {
        var re = new RegExp("[\?|\&]" + name + "=([^\&]*)", "i");
        var a = re.exec(document.location.search);
        if (a == null) return null;
        return decodeURIComponent(a[1]);
    },
    //ajax回调获取post方式
    executeAjaxCallback: function executeAjaxCallback(url, param, callbackFun) {
        $.post(url, param, function (result) {
            console.log("success\nurl:" + url + "\nparam:" + JSON.stringify(param) + "\nresult:" + JSON.stringify(result));
            callbackFun(result);
        }, 'json');
    },
    //ajax回调获取get方式，不建议使用，统一使用post
    executeGetJsonAjaxCallback: function executeGetJsonAjaxCallback(url, param, callbackFun) {
        $.getJSON(url, param, function (result) {
            console.log("success\nurl:" + url + "\nparam:" + JSON.stringify(param) + "\nresult:" + JSON.stringify(result));
            callbackFun(result);
        });
    },
    setWxTitle: function setWxTitle(title) {
        setTimeout(function () {
            $('head title').html(title);
        }, 300);
        //需要jQuery
        var $body = $('body');
        document.title = title;
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load', function () {
            setTimeout(function () {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
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
    show: function show(id, content, icon) {
        var showmsgdiv = null;
        var popup = null;
        if ($("#" + id).html() == null) {
            showmsgdiv = '<div id="' + id + '" class="ui-content" data-position-to="window" data-role="popup" data-theme="b" style="background-color: rgba(0,0,0,0.7);">';
            if (icon != null) {
                showmsgdiv += '<div style="text-align: center;">' + '    <div style="width: 8rem;height: 8rem;line-height: 11rem;margin: 0 auto;border-radius:100%;background-color: #FEFCFB;">' + '	 <img src="' + icon + '" style="width: 55%;"/></div>' + '</div>';
            }
            showmsgdiv += '<div style="text-align: center;">' + '    <p>' + content + '</p>' + '</div>' + '</div>';
            popup = $(showmsgdiv);
            $.mobile.activePage.append(popup);
        } else {
            showmsgdiv = $("#" + id);
            popup = $(showmsgdiv);
            $("#" + id + " p").html(content);
        }
        popup.popup();
        popup.popup("open");
        setTimeout(function () {
            popup.popup("close");
        }, 3000);
    },
    /**
     * 可配置项
     *所有参数都不是必填
     * 默认为确实对话框
     *  var options = {
     *          parent_width:0.8,//百分比宽带非必填，默认80%宽度
     *          parent_height:0.5,//百分比高度,非必填，默认auto
     *         parent_background:'#fff',//弹窗背景，非必填默认白色
     *          id:'my-bm-ok-popup',//弹窗id，必填项，不填id则为空
     *          parent_opacity:1,//透明度，非必填默认为1
     *          dialog_close:{右侧关闭按钮
     *              status:true,//是否开启默认为开启
     *              //    imgUrl:''//不传为默认图片
     *          },
     *          content:{
     *              notice_img:'',//提示图片，不传则无图片
     *              notice_title:'提示',//提示title不传则没有title
     *              notice_content:'添加成功啦'  //提示内容必填，不填则无提示内容
     *          },
     *          buttons:{//确认按钮
     *            ok:{
     *                status:true,//默认true
     *                class:'',有默认class
     *                 style:'',//默认红底白字按钮样式
     *                 callback:''
     *             } ,
     *             cancel:{//关闭按钮
     *                 status:true,//默认为false
     *                 class:'',有默认class
     *                 style:'',//有默认样式，默认样式为白底黑边，黑字
     *                 callback:''
     *             }
     *             , diy_btn:{//自定义按钮
     *                  style:'',
     *                  class:'',
     *                  text:'diy'
     *              }
     *}
     * @param options
     */
    showPopup: function showPopup(options) {
        var default_ok_btn_class = 'ok-btn-c-dialog';
        var default_cancel_btn_class = 'cancel-btn-c-dialog';
        var default_div_style = 'width: 100%;text-align: center;';
        var str = '<div data-position-to="window" data-role="popup" id="{id}" style="{parent_style}" data-dismissible="false" >';
        var parent_style = 'margin-right: auto;margin-left: auto;padding: 20px;';
        if (typeof options.parent_width == 'undefined') {
            options.parent_width = screen.width * 0.8 + 'px';
        } else {
            options.parent_width = screen.width * options.parent_width + 'px';
        }
        if (typeof options.parent_height == 'undefined') {
            options.parent_height = 'auto';
        } else {
            options.parent_height = screen.height * options.parent_height + 'px';
        }
        if (typeof options.parent_background == 'undefined') {
            options.parent_background = '#fff';
        }
        if (typeof options.parent_opacity == 'undefined') {
            options.parent_opacity = 1;
        }
        if (typeof options.id == 'undefined') {
            options.id = 'my-ok-popup-xxj';
        }
        parent_style += 'width:' + options.parent_width + ';' + 'height:' + options.parent_height + ';' + 'background:' + options.parent_background + ';' + 'opacity:' + options.parent_opacity;
        str = str.replace(/\{parent_style\}/, parent_style).replace(/\{id\}/, options.id);
        if (typeof options.dialog_close != 'undefined') {
            if (typeof options.dialog_close.imgUrl == 'undefined') {
                options.dialog_close.imgUrl = 'imgs/an/hdpi/home_dc.png';
            }
            str += '<a href="#" data-rel="back" class="ui-btn-right dialog_close" style="right:0;top:0;"><img src="' + options.dialog_close.imgUrl + '"/></a>';
        }
        if (typeof options.content.notice_img != 'undefined') {
            str += '<div class="my-popup-notice-img" style="' + default_div_style + '"><img src="' + options.content.notice_img + '"/></div>';
        }
        if (typeof options.content.notice_title != 'undefined') {
            str += '<div class="my-popup-notice-title" style="margin-top: 20px;' + default_div_style + '">' + options.content.notice_title + '</div>';
        }
        if (typeof options.content.notice_content == 'undefined') {
            options.content.notice_content = 'success';
        }
        str += '<div class="my-popup-notice-content" style="margin-top: 20px;' + default_div_style + '">' + options.content.notice_content + '</div>';
        if (typeof options.buttons == 'undefined') {
            options.buttons = {
                ok: {
                    status: true,
                    style: ''
                }
            };
        }
        str += '<div class="my-popup-btn" style="bottom: 35px;text-align: center;display: inline-block;width: 100%;margin-top: 40px;">';
        if (typeof options.buttons.ok != 'undefined' && options.buttons.ok.status) {
            var ok_btn_style = 'margin: 0 5px;';
            var ok_btn_class = default_ok_btn_class;
            var callback = null;
            if (typeof options.buttons.ok.style != 'undefined') {
                ok_btn_style += options.buttons.ok.style;
            }
            if (typeof options.buttons.ok.class != 'undefined') {
                ok_btn_class = options.buttons.ok.class;
            }
            if (typeof options.buttons.ok.callback != 'undefined') {
                callback = options.buttons.ok.callback;
            }
            str += '<a href="#" data-role="none" class="' + ok_btn_class + '" style="' + ok_btn_style + '" onclick="' + this.closePopup(options.id, callback) + '">确 定</a>';
        }
        if (typeof options.buttons.cancel != 'undefined') {
            var cancel_class = default_cancel_btn_class;
            var cancel_btn_style = 'margin: 0 5px;' + options.buttons.cancel.style;
            var callback = null;
            if (typeof options.buttons.cancel.class != 'undefined') {
                cancel_class = options.buttons.cancel.class;
            }
            if (typeof options.buttons.cancel.callback != 'undefined') {
                callback = options.buttons.cancel.callback;
            }
            str += '<a href="#" data-role="none" class="' + cancel_class + '" style="' + cancel_btn_style + '" onclick="' + this.closePopup(options.id, callback) + '">取消</a>';
        }
        if (typeof options.buttons.diy_btn != 'undefined') {
            str += '<a href="#" data-role="none" class="' + options.buttons.diy_btn.class + '" style="' + options.buttons.diy_btn.style + '" >' + options.buttons.diy_btn.text + '</a>';
        }
        str += '</div></div>';
        console.log(str);
        var popup = $(str);
        //  $.mobile.activePage.append(popup);
        $("body").append(popup);
        popup.popup();
        $("#" + id).popup("open");
    },
    closePopup: function closePopup(id, callback) {
        $("#" + id).popup("close");
        callback();
    }
};
/*定义时间工具对象*/
Util.date = {
    /*计算时间差，返回字符串，如days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"*/
    getTimeDiffer: function getTimeDiffer(firstDate, secondDate) {
        var date3 = firstDate.getTime() - secondDate.getTime(); //时间差的毫秒数
        //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000));
        //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
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
    dateSelect: function dateSelect(dataInputId) {
        var opt = _defineProperty({
            preset: date, //日期
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式
            mode: 'scroller', //日期选择模式
            dateFormat: 'yy-mm-dd', // 日期格式
            setText: '确定', //确认按钮名称
            cancelText: '取消', //取消按钮名籍我
            dateOrder: 'yymmdd', //面板中日期排列格式
            dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
            endYear: 2020 }, 'display', 'bottom');
        $("#" + dataInputId).mobiscroll(opt).date(opt);
    },
    datetimeSelect: function datetimeSelect(dataInputId) {
        var opt = {
            theme: 'android-ics light', //皮肤样式
            mode: 'scroller', //日期选择模式
            dateFormat: 'yy-mm-dd', // 日期格式
            dateOrder: 'yymmdd', //面板中日期排列格式
            timeFormat: 'HH:ii',
            timeWheels: 'HHii',
            lang: { preset: 'hu' },
            setText: '确定', //确认按钮名称
            cancelText: '取消', //取消按钮名籍我
            datetime: {
                preset: 'datetime'
            },
            startYear: 2016, //结束年份
            endYear: 2020 };
        //结束年份
        $("#" + dataInputId).mobiscroll(opt).datetime(opt);
    }
};
/*定义字符串工具对象*/
Util.string = {
    /*空字符串判断*/
    isEmpty: function isEmpty(str) {
        return str == undefined || str == null || str == '' ? true : false;
    },
    /*空字符串判断*/
    trim: function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }
};
/*定义校验工具对象*/
Util.validate = {
    isWeiXin: function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    isAndroid: function isAndroid() {
        return window.navigator.userAgent.match(/Android/i) ? true : false;
    },
    isIos: function isIos() {
        return window.navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    }

};
/*定义高德地图工具对象*/
Util.Amap = {
    marker: null,
    map: null,
    addressVar: null,
    config: null,
    initConfig: function initConfig(config) {
        this.config = config;
        return this;
    },
    init: function init() {
        var self = this;
        //初始化地图对象，加载地图
        this.map = new AMap.Map(self.config.mapContainer, {
            zoom: 13,
            resizeEnable: true,
            keyboardEnable: false
        });
        //地图中添加地图操作ToolBar插件
        this.map.plugin(['AMap.ToolBar'], function () {
            //设置地位标记为自定义标记
            self.map.addControl(new AMap.ToolBar({ ruler: false, direction: false, locate: true, autoPosition: false }));
        });
        //添加点标记，并使用自己的icon
        this.marker = new AMap.Marker({
            map: self.map,
            position: self.map.getCenter(),
            draggable: true,
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
        });
        //注册点击事件，重新设置标记
        this.map.on('click', function (e) {
            self.marker.setPosition([e.lnglat.getLng(), e.lnglat.getLat()]);
            self.setAddress(e.lnglat.getLng(), e.lnglat.getLat());
        });
        //注册标记移动结束时触发事件
        this.marker.on('dragend', function (e) {
            self.setAddress(e.lnglat.getLng(), e.lnglat.getLat());
        });
        //设置初始化取坐标地址
        self.setAddress(this.marker.getPosition().lng, this.marker.getPosition().lat);

        //输入提示
        var auto = new AMap.Autocomplete({ city: "全国", input: self.config.tipinput });
        var placeSearch = new AMap.PlaceSearch({ map: self.map });
        //构造地点查询类
        AMap.event.addListener(auto, "select", //注册监听，当选中某条记录时会触发
        function (e) {
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name); //关键字查询查询
        });
        return this.map;
    },
    //指定坐标初始化地图
    show: function show(lng, lat) {
        var self = this;
        //初始化地图对象，加载地图
        this.map = new AMap.Map(self.config.mapContainer, {
            resizeEnable: true,
            zoom: 13,
            center: [lng, lat]
        });
        //地图中添加地图操作ToolBar插件
        this.map.plugin(['AMap.ToolBar'], function () {
            //设置地位标记为自定义标记
            self.map.addControl(new AMap.ToolBar({ direction: false, locate: true, autoPosition: false }));
        });
        //添加点标记，并使用自己的icon
        this.marker = new AMap.Marker({
            map: self.map,
            position: [lng, lat],
            draggable: true,
            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
        });
    },
    //获取标记的经纬度
    getTargetPosition: function getTargetPosition() {
        return { address: this.addressVar, lng: this.marker.getPosition().lng, lat: this.marker.getPosition().lat };
    },
    //坐标与地址转换
    setAddress: function setAddress(lng, lat) {
        var self = this;
        AMap.service(["AMap.Geocoder"], function () {
            //加载地理编码
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //通过服务对应的方法回调服务返回结果
            geocoder.getAddress([lng, lat], function (status, result) {
                //根据服务请求状态处理返回结果
                if (status === 'complete' && result.info === 'OK') {
                    self.addressVar = result.regeocode.formattedAddress; //返回地址描述
                    /*self.marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                     offset: new AMap.Pixel(20, 10),//修改label相对于maker的位置
                     content: self.addressVar
                     });*/
                    /*var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
                     infoWindow.setContent(self.addressVar);
                     infoWindow.open(self.map, [lng, lat]);*/
                }
            });
        });
    }
};
$(function () {

    console.info(document.location.href);

    if (Util.validate.isWeiXin()) {
        $('.my-header').remove();
    }
    /**
     * 自定义input框事件
     */
    $(".clear-a-text").on("click", function () {
        $(this).prev().val("");
        $(this).hide();
    });
    $(".my-ui-input").on("input propertychange", "input", function () {
        $(this).next().show();
    });
    $(".my-ui-input").on("focus", "input", function () {
        $(".clear-a-text").hide();
        if ($(this).val() != '') {
            $(this).next().show();
        }
    });
});

(function (Util) {
    /**
     * Created by unbregg on 2016/3/16.
     */

    var bridge = null;
    var slice = [].slice;
    var native = window.na = window.native = {
        callbacks: {}
    };

    if (Util.validate.isIos()) {
        var connectWebViewJavascriptBridge = function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge);
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function () {
                    callback(WebViewJavascriptBridge);
                }, false);
            }
        };

        connectWebViewJavascriptBridge(function (bridge) {
            bridge.init(function (message, responseCallback) {
                if (message.callbackId) {
                    native.callback(message.data, message.callbackId);
                }
            });
            native.bridge = bridge;
        });
    }

    native.invoke = function (nativeMethod) {
        var argsMap = this._normalizeArgs.apply(this, arguments);
        var jsMethod = argsMap.jsMethod;
        var uuid = this._storeCallback(jsMethod);
        var nativeArgs = argsMap.nativeArgs;

        var nativeMethod = argsMap.nativeMethod;
        if (Util.validate.isIos()) {
            native.bridge.send({ action: nativeMethod, data: nativeArgs, callbackId: uuid });
        } else {
            if (uuid) {
                nativeArgs.push(uuid);
            }
            window.app[nativeMethod].apply(window.app, nativeArgs);
        }
    };

    native._normalizeArgs = function () {
        var jsMethod = slice.call(arguments, -1)[0];
        var nativeMethod = arguments[0];
        var nativeArgs = [];

        if (typeof jsMethod === 'function') {
            nativeArgs = slice.call(arguments, 1, -1);
        } else {
            jsMethod = null;
            nativeArgs = slice.call(arguments, 1, arguments.length);
        }
        return {
            jsMethod: jsMethod,
            nativeMethod: nativeMethod,
            nativeArgs: nativeArgs
        };
    };
    native._storeCallback = function (jsMethod) {
        var uuid;

        if (typeof jsMethod === 'function') {
            uuid = this._generateUuid();
            this.callbacks[uuid] = jsMethod;
        }
        return uuid;
    };
    native.callback = function (args, uuid) {
        var callback = this.callbacks[uuid];
        if (typeof args === 'string') {
            args = JSON.parse(args);
        }

        if (typeof callback === 'function') {
            callback.apply(window.native, [args]);
            delete this.callbacks[uuid];
        }
    };
    native._jsMethodUuid = 0;
    native._generateUuid = function () {
        return ++native._jsMethodUuid + '';
    };
    Util.na = Util.native = native;
})(Util);

//# sourceMappingURL=common-compiled.js.map