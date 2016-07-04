$(function () {
    $("#my-tabs-order").on("click", "a", function () {
        $("#my-tabs-order").find("a").removeClass("my-tabs-active");
        $(this).addClass("my-tabs-active");
    });
});

var business = business || {};
business.order = {
    currentStatus: 0,//当前状态0-全部，1-待付款，2-已付款，默认0
    pageSize: 6, //默认一次加载6条
    pageNum: 1,//默认为1
    shopId: null,
    //初始化加载收藏列表
    loadList: function (status) {
        this.pageNum = 1; //切换tab重新查询
        this.currentStatus = status;
        var url = Util.common.baseUrl + "/deal/indent/mobile/getShopOrderList.do";
        var param = {
            "shopId": Util.common.getParameter("shopId"),
            "status": status,
            "pageSize": this.pageSize,
            "pageNum": this.pageNum
        };
        this.executeAjax(url, param, "#thelist", "#order_list_t");
    },
    exchangeTab: function (status) {
        this.loadList(status);
        myScroll.refresh();
    },
    executeAjax: function (url, param, render, templateId) {
        Util.common.executeAjaxCallback(url, param, function (data) {
            var datas = {"datas": data};
            $("#thelist").html($("#order_list_t").tmpl(datas));
        });
    }
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function () {
    loaded("order_list_all")
}, false);
var myScroll;
//下拉刷新
function pullDownAction() {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction() {
    var url = Util.common.baseUrl + "/deal/indent/mobile/getShopOrderList.do";
    var pageNum = business.order.pageNum + 1;
    var param = {
        "shopId": Util.common.getParameter("shopId"),
        "status": business.order.currentStatus,
        "pageSize": business.order.pageSize,
        "pageNum": pageNum
    };
    Util.common.executeAjaxCallback(url, param, function (data) {
        if (data && data.length > 0) {
            var datas = {"datas": data};
            $("#thelist").append($("#order_list_t").tmpl(datas));
            business.order.pageNum = pageNum;
        }
        myScroll.refresh();		//调用刷新页面myScroll.refresh();
    });
}