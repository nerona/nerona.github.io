var ASC = '0',DESC = '1';
var myScroll;// 引用滑动分页需定义此固定变量myScroll，下拉时刷新使用
/**
 * 下拉刷新 （自定义实现此方法）
 * 此处用延迟模拟数据，
 */
function pullDownAction() {
    /**
     *此处填写加载后台数据代码
     * 结束处记得要调用刷新myScroll.refresh();
     **/
    myScroll.refresh();
}

/**
 * 滚动翻页 （自定义实现此方法）
 */
function pullUpAction() {
    $('.empty-list').hide();
    customer.search.loadMore();
}
//初始化绑定iScroll控件
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//document.addEventListener('DOMContentLoaded', function(){loaded("good-grid-id")}, false);
//$(document).bind('mobileinit',function(){
//    $.mobile.changePage.defaults.changeHash = false;
//    $.mobile.hashListeningEnabled = false;
//    $.mobile.pushStateEnabled = false;
//});

$(function () {
    customer.search.init();

    var href = 'html/customer/search/search-special.html?'+document.location.href.split('?')[1];
    console.info(href);
    localStorage.setItem('searchPage', href);
    $('#back').attr('href','html/customer/index.html?storeId='+localStorage.getItem("shopId")+'&type=weixinIndex&userId='+localStorage.getItem("userid"));

});

var customer = customer || {};
//初始化搜索条件
var conditionStr={
    "shopId":localStorage.getItem('shopId'),
    "goodName":Util.common.getParameter('searchText'),
    "pageSize":"",
    "pageNum":1,
    "classifyId":Util.common.getParameter('classify'),
    "saleNumSort":"0",
    "startPrice":"",
    "endPrice":"",
    "brandId":Util.common.getParameter('brandId'),
    "columnId":Util.common.getParameter('columnId'),
    "labelId": Util.common.getParameter('labelId')
};

var Loader = {
    isLoading:false,
    request:function(url,data,cb){
        var loader = this;
        if(loader.isLoading){
            return;
        }
        loader.isLoading = true;
        Util.common.executeAjaxCallback(url,data,function(){
            loader.isLoading = false;
            cb.apply(null,arguments);
        });
    }
};
var timeCounter = function(){
    var timers = $('.timers');
    for(var i=0;i<timers.length;i++){
        var $timer  = $(timers[i]);
        var t = parseInt($timer.find('input').val())-new Date().getTime();
        var d=Math.floor(t/1000/60/60/24);
        var h=Math.floor(t/1000/60/60%24);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);
        $timer.find('.hour').html(( h+d*24));
        $timer.find('.min').html(m);
        $timer.find('.sec').html(s);
    }
};

customer.search = {
    init: function () {
        this.initParameter();
        this.initGoodList();
        this.loadCartNumber();
        setInterval(timeCounter, 1000);
        loaded('good-grid-id-special');

        setTimeout(function(){
            //hot fix. 2016-6-14
            var PADDING_TOP = 8;
            var top = document.querySelector('.ui-content').getBoundingClientRect().top;
            document.querySelector('#good-grid-id-special').style.top = top + PADDING_TOP + 'px';
        },0);
    },
    //初始化加载购物车数目
    loadCartNumber: function () {
        var url = Util.common.baseUrl + "/weixin/cart/getCartCount.do";
        var param = {"userId": localStorage.getItem("userid"), "shopId": localStorage.getItem("shopId")};
        var $cart_num = $('<span id="cart_num"></span>');

        Util.common.executeAjaxCallback(url, param, function (data) {
            console.log(data);
            if(data != '' && data != null) {
                $('.my-goods-cart-search-a').append($cart_num);
                $('#cart_num').html(data);
            } else {
                $('#cart_num').hide();
            }
        });
    },
    //商品分类跳转过来参数初始化 参数title=茶叶&classify=238986851953229824&type=classify
    initParameter: function () {
        var title = Util.common.getParameter("title");
        if (title != null && title != '') {
            $("#pageTitle").html(title);
            $("#classifyId").html(title);
            Util.common.setWxTitle(title);
        }
        if(title.indexOf('搜索') != -1) {
            $("#classifyId").css({
                'width': '60px',
                'text-align': 'center'
            });
        }
        var classify = Util.common.getParameter("classify");
        if (classify != null && classify != '') {
            $("#classifyId").attr('classify', classify);
            //保存选择的分类id,默认为链接过来的父分类ID
            $("#selectClassifyId").val(classify);
        }
        var searchText = Util.common.getParameter("searchText");
        if (searchText != null && searchText != '') {
            $("#goodSearchId").val(searchText);
        }
    },
    conditionsIsGet: false,
    //分类下拉
    showClassify: function (obj) {
        $("#searchFilterPopup").hide();
        $('#searchFilterId').css("color", "#000");
        if ($("#teaNavbarPopup").css("display") == 'block') {
            $('#classifyId').css("color", "#000");
            $("#teaNavbarPopup").hide();
            return;
        } else {
            $('#classifyId').css("color", "#ff6e82");
            $("#teaNavbarPopup").show();
        }
        //初始化加载商品分类
        var data = [
            {
                "name": "特价专区",
                "id": "248493338106195968"
            },
            {
                "name": "众筹专区",
                "id": "248493442048086016"
            },
            {
                "name": "团购专区",
                "id": "248493574755864576"
            }
        ];

        customer.search.loadTemplate("#menu-a", "#search_classify_a_t", data);
        /* var url = Util.common.baseUrl + "/weixin/cargo/classify/queryByParentId.do";
         var param = {"category": "0"};
         Util.common.executeAjaxCallback(url, param, function (data) {
         customer.search.loadTemplate("#menu-a", "#search_classify_a_t", data);
         });*/
        $("#teaNavbarPopup").show();
    },

    changeClassify: function (obj) {
        document.location.href = 'html/customer/search/search-special.html?title=' + $(obj).attr('title') + '&columnId=' + $(obj).attr('classify') + '&type=column';
    },

    initGoodList:function(){
        var url = Util.common.baseUrl+ "/weixin/good/getGoodList.do";
        var param = {"conditionStr":JSON.stringify(conditionStr)};
        Loader.request(url, param, function (data) {
            if (data == '') {
                var $empty = $('<div class="empty-list"><img src="images/xxdpi/kzt_sp.png" alt=""><p>暂无此类商品</p><p>客官逛逛其他商品吧~</p></div>');
                $('#good-grid-id-special').append($empty);
            } else {
                $('.empty-list').hide();
                customer.search.loadTemplate("#thelist", "#search_goodlist_t", data);
            }
            myScroll.refresh();		//调用刷新页面myScroll.refresh();
        });
    },
    //切换排序
    changeToAsc: function (obj) {
        conditionStr.pageNum = 1;
        $('.empty-list').remove();
        var sortField = obj.dataset.sortField;
        var sale, price;
        if ($(obj).hasClass("ui-icon-splb-xx")) { // 降序->升序
            $(obj).removeClass("ui-icon-splb-xx");
            $(obj).addClass("ui-icon-splb-xs");
            //$(obj).attr("value", DESC);
            if($(obj).hasClass('saleSort')) {
                conditionStr.saleNumSort = "1";
                conditionStr.priceSort = null;
            } else {
                conditionStr.saleNumSort = null;
                conditionStr.priceSort = "1";
            }
        } else { // 升序->降序
            $(obj).removeClass("ui-icon-splb-xs");
            $(obj).addClass("ui-icon-splb-xx");
            //$(obj).attr("value", ASC);
            if($(obj).hasClass('saleSort')) {
                conditionStr.saleNumSort = "0";
                conditionStr.priceSort = null;
            } else {
                conditionStr.saleNumSort = null;
                conditionStr.priceSort = "0";
            }
        }
        var url = Util.common.baseUrl+ "/weixin/good/getGoodList.do";

        //change search condition
        $.extend(conditionStr,{
            //"saleNumSort": sale,
            //"priceSort": price
        });

        var param = {"conditionStr":JSON.stringify(conditionStr)};
        Loader.request(url, param, function (data) {
            if (data == '') {
                var $empty = $('<div class="empty-list"><img src="images/xxdpi/kzt_sp.png" alt=""><p>暂无此类商品</p><p>客官逛逛其他商品吧~</p></div>');
                $('#thelist').empty();
                $('#good-grid-id-special').append($empty);
            } else {
                $('.empty-list').remove();
                customer.search.loadTemplate("#thelist", "#search_goodlist_t", data);
                myScroll.refresh();
            }
        });
    },
    //弹出筛选框
    showSearchFilter: function (obj) {
        $("#teaNavbarPopup").hide();
        $('#classifyId').css("color", "#000");

        if ($("#searchFilterPopup").css("display") == 'block') {
            $('#searchFilterId').css("color", "#000");
            $("#searchFilterPopup").hide();
            return;
        } else {
            $('#searchFilterId').css("color", "#ff6e82");
            $("#searchFilterPopup").show();
        }
        if (!this.conditionsIsGet) {
            var url = Util.common.baseUrl + "/weixin/good/goodLabels/findAll.do";
            var param = {};
            this.conditionsIsGet = true;
            Util.common.executeAjaxCallback(url, param, function (data) {
                var datas = {"datas": data};
                customer.search.loadTemplate("#purpose-select", "#purpose-select_t", datas);
            });
            //
            var url2 = Util.common.baseUrl + "/weixin/cargo/brand/findAll.do";
            var param2 = {};
            Util.common.executeAjaxCallback(url2, param2, function (data) {
                var datas = {"datas": data};
                customer.search.loadTemplate("#brand-select", "#brand-select_t", datas);
            });
        }
        //

    },
    btnReset: function () {
        $('.empty-list').hide();
        customer.search.initGoodList();
        $('#searchFilterId').css("color", "#000");
        $("#searchFilterPopup").hide();
    },
    loadMore:function(){
        conditionStr.pageNum++;
        $('.empty-list').hide();
        var url = Util.common.baseUrl+ "/weixin/good/getGoodList.do";
        var param = {"conditionStr":JSON.stringify(conditionStr)};
        console.log(param);
        Loader.request(url, param, function (data) {
            if (data == '') {
                console.log('true');
                $('.empty-list').show();
            } else {
                console.info(data );
                for (var i = 0; i < data.length; i++) {
                    console.info(data[i].startDate);
                    console.info(data[i].endDate);
                    data[i].starttimer = new Date(data[i].startDate).getTime();
                    data[i].endtimer = new Date(data[i].endDate).getTime();
                    var start = parseInt(new Date(data[i].startDate).getTime() - new Date().getTime());
                    var end = parseInt(new Date(data[i].endDate).getTime() - new Date().getTime());
                    console.info(start);
                    console.info(end);
                    var d, h, m, s;
                    if (start > 0 && end > 0) {
                        data[i].cTimer = data[i].starttimer;
                        d = Math.floor(start / 1000 / 60 / 60 / 24);
                        h = Math.floor(start / 1000 / 60 / 60 % 24);
                        m = Math.floor(start / 1000 / 60 % 60);
                        s = Math.floor(start / 1000 % 60);
                        data[i].timeTitle = '距开始:';
                        data[i].hour = ( h + d * 24);
                        data[i].min = m;
                        data[i].sec = s;
                    } else if (start < 0 && end > 0) {
                        data[i].cTimer = data[i].endtimer;
                        d = Math.floor(end / 1000 / 60 / 60 / 24);
                        h = Math.floor(end / 1000 / 60 / 60 % 24);
                        m = Math.floor(end / 1000 / 60 % 60);
                        s = Math.floor(end / 1000 % 60);
                        data[i].timeTitle = '距结束:';
                        data[i].hour = ( h + d * 24);
                        data[i].min = m;
                        data[i].sec = s;
                    } else if (start < 0 && end < 0) {
                        data[i].timeTitle = '已结束!';
                        data[i].hour = 0;
                        data[i].min = 0;
                        data[i].sec = 0;
                        clearInterval(timeCounter);
                    }
                }
                var tpl = $("#search_goodlist_t").tmpl(data);
                console.info(tpl);
                $("#thelist").append(tpl);
                //customer.search.loadTemplate("#thelist", "#search_goodlist_t", data);
            }
            myScroll.refresh();		//调用刷新页面myScroll.refresh();
        });
    },
    //筛选框确定事件
    sureBtnFilter:function(){
        $('#searchFilterId').css("color","#000");
        $("#searchFilterPopup").hide();

        var url = Util.common.baseUrl+ "/weixin/good/getGoodList.do";

        //change search condition
        $.extend(conditionStr,{
            "goodName":Util.common.getParameter('searchText') || "",
            "pageNum":1,
            "startPrice":$('#minPrice').val(),
            "endPrice":$('#maxPrice').val(),
            "brandId":$('input[name=brand]:checked').val() || "",
            "labelId":$('input[name=purpose]:checked').val() || "",
        });

        var param = {"conditionStr":JSON.stringify(conditionStr)};
        Loader.request(url, param, function (data) {
            if (data == '') {
                console.log('true');
                $('.empty-list').show();
            } else {
                customer.search.loadTemplate("#thelist", "#search_goodlist_t", data);
                myScroll.refresh();
                console.log(data);
            }

        });
    },
    executeAjax: function (url, param, render, templateId) {
        $.ajax({
            type: "POST",
            url: url,
            data: param,
            dataType: 'json',
            success: function (result) {
                this.loadTemplate(render, templateId, result);
            }
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        $.extend(data,{
            "starttimer": 1,
            "endtimer": 1,
            "cTimer": 1,
            "timeTitle": 1,
            "hour": 1,
            "min": 1,
            "sec": 1
        });
        for (var i = 0; i < data.length; i++) {
            data[i].starttimer = new Date(data[i].startDate).getTime();
            data[i].endtimer = new Date(data[i].endDate).getTime();
            var start = parseInt(new Date(data[i].startDate).getTime()-new Date().getTime());
            var end = parseInt(new Date(data[i].endDate).getTime()-new Date().getTime());
            var d, h, m,s;
            if(start > 0 && end > 0) {
                data[i].cTimer = data[i].starttimer;
                d = Math.floor(start / 1000 / 60 / 60 / 24);
                h = Math.floor(start / 1000 / 60 / 60 % 24);
                m = Math.floor(start / 1000 / 60 % 60);
                s = Math.floor(start / 1000 % 60);
                data[i].timeTitle = '距开始:';
                data[i].hour =( h+d*24);
                data[i].min = m;
                data[i].sec = s;
            } else if(start < 0 && end > 0) {
                data[i].cTimer = data[i].endtimer;
                d = Math.floor(end / 1000 / 60 / 60 / 24);
                h = Math.floor(end / 1000 / 60 / 60 % 24);
                m = Math.floor(end / 1000 / 60 % 60);
                s = Math.floor(end / 1000 % 60);
                data[i].timeTitle = '距结束:';
                data[i].hour =( h+d*24);
                data[i].min = m;
                data[i].sec = s;
            } else if(start < 0 && end < 0) {
                data[i].timeTitle = '已结束!';
                data[i].hour = 0;
                data[i].min = 0;
                data[i].sec = 0;
                clearInterval(timeCounter);
            }
            console.log(data[i].hour + ':' + data[i].min + ':' + data[i].sec);
            console.log(data[i]);
        }
        $(render).html($(templateId).tmpl(data));
    },
    //获取元素的纵坐标
    getTop: function (e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += getTop(e.offsetParent);
        return offset;
    },
    //获取元素的横坐标
    getLeft: function (e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += getLeft(e.offsetParent);
        return offset;
    },
    //搜索框跳转
    searchEven: function () {
        setTimeout(function () {
            document.location.href = "html/customer/search/search.html";
        }, 300);
    }
};