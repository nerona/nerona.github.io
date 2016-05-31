$(function() {
    //初始化加载元素
    business.activity.init();

});
var business = business || {};
business.activity={
    init:function(){
        this.loadPage();
    },
    loadPage:function(){
        var url = Util.common.baseUrl +"/event/activityType/mobile/findEventActivityTypeListForMobile.do";
        var param = {};
        Util.common.executeAjaxCallback(url ,param,function(data){
            var datas = {"datas":data};
            $("#activityTypeId").html($("#activityType_t").tmpl(datas));
        });
    },
    subimtBtn:function(){
        var activityModel = {};
        //活动分类ID
        var activityTypeId = $("input[name=activityType]:checked").val();
        activityModel.activityTypeId = activityTypeId;
        //活动部落名称
       // var activityTypeName = $("input[name=activityType]:checked+label").html();
      //  activityModel.activityTypeName = activityTypeName;
        //type	类型
        activityModel.type = '1';
        activityModel.subbranchId='233210451701841920';
        //typeName	类型名称
        //activityModel.typeName = '户外';
        //标题
        var title = $("textarea[name=title]").val();
        activityModel.title = title;
        //sponsorName	主办方名称
        var userInfo =  JSON.parse(localStorage.getItem("userInfo"));
        console.log(userInfo);
        activityModel.sponsorName = '没有来源';
        //sponsorTel	主办方联系方式
        var sponsorTel = $("input[name=sponsorTel]").val();
        activityModel.sponsorTel = sponsorTel;
        //beginTime	活动开始时间
        var beginTime = $("input[name=beginTime]").val();
        activityModel.beginTime = beginTime;
        //endTime	活动结束时间
        var endTime = $("input[name=endTime]").val();
        activityModel.endTime = endTime;
        //regStartTime	报名开始时间
        activityModel.regStartTime = '2016-05-21 20:06:00';
        //regEndTime	报名结束时间
        var regEndTime = $("input[name=regEndTime]").val();
        activityModel.regEndTime = regEndTime;
        //numberLimit	人数限制
        var numberLimit = $("input[name=numberLimit]").val();
       activityModel.numberLimit = numberLimit;
        //activityStatus	活动状态
     //s   var activityStatus = 0;
     //   activityModel.activityStatus = activityStatus;
        //activityStatusName	活动状态名称
     //   activityModel.activityStatusName = '待审核';
        //statusName	状态名称
    //    activityModel.statusName = '待审核';
        //activityPic	图片ID
        activityModel.activityPic = [{"id": "0","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/14619223921554feeabe.png"}];
        activityModel.id="249385804616667137";
        //图片组
        //activityAddress	活动地址
        var activityAddress = $("input[name=activityAddress]").val();
        activityModel.activityAddress = activityAddress;
        //activityLongitude	活动经度
        activityModel.activityLongitude = '1';
        //activityLatitude	活动纬度
        activityModel.activityLatitude = '1';
        activityModel.activityLoLa ='117.227194,24.71772';
        //createAddress	创建地址
        activityModel.createAddress = '1';
        //createLongitude	创建经度
        activityModel.createLongitude = '1';
        //createLatitude	创建纬度
        activityModel.createLatitude = '1';
        //content	介绍
        var content = $("textarea[name=content]").val();
        activityModel.content = content;
        //participation	报名人数
        //activityModel.participation = '1';
        console.log(activityModel);
        var url = Util.common.baseUrl +"/event/eventActivity//mobile/saveForMobile.do";
     var param2 = '{"id":"249385804616667137","subbranchId":"233210451701841920","type":"1","title":"ggg","activityTypeId":"235838482342957056","sponsorName":"ggg","sponsorTel":"15280284215","beginTime":"2016-02-26 02:07:17","endTime":"2016-05-27 02:07:17","regStartTime":"2016-02-26 02:07:17","regEndTime":"2016-05-27 02:07:17","numberLimit":"30","activityAddress":"ddddd","activityLoLa":"117.227194,24.71772","content":"<p><img width=\"530\" height=\"340\" src=\"http://api.map.baidu.com/staticimage?center=116.404,39.915&zoom=10&width=530&height=340&markers=116.404,39.915\"/></p>","activityPic":[{"id":"249385804650221568","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/1464199669673933da24.jpg"}],"activityLongitude":"117.227194","activityLatitude":"24.71772"}';
      // var param = {"modelJson" : JSON.stringify(activityModel)};
       var param = {"modelJson" : param2};
        Util.common.executeAjaxCallback(url ,param,function(data){
            Util.msg.show("msgId", data.msg);
            if(data.success==true){
                history.back();
            }
        });
    }
}
