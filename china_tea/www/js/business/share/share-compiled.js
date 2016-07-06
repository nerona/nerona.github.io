"use strict";

$(function () {
    //初始化加载元素
    business.share.init();
});
var business = business || {};
business.share = {
    content: null,
    init: function init() {
        this.loadList();
    },
    //初始化加载收藏列表
    loadList: function loadList() {
        var url = Util.common.baseUrl + "/mobile/getSpreadDetail.do";
        var param = {
            id: Util.common.getParameter("id") + ""
        };
        this.executeAjax(url, param, "#article_detail_xxs", "#share_detail_t");
    },
    executeAjax: function executeAjax(url, param, render, templateId) {
        var that = this;
        Util.common.executeAjaxCallback(url, param, function (data) {
            that.content = data;
            $(render).html($(templateId).tmpl(data));
        });
    }
};

//# sourceMappingURL=share-compiled.js.map