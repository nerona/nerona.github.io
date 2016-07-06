"use strict";

$(function () {
    //初始化加载元素
    business.orderInfo.init();
});
var business = business || {};
business.orderInfo = {
    init: function init() {
        var id = Util.common.getParameter("id");
        this.loadInfo(id);
    },
    //初始化加载收藏列表
    loadInfo: function loadInfo(id) {
        var url = Util.common.baseUrl + "/deal/indent/mobile/getOrderDetail.do";
        var param = { "id": id };
        this.executeAjax(url, param, "#order_info", "#order_info_t");
    },
    executeAjax: function executeAjax(url, param, render, templateId) {
        Util.common.executeAjaxCallback(url, param, function (data) {
            $(render).html($(templateId).tmpl(data));
        });
    },
    loadTemplate: function loadTemplate(render, templateId, data) {
        $(render).html($(templateId).tmpl(data));
    }
};

//# sourceMappingURL=order-detail-compiled.js.map