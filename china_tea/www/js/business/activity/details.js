$(function () {
    //初始化加载元素
    business.activityDetails.init();

});

var business = business || {};
business.activityDetails = {
    start: 0,
    limit: 6,
    content: null,
    init: function () {
        var isShared = Util.common.getParameter("isShared");
        if (isShared) {
            $('#register').show();
        }
        this.loadDetails();
        this.loadComment();

    },
    //初始化加载
    loadDetails: function () {
        var url = Util.common.baseUrl + "/event/eventActivity/mobile/findEventActivityByIdForMobile.do";
        var param = {"id": Util.common.getParameter("id")};
        var canEdit = Util.common.getParameter("canEdit");
        var that = this;
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (canEdit) {
                data.canEdit = true;
            }
            that.content = data;
            $("#detailsId").html($("#activity_details_t").tmpl(data));
            $("#slider-content .slides").html($("#activity_images_t").tmpl(data));
            $("#slider-content").flexslider({
                slideshowSpeed: 4000, //展示时间间隔ms
                animationSpeed: 800, //滚动时间ms
                height: 100,
                touch: true, //是否支持触屏滑动
                slideshow: true
            });
        });
    },
    loadComment: function () {
        var url = Util.common.baseUrl + "/event/eventActivityComment/weixin/eventActivityCommentPage.do";
        var param = {
            "conditionStr": '{"eventActivityId":' + Util.common.getParameter("id") + '}',
            "start": this.start,
            "limit": this.limit
        };
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data && data.resultList) {
                data.resultList.forEach(function (item) {
                    item.createTime = item.createTime ? item.createTime.slice(0, 10) : '';
                });
                $("#commentId").html($("#activity_comment_t").tmpl(data.resultList));
            }
        });
    },
    showMap: function (address) {
        document.location.href = 'html/business/activity/activity-map.html?address=' + address;
    },
    register: function () {
        var model = {};
        var url = Util.common.baseUrl + "/event/eventActivitySignUp/weixin/signUp.do";
        model.eventActivityId = this.content.id;
        model.tel = $("#public_comment_text").val();
        model.eventActivityUserinfo =Util.common.getParameter("userId") || '';
        var param = {"modelJson": JSON.stringify(model)};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.success == true) {
                Util.msg.show("msgId", '报名成功');
            }else{
                Util.msg.show("msgId", data.msg);
            }
        });
    },
    publishComment: function () {
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //console.log(userInfo);
        var userId = userInfo.msg.id;
        var model = {};
        model.userId = userId;
        model.content = $("#public_comment_text").val();
        model.activityId = $("#bm_activity_id").val();
        var url = Util.common.baseUrl + "/event/eventActivityPoint/weixin/comment.do";
        var param = {"modelJson": JSON.stringify(model)};
        Util.common.executeAjaxCallback(url, param, function (data) {
            Util.msg.show("msgId", data.msg);
            if (data.success == true) {

            }
        });
    }
}
