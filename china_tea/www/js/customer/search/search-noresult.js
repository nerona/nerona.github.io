var myScroll;

/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullDownAction () {
    myScroll.refresh();
}

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction () {
    customer.search.conditionStr.pageNum += customer.search.conditionStr.pageSize;
    var url = Util.common.baseUrl+ "/weixin/good/getGoodList.do";
    var param = {"conditionStr":JSON.stringify(customer.search.conditionStr)};
    Util.common.executeAjaxCallback(url, param, function (data) {
        if(data.length>0){
            $(render).append($(templateId).tmpl(data));
        }
        myScroll.refresh();
    });
}

$(document).bind('mobileinit',function(){
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});
//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function(){loaded("good-grid-id")}, false);
$(function(){
    customer.search.init();
});

var customer = customer || {};
customer.search = {
    conditionStr:{},
    init:function(){
        this.initParameter();
        this.initGoodList();
    },
    //商品分类跳转过来参数初始化 参数title=茶叶&classify=238986851953229824&type=classify
    initParameter: function () {
        $("#pageTitle").html(Util.common.getParameter("title"));
        //保存选择的分类id,默认为链接过来的父分类ID
        //$("#columnId").val(Util.common.getParameter("id"));
    },
    initGoodList:function(){
        var url = Util.common.baseUrl+ "/weixin/good/getGoodList.do";
        this.conditionStr.shopId = localStorage.getItem("shopId");
        this.conditionStr.goodName = "";
        this.conditionStr.classifyId = "1";//默认全部为1
        this.conditionStr.saleNumSort = "1";
        this.conditionStr.priceSort = "0";
        this.conditionStr.startPrice = "";
        this.conditionStr.endPrice = "";
        this.conditionStr.brandId = "";
        this.conditionStr.labelId = "";
        this.conditionStr.columnId = Util.common.getParameter("columnId");
        this.conditionStr.pageSize = 6;
        this.conditionStr.pageNum = 1;

        var param = {"conditionStr":JSON.stringify(this.conditionStr)};
        Util.common.executeAjaxCallback(url, param, function (data) {
            customer.search.loadTemplate("#thelist", "#search_goodlist_t", data);
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        $(render).html($(templateId).tmpl(data));
    }
}