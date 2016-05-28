$(function() {
    //初始化加载元素
    business.activityDetails.init();

});
var business = business || {};
business.activityDetails={
    start:1,
    limit:6,
    init:function(){
        this.loadDetails();
        this.loadComment();

    },
    //初始化加载
    loadDetails:function(){
        var url = Util.common.baseUrl +"/event/eventActivity/mobile/findEventActivityByIdForMobile.do";
        var param = {"id":Util.common.getParameter("id")};
        Util.common.executeAjaxCallback(url ,param,function(data){
            $("#detailsId").html($("#activity_details_t").tmpl(data));
            $("#slider-content .slides").html($("#activity_images_t").tmpl(data));
            $("#slider-content").flexslider({
                slideshowSpeed: 4000, //展示时间间隔ms
                animationSpeed: 800, //滚动时间ms
                height:100,
                touch: true, //是否支持触屏滑动
                slideshow: true
            });
       });
    },
    loadComment:function(){
        var url = Util.common.baseUrl +"/event/eventActivityComment/weixin/eventActivityCommentPage.do";
        var param = {"conditionStr":'{"eventActivityId":'+Util.common.getParameter("id")+'}',"start":this.start,"limit":this.limit};
       Util.common.executeAjaxCallback(url ,param,function(data){
            $("#commentId").html($("#activity_comment_t").tmpl(data.resultList));
       });
    },
    showMap:function(longitude,latitude){
        alert(longitude+","+latitude);
    },
    publishComment: function () {
        var userInfo =  JSON.parse(localStorage.getItem("userInfo"));
        //console.log(userInfo);
        var userId = userInfo.msg.id;
        var model = {};
        model.userId = userId;
        model.content = $("#public_comment_text").val();
        model.activityId = $("#bm_activity_id").val();
        var url = Util.common.baseUrl+"/event/eventActivityPoint/weixin/comment.do";
        var param = {"modelJson":JSON.stringify(model)};
        Util.common.executeAjaxCallback(url ,param,function(data){
            Util.msg.show("msgId", data.msg);
            if(data.success==true){

            }
        });
    }
}
