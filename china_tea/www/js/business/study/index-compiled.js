"use strict";

$(function () {
    //初始化加载元素
    business.study.init();
});
var business = business || {};
business.study = {
    content: null,
    init: function init() {
        this.loadList();
    },
    //初始化加载收藏列表
    loadList: function loadList() {
        var url = Util.common.baseUrl + "/event/onlineStudy/mobile/findOneById.do";
        var param = {
            id: Util.common.getParameter("id")
        };
        this.executeAjax(url, param, "#article_detail_xxs", "#study_detail_t");
    },
    executeAjax: function executeAjax(url, param, render, templateId) {
        var that = this;
        Util.common.executeAjaxCallback(url, param, function (data) {
            that.content = data.msg;
            $(render).html($(templateId).tmpl(data.msg));
        });
    }
};

//# sourceMappingURL=index-compiled.js.map