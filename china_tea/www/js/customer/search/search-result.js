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

    var href = 'html/customer/search/search-result.html?'+document.location.href.split('?')[1];
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
    "priceSort":null,
    "startPrice":"",
    "endPrice":"",
    "brandId":Util.common.getParameter('brandId'),
    "columnId":Util.common.getParameter('columnId'),
    "labelId": Util.common.getParameter('labelId')
};
var all = {
    "id": "1",
    "name": "全部",
    "orderIndex": 0,
    "statusText": "启用",
    "fullName": "全部"
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

customer.search = {
    init: function () {
        this.initParameter();
        this.initGoodList(conditionStr);
        this.loadCartNumber();
        loaded('good-grid-id');

        setTimeout(function(){
            //hot fix. 2016-6-14
            var PADDING_TOP = 10;
            var top = document.querySelector('.ui-content').getBoundingClientRect().top;
            document.querySelector('#good-grid-id').style.top = top + PADDING_TOP + 'px';
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
        var classify = Util.common.getParameter("classify");
        if (classify != null && classify != '') {
            $("#classifyId").attr('classify', classify);
            //保存选择的分类id,默认为链接过来的父分类ID
            $("#selectClassifyId").val(classify);
            localStorage.setItem('classifyId', classify);
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
        var url = Util.common.baseUrl + "/weixin/cargo/classify/queryByParentId.do";
        var param = {"category": "0"};
        Util.common.executeAjaxCallback(url, param, function (data) {
            var datas = data;
            all.id = "1";
            datas.unshift(all);
            customer.search.loadTemplate("#menu-a", "#search_classify_a_t", datas);
        });
        $("#teaNavbarPopup").show();
    },
    //下拉分类菜单
    nextClassify: function (obj) {
        var url = Util.common.baseUrl + "/weixin/cargo/classify/queryByParentId.do";
        var param = {parentId: $(obj).attr('classify')};
        localStorage.setItem('classifyId', $(obj).attr('classify'));
        $('#classifyId').html($(obj).html());

        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data == '' || data == null || $(obj).html() == "全部") {
                var conditionStr = {
                    "shopId": localStorage.getItem('shopId'),
                    "goodName": '',
                    "pageSize": "",
                    "pageNum": 1,
                    "classifyId": $(obj).attr('classify'),
                    "saleNumSort": "0",
                    "startPrice": "",
                    "endPrice": "",
                    "brandId": Util.common.getParameter('brandId'),
                    "columnId": Util.common.getParameter('columnId'),
                    "labelId": Util.common.getParameter('labelId')
                };
                $('.empty-list').remove();
                $("#teaNavbarPopup").hide();
                customer.search.initGoodList(conditionStr);
            } else {
                var datas = data;
                all.id = $(obj).attr('classify');
                datas.unshift(all);
                customer.search.loadTemplate("#menu-b", "#search_classify_b_t", datas)
            }
        });
        //this.executeAjax(url, param, "#menu-b", "#search_classify_b_t");

        $("#teaNavbarPopup div:first-child").removeClass("ui-grid-b");
        $("#teaNavbarPopup div:first-child").addClass("ui-grid-a");
        $("#menu-c").html("");
        $('#menu-a li').css("background-color", "#FFF");
        $(obj).css("background-color", "#F2F2F2");
    },
    getClassify: function(obj){
        var conditionStr={
            "shopId":localStorage.getItem('shopId'),
            "goodName":'',
            "pageSize":"",
            "pageNum":1,
            "classifyId":$(obj).attr('classify'),
            "saleNumSort":"0",
            "startPrice":"",
            "endPrice":"",
            "brandId":'',
            "columnId":'',
            "labelId": ''
        };
        localStorage.setItem('classifyId', $(obj).attr('classify'));
        $('.empty-list').remove();
        customer.search.initGoodList(conditionStr);
        $("#teaNavbarPopup").hide();
    },
    lastClassify: function (obj) {
         var url = Util.common.baseUrl + "/weixin/cargo/classify/queryByParentId.do";
         var param = {parentId: $(obj).attr('classify')};
         localStorage.setItem('classifyId', $(obj).attr('classify'));
         Util.common.executeAjaxCallback(url, param, function(data){
             if (data == '' || data == null || $(obj).html() == "全部") {
                 var conditionStr = {
                     "shopId": localStorage.getItem('shopId'),
                     "goodName": '',
                     "pageSize": "",
                     "pageNum": 1,
                     "classifyId": $(obj).attr('classify'),
                     "saleNumSort": "0",
                     "startPrice": "",
                     "endPrice": "",
                     "brandId": Util.common.getParameter('brandId'),
                     "columnId": Util.common.getParameter('columnId'),
                     "labelId": Util.common.getParameter('labelId')
                 };
                 $('.empty-list').remove();
                 $("#teaNavbarPopup").hide();
                 customer.search.initGoodList(conditionStr);
             } else {
                 var datas = data;
                 all.id = $(obj).attr('classify');
                 datas.unshift(all);
                 customer.search.loadTemplate("#menu-c", "#search_classify_c_t", datas)
             }
         });
    },
    initGoodList:function(conditionStr){
        var url = Util.common.baseUrl+ "/weixin/good/getGoodList.do";
        var param = {"conditionStr":JSON.stringify(conditionStr)};
        Loader.request(url, param, function (data) {
            if (data == '' || data == null) {
                var $empty = $('<div class="empty-list"><img src="images/xxdpi/kzt_sp.png" alt=""><p>暂无此类商品</p><p>客官逛逛其他商品吧~</p></div>');
                $('#thelist').empty();
                $('#good-grid-id').append($empty);
            } else {
                $('.empty-list').remove();
                customer.search.loadTemplate("#thelist", "#search_goodlist_t", data);
            }
            myScroll.refresh();		//调用刷新页面myScroll.refresh();
        });
    },
    //切换排序
    changeToAsc: function (obj) {
        conditionStr.pageNum = 1;
        conditionStr.classifyId = localStorage.getItem('classifyId');
        $('.empty-list').remove();
        var sortField = obj.dataset.sortField;
        var sale, price;
        if ($(obj).hasClass("ui-icon-splb-xx")) { // 降序->升序
            $(obj).removeClass("ui-icon-splb-xx");
            $(obj).addClass("ui-icon-splb-xs");
            //$(obj).attr("value", DESC);
            //conditionStr[sortField] = DESC;

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
            //conditionStr[sortField] = ASC;
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
            "classifyId":localStorage.getItem('classifyId')
        });

        var param = {"conditionStr":JSON.stringify(conditionStr)};
        Loader.request(url, param, function (data) {
            if (data == '') {
                var $empty = $('<div class="empty-list"><img src="images/xxdpi/kzt_sp.png" alt=""><p>暂无此类商品</p><p>客官逛逛其他商品吧~</p></div>');
                $('#thelist').empty();
                $('#good-grid-id').append($empty);
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
        $('.empty-list').remove();
        var conditionStr={
            "shopId":localStorage.getItem('shopId'),
            "goodName":'',
            "pageSize":"",
            "pageNum":1,
            "classifyId": localStorage.getItem('classifyId'),
            "saleNumSort":"0",
            "startPrice":"",
            "endPrice":"",
            "brandId":Util.common.getParameter('brandId'),
            "columnId":Util.common.getParameter('columnId'),
            "labelId": Util.common.getParameter('labelId')
        };
        customer.search.initGoodList(conditionStr);
        $('#searchFilterId').css("color", "#000");
        $("#searchFilterPopup").hide();
    },
    loadMore:function(){
        conditionStr.pageNum++;
        conditionStr.classifyId = localStorage.getItem('classifyId');
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
                var tpl = $("#search_goodlist_t").tmpl(data);
                $("#thelist").append(tpl);
                //customer.search.loadTemplate("#thelist", "#search_goodlist_t", data);
                //console.log(data);
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
            "classifyId": "",
            "startPrice":$('#minPrice').val(),
            "endPrice":$('#maxPrice').val(),
            "brandId":$('input[name=brand]:checked').val() || "",
            "labelId":$('input[name=purpose]:checked').val() || "",
        });

        var param = {"conditionStr":JSON.stringify(conditionStr)};
        Loader.request(url, param, function (data) {
            if (data == '') {
                var $empty = $('<div class="empty-list"><img src="images/xxdpi/kzt_sp.png" alt=""><p>暂无此类商品</p><p>客官逛逛其他商品吧~</p></div>');
                $('#thelist').empty();
                $('#good-grid-id').append($empty);
            } else {
                $('.empty-list').remove();
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
                console.log(result);
                customer.search.loadTemplate(render, templateId, result);
            }
        });
    },
    loadTemplate: function (render, templateId, data) {
        // $(render).loadTemplate(templateId, data);
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
