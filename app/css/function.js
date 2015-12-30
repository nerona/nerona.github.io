/**
 * Author :  neron
 * time   : 2015/12/30
 * description: ...
 */
// 判断某个对象是否有指定的className
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

// 给指定对象添加className
function addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

// 删除className
function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}
//
function parseUrl(url) {
    // 找到url中的第一个?号
    var parse = url.substring(url.indexOf("?") + 1),
        params = parse.split("&"),
        len = params.length,
        item = [],
        param = {};

    for (var i = 0; i < len; i++) {
        item = params[i].split("=");
        param[item[0]] = item[1];
    }

    return param;
}

// demo:
console.log(parseUrl("www.xuanfengge.com/js?name=xuanfeng&age=21&page=2"));

/*
* @description 将传入的url参数对象解析组装成字符串做为queryString中的一部分
* @param {Object} params 请求参数的数组
* @param {string} cgi 请求串
* @return {String} queryString部分字符串
* @example ： param1=value1&param2=value2&param3=value3......
*/
function convert_params(params, cgi){
    var paramsArray = [];
    for (var name in params) {
        if (paramsArray.length == 0) {
            cgi && cgi.indexOf('?') != -1 ? paramsArray.push("&") : paramsArray.push("?");
        }
        else {
            paramsArray.push("&");
        }
        paramsArray.push(name);
        paramsArray.push("=");
        paramsArray.push(params[name]);
    }
    return paramsArray.join("");
}

console.log(convert_params({"param": "value1", "param2": "value2"}, "/cgi-bin/"));
// ?param=value1&param2=value2
console.log(convert_params({"param": "value1", "param2": "value2"}, "/cgi-bin/?page=1"));
// &param=value1&param2=value2


function isEmptyObj(obj){
    for(var name in obj) {
        return false;
    }
    return true;
}
console.log(isEmptyObj({}));                //true
console.log(isEmptyObj({name: "ivan"}));    //false
//cookie
var cookie = {
    getTopDomain : function() {
        var top = window.location.host, list = {
            'com.cn' : 1,
            'net.cn' : 1,
            'gov.cn' : 1,
            'com.hk' : 1
        }, arr = top.split('.');
        //配置最常用的地区域名名单
        arr.length > 2 && function() {
            top = (list[arr.slice(-2).join('.')] ? arr.slice(-3) : arr.slice(-2)).join('.');
        }();
        return top;
    },
    get : function(key) {
        var ret = document.cookie.match(new RegExp("(?:^|;\\s)" + key + "=(.*?)(?:;\\s|$)"));
        return ret ? ret[1] : "";
    },
    save : function(key, value, expires) {
        document.cookie = key + "=" + value + ";path=/;domain=" + this.getTopDomain() + ( expires ? ";expires=" + expires : '');
    }
}
//useragent
/*var userAgent = navigator.userAgent.toLowerCase();
$.browser = {
    version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
    safari: /webkit/.test( userAgent ),
    opera: /opera/.test( userAgent ),
    msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
    mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};*/

//converter
var Converter = {
    toInt: function(val){
        return result = isNaN(val)? 0 : parseInt(val);
    },
    toFloat: function(val){
        return result = isNaN(val)? 0 : parseFloat(val);
    },
    toDate: function(strDate){
        var sDate = strDate.replace(/(^\s+|\s+$)/g,''); //去两边空格;
            if(sDate==''){
            return null;
        }

        var s = sDate.replace(/[\d]{4,4}[\-/]{1}[\d]{1,2}[\-/]{1}[\d]{1,2}/g, '');
        if (s == '')
        {
            var t=new Date(sDate.replace(/\-/g,'/'));
            var ar = sDate.split(/[-/:]/);
            if(ar[0] == t.getFullYear() && ar[1] == t.getMonth() + 1 && ar[2] == t.getDate())
            {
                return t;   //返回转化成功的日期对象
            }
        }

        return null;

    }
};

console.log(Converter.toInt("12.3"));
// 12
console.log(Converter.toFloat("12.36"));
// 12.36
console.log(Converter.toDate("2014/9/2"));
console.log(Converter.toDate("2014-9-2"));
console.log(Converter.toDate("2014-09-02"));
// Tue Sep 02 2014 00:00:00 GMT+0800 (中国标准时间)