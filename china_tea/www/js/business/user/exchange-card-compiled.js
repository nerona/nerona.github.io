"use strict";

$(function () {
    //初始化加载元素
    business.card.init();
    $(".my-exchange-card-top-bar").on("click", 'a', function () {
        $(".my-exchange-card-top-bar").find('a').removeClass("my-exchange-card-active");
        $(this).addClass("my-exchange-card-active");
    });
});
var business = business || {};
business.card = {
    pageSize: 6, //默认一次加载6条
    pageNum: 1, //默认为1
    vocherId: null,
    init: function init() {
        this.vocherId = Util.common.getParameter("id");
        this.loadList(1);
    },
    //初始化加载收藏列表
    loadList: function loadList(status) {
        var url = Util.common.baseUrl + "/mobile/voucher/getVoucherDetailList.do";
        //status -1-全部 1-未兑换2-已兑换
        var param = {
            "vocherId": business.card.vocherId,
            "status": status,
            "pageSize": this.pageSize,
            "pageNum": this.pageNum
        };
        this.executeAjax(url, param, "#thelist", "#card_list_t");
    },
    executeAjax: function executeAjax(url, param, render, templateId) {
        Util.common.executeAjaxCallback(url, param, function (data) {
            $(render).html($(templateId).tmpl(data));
        });
    },
    exchangeTab: function exchangeTab(status) {
        this.loadList(status);
        myScroll.refresh();
    }
};

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function () {
    loaded("card_list");
}, false);
var myScroll;
//下拉刷新
function pullDownAction() {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction() {
    var url = Util.common.baseUrl + "/mobile/voucher/getVoucherDetailList.do";
    //status -1-全部 1-未兑换2-已兑换
    var param = {
        "vocherId": business.card.vocherId,
        "status": status,
        "pageSize": business.card.pageSize,
        "pageNum": business.card.pageNum + 1
    };
    Util.common.executeAjaxCallback(url, param, function (data) {
        if (data && data.length > 0) {
            business.card.pageNum += 1;
            $("#thelist").append($("#card_list_t").tmpl(data));
        }
        myScroll.refresh(); //调用刷新页面myScroll.refresh();
    });
}

//# sourceMappingURL=exchange-card-compiled.js.map