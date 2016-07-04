$(function () {
    //初始化加载元素
    business.activityList.init();
});
var business = business || {};
business.activityList = {
    limit: 6, //默认一次加载6条
    start: 0,//默认为1
    activityStatus: '1',
    init: function () {
        this.loadList();
    },
    //初始化加载收藏列表
    loadList: function (param) {
        var url = Util.common.baseUrl + "/event/eventActivity/mobile/findEventActivityForMobile.do";
        var conditionStr = {"activityStatus": this.activityStatus};
        param = param || {"start": this.start, "limit": this.limit};
        var id = Util.common.getParameter("id");
        if (id) {
            conditionStr.subbranchId = id;
        }
        param.conditionStr = JSON.stringify(conditionStr);
        this.executeAjax(url, param, "#thelist", "#activity_list_t");
    },
    executeAjax: function (url, param, render, templateId) {
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.resultList.length > 0) {
                $(render).html($(templateId).tmpl(data));
            } else {
                $("#thelist").html('<li><div style="text-align: center;color:  #999999;margin-top: 8rem;"> 没有数据了</div></li>');
            }
        });
    },
    queryByActivityStatus: function (status) {
        this.activityStatus = status;
        this.loadList();
    },
    showMap: function (longitude, latitude) {
        alert(longitude + "," + latitude);
    },
    toDetails: function (id, canEdit) {
        var href = 'html/business/activity/details.html?id=' + id + "&user=" + Util.common.getParameter("user");
        if (canEdit) {
            href = href + '&canEdit=true';
        }
        document.location.href = href;
    },
    showDelDialog: function (id) {
        var that = this;
        $("#my-activity-del-show").popup("open");
        this.del = function () {
            that._del(id);
        }
    },
    closeDelDialog: function () {
        $("#my-activity-del-show").popup("close");
    },
    del: function () {

    },
    _del: function (id) {
        var url = Util.common.baseUrl + '/event/eventActivity/mobile/delete.do';
        var param = {ids: id.toString()};
        var that = this;
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.success == true) {
                that.closeDelDialog();
                that.loadList();
            } else {
                Util.msg.show("msgId", data.msg);
            }
        });
    }
};
business.clickLike = function (id) {
    var url = Util.common.baseUrl + '/event/eventActivityPoint/weixin/point.do';
    var clickLikes = "click_lick_" + id;
    var type = $("#" + clickLikes).attr("types");
    if (type == '0') {
        $("#" + clickLikes).addClass("activity-dz-num-active");
        $("#" + clickLikes).attr("types", '1');
    } else {
        $("#" + clickLikes).removeClass("activity-dz-num-active");
        $("#" + clickLikes).attr("types", '0');
        url = Util.common.baseUrl + '/event/eventActivityPoint/weixin/cancelPoint.do';
    }
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //console.log(userInfo);
    var userId = userInfo.msg.id;
    var param = {"modelJson": JSON.stringify({"eventActivityId": id, "eventActivityUserinfo": userId})};
    Util.common.executeAjaxCallback(url, param, function (data) {
        Util.msg.show("msgId", data.msg);
        if (data.success == true) {
            history.back();
        }
    });
};

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function () {
    loaded("activityList")
}, false);
var myScroll;
//下拉刷新
function pullDownAction() {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction() {
    var url = Util.common.baseUrl + "/event/eventActivity/mobile/findEventActivityForMobile.do";
    var start = business.activityList.start + business.activityList.limit;
    var conditionStr = {"activityStatus": business.activityList.activityStatus};
    var param = {
        "start": business.activityList.start + business.activityList.limit,
        "limit": business.activityList.limit
    };
    var id = Util.common.getParameter("id");
    if (id) {
        conditionStr.subbranchId = id;
    }
    param.conditionStr = JSON.stringify(conditionStr);
    Util.common.executeAjaxCallback(url, param, function (data) {
        if (data.resultList.length > 0) {
            $('#thelist').append($('#activity_list_t').tmpl(data));
            business.activityList.start = start;
        }
        myScroll.refresh();		//调用刷新页面myScroll.refresh();
    });
}