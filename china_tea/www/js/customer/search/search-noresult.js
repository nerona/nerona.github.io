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

customer.search = {
    init: function () {
        this.initParameter();
        this.initGoodList();
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
        var data;
        if(Util.common.getParameter('type') == "column"){
            data = [
                {
                    "name": "今日推荐",
                    "id": "248492567013711872"
                },
                {
                    "name": "精选商品",
                    "id": "248492643227463680"
                },
                {
                    "name": "新品上线",
                    "id": "248492756212002816"
                },
                {
                    "name": "节日专区",
                    "id": "248526012364853248"
                }
            ];
        } else {
            data = [
                {
                    "name": "私房收藏",
                    "id": "248493708518711296"
                },
                {
                    "name": "专业茶客",
                    "id": "24849374961003724"
                },
                {
                    "name": "商务用户",
                    "id": "248494260330545152"
                },
                {
                    "name": "家庭用茶",
                    "id": "248494356275519488"
                },
                {
                    "name": "贵宾送礼",
                    "id": "249238084118851584"
                },
                {
                    "name": "客户送礼",
                    "id": "249238118918856704"
                },
                {
                    "name": "企业福利",
                    "id": "249238167614320640"
                }
            ];
        }

        customer.search.loadTemplate("#menu-a", "#search_classify_a_t", data);
       /* var url = Util.common.baseUrl + "/weixin/cargo/classify/queryByParentId.do";
        var param = {"category": "0"};
        Util.common.executeAjaxCallback(url, param, function (data) {
            customer.search.loadTemplate("#menu-a", "#search_classify_a_t", data);
        });*/
        $("#teaNavbarPopup").show();
    },

    changeClassify: function (obj) {
        localStorage.setItem('classifyId', $(obj).attr('classify'));
        if(Util.common.getParameter('type') == "column") {
            document.location.href = 'html/customer/search/search-noresult.html?title=' + $(obj).attr('title') + '&columnId=' + $(obj).attr('classify') + '&type=column';
        } else if(Util.common.getParameter('type') == "application") {
            document.location.href = 'html/customer/search/search-noresult.html?title=' + $(obj).attr('title') + '&labelId=' + $(obj).attr('classify') + '&type=application';
        }
    },

    initGoodList:function(){
        var url = Util.common.baseUrl+ "/weixin/good/getGoodList.do";
        var param = {"conditionStr":JSON.stringify(conditionStr)};
        Loader.request(url, param, function (data) {
            if (data == '') {
                var $empty = $('<div class="empty-list"><img src="images/xxdpi/kzt_sp.png" alt=""><p>暂无此类商品</p><p>客官逛逛其他商品吧~</p></div>');
                $('#good-grid-id').append($empty);
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
                var tpl = $("#search_goodlist_t").tmpl(data);
                $("#thelist").append(tpl);
                //customer.search.loadTemplate("#thelist", "#search_goodlist_t", data);
                //console.log(data);
            }
            myScroll.refresh();		//调用刷新页面myScroll.refresh();
            conditionStr.pageNum++;
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
