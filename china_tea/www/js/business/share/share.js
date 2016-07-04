$(function () {
    //初始化加载元素
    business.share.init();
});
var business = business || {};
business.share = {
    content: null,
    init: function () {
        this.loadList();
    },
    //初始化加载收藏列表
    loadList: function () {
        var url = Util.common.baseUrl + "/mobile/getSpreadDetail.do";
        var param = {
            id: Util.common.getParameter("id") + ""
        };
        this.executeAjax(url, param, "#article_detail_xxs", "#share_detail_t");
    },
    executeAjax: function (url, param, render, templateId) {
        var that = this;
        Util.common.executeAjaxCallback(url, param, function (data) {
            that.content = data;
            $(render).html($(templateId).tmpl(data));
        });
    },
}