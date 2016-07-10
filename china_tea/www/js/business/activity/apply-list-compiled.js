"use strict";

$(function () {
    //初始化加载元素
    business.activityApplyList.init();
});
var business = business || {};
business.activityApplyList = {
    limit: 6, //默认一次加载6条
    start: 0, //默认为1
    init: function init() {
        this.loadList();
    },
    //初始化加载收藏列表
    loadList: function loadList() {
        var url = Util.common.baseUrl + "/event/eventActivitySignUp/weixin/eventActivityUserPage.do";
        var param = {
            "conditionStr": '{"eventActivityId":' + Util.common.getParameter("id") + '}',
            "start": this.start,
            "limit": this.limit
        };
        this.executeAjax(url, param, "#thelist", "#activityApply_list_t");
    },
    executeAjax: function executeAjax(url, param, render, templateId) {
        Util.common.executeAjaxCallback(url, param, function (data) {

            if (data.resultList.length > 0) {
                data.resultList.forEach(function (item) {
                    item.createTime = item.createTime ? item.createTime.slice(0, 10) : '';
                });
                $(render).html($(templateId).tmpl(data.resultList));
            } else {
                $("#thelist").html('<li><div style="text-align: center;color:  #999999;margin-top: 8rem;"> 没有数据了</div></li>');
            }
        });
    },
    showMap: function showMap(longitude, latitude) {
        alert(longitude + "," + latitude);
    }
};

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function () {
    loaded("activityApplyList");
}, false);
var myScroll;
//下拉刷新
function pullDownAction() {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction() {
    var url = Util.common.baseUrl + "/event/eventActivitySignUp/weixin/eventActivityUserPage.do";

    var param = {
        "conditionStr": '{"eventActivityId":' + Util.common.getParameter("id") + '}',
        "start": business.activityApplyList.start + business.activityApplyList.limit,
        "limit": this.limit
    };
    Util.common.executeAjaxCallback(url, param, function (data) {
        if (data.resultList.length > 0) {
            data.resultList.forEach(function (item) {
                item.createTime = item.createTime ? item.createTime.slice(0, 10) : '';
            });
            $('#thelist').html($('#activityApply_list_t').tmpl(data.resultList));
            business.activityApplyList.start += business.activityApplyList.limit;
        }
        myScroll.refresh(); //调用刷新页面myScroll.refresh();
    });
}

//# sourceMappingURL=apply-list-compiled.js.map