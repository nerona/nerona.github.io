"use strict";

$(function () {
    business.customerJudge.init();
});

var business = business || {};
business.customerJudge = {
    //初始化加载元素
    init: function init() {
        var id = Util.common.getParameter("id");
        this.loadPage(id);
    },
    loadPage: function loadPage(id) {
        var url = Util.common.baseUrl + "/mobile/good/getGoodDetail.do";
        var param = { "goodId": id };
        var that = this;
        Util.common.executeAjaxCallback(url, param, function (data) {
            data.scores = that.numToArr(data.score);
            data.goodEvaluationList.forEach(function (item) {
                item.scores = that.numToArr(item.score);
            });
            $(".customer-judge-main").html($("#goodEvaluation_t").tmpl(data));
        });
    },
    numToArr: function numToArr(num) {
        var result = [];
        if (num) {
            num = Math.round(num);
            result.length = num;
        }
        return result;
    }
};

//# sourceMappingURL=customer-judge-compiled.js.map