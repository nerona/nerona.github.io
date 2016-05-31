$(function () {
    //初始化加载元素
    business.study.init();
});
var business = business || {};
business.study = {
    init: function () {
        this.loadList();
    },
    //初始化加载收藏列表
    loadList: function () {
        var url = Util.common.baseUrl + "/event/onlineStudy/mobile/findOneById.do";
        var param = {
            id:Util.common.getParameter("id")
        };
        this.executeAjax(url, param, "#article_detail_xxs", "#study_detail_t");
    },
    executeAjax: function (url, param, render, templateId) {
        Util.common.executeAjaxCallback(url, param, function (data) {
            $(render).html($(templateId).tmpl(data.msg));
        });
    },
}