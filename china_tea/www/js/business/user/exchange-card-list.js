$(function () {
    //初始化加载元素
    business.cardList.init();
});
var business = business || {};
business.cardList = {
    pageSize: 6, //默认一次加载6条
    pageNum: 1,//默认为1
    shopId: null,
    init: function () {
        this.shopId = Util.common.getParameter("shopId")
        this.loadList();
    },
    //初始化加载收藏列表
    loadList: function () {
        var url = Util.common.baseUrl + "/mobile/voucher/getVoucherList.do";
        var param = {"shopId": business.cardList.shopId, "pageSize": this.pageSize, "pageNum": this.pageNum};
        this.executeAjax(url, param, "#thelist", "#card_list_t");
    },
    executeAjax: function (url, param, render, templateId) {
        Util.common.executeAjaxCallback(url, param, function (data) {
            $(render).html($(templateId).tmpl(data));
        });
    },
    loadTemplate: function (render, templateId, data) {
        $(render).html($(templateId).tmpl(data));
    }
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function () {
    loaded("card_list")
}, false);
var myScroll;
//下拉刷新
function pullDownAction() {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction() {
    var url = Util.common.baseUrl + "/mobile/voucher/getVoucherList.do";
    var pageNum = business.cardList.pageNum + 1;
    var param = {"shopId": business.cardList.shopId, "pageSize": business.cardList.pageSize, "pageNum": pageNum};
    Util.common.executeAjaxCallback(url, param, function (data) {
        if (data.length > 0) {
            business.cardList.pageNum = pageNum;
            $("#thelist").append($("#card_list_t").tmpl(data));
        }
        myScroll.refresh();		//调用刷新页面myScroll.refresh();
    });
}