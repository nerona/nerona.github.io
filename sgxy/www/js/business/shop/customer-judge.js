$(function(){
    business.customerJudge.init();
});

var business = business || {};
business.customerJudge = {
    //初始化加载元素
    init:function() {
        var id = Util.common.getParameter("id");
        this.loadPage(id);
    },
    loadPage:function(id) {
        var url = Util.common.baseUrl + "/mobile/good/getGoodDetail.do";
        var param = {"goodId": id};
        Util.common.executeAjaxCallback(url, param, function (data) {
            $(".customer-judge-main").html($("#goodEvaluation_t").tmpl(data));
        });
    }
}