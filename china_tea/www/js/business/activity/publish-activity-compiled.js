"use strict";

$(function () {
    //初始化加载元素
    business.activity.init();
});
var business = business || {};
business.activity = {
    isEditing: false,
    imgs: [],
    init: function init() {
        this.loadPage();
        this.loadDetails();
    },
    loadPage: function loadPage() {
        var url = Util.common.baseUrl + "/event/activityType/mobile/findEventActivityTypeListForMobile.do";
        var param = {};
        Util.common.executeAjaxCallback(url, param, function (data) {
            var datas = { "datas": data };
            $("#activityTypeId").html($("#activityType_t").tmpl(datas));
        });
    },
    loadDetails: function loadDetails() {
        var id = Util.common.getParameter("id");
        var that = this;
        if (id) {
            this.isEditing = true;
            $("textarea[name=title]").attr('disabled', true);
            $('#fabu').text('保存');
            var url = Util.common.baseUrl + "/event/eventActivity/mobile/findEventActivityByIdForMobile.do";
            var param = { "id": Util.common.getParameter("id") };
            Util.common.executeAjaxCallback(url, param, function (activityModel) {
                $('#activityType' + activityModel.activityTypeId).attr('checked', true);
                $("textarea[name=title]").val(activityModel.title);
                $("input[name=sponsorTel]").val(activityModel.sponsorTel);
                //beginTime	活动开始时间
                $("input[name=beginTime]").val(activityModel.beginTime);
                //endTime	活动结束时间
                $("input[name=endTime]").val(activityModel.endTime);
                //regEndTime	报名结束时间
                $("input[name=regEndTime]").val(activityModel.regEndTime);
                //numberLimit	人数限制
                $("input[name=numberLimit]").val(activityModel.numberLimit);
                $("input[name=activityAddress]").val(activityModel.activityAddress);
                $("textarea[name=content]").val(activityModel.content);
                that.imgs = activityModel.image.map(function (item) {
                    return {
                        url: item.picUrl
                    };
                });
                that.setImgs(that.imgs);
            });
        }
    },
    subimtBtn: function subimtBtn() {
        var activityModel = {};
        var userInfo = JSON.parse(localStorage.getItem("userInfo")).msg;
        var id = Util.common.getParameter("id");
        if (id) {
            activityModel.id = id;
        }
        //活动分类ID
        activityModel.activityTypeId = $("input[name=activityType]:checked").val();
        //活动部落名称
        // var activityTypeName = $("input[name=activityType]:checked+label").html();
        //  activityModel.activityTypeName = activityTypeName;
        //type	类型
        activityModel.type = '1';
        activityModel.subbranchId = userInfo.id;
        //typeName	类型名称
        //activityModel.typeName = '户外';
        //标题
        activityModel.title = $("textarea[name=title]").val();
        //sponsorName	主办方名称
        activityModel.sponsorName = userInfo.name;
        //sponsorTel	主办方联系方式
        activityModel.sponsorTel = $("input[name=sponsorTel]").val();
        //beginTime	活动开始时间
        var beginTime = $("input[name=beginTime]").val() + ':00';
        activityModel.beginTime = beginTime;
        //endTime	活动结束时间
        activityModel.endTime = $("input[name=endTime]").val() + ':00';
        //regStartTime	报名开始时间
        activityModel.regStartTime = beginTime;
        //regEndTime	报名结束时间
        activityModel.regEndTime = $("input[name=regEndTime]").val() + ':00';
        //numberLimit	人数限制
        activityModel.numberLimit = $("input[name=numberLimit]").val();
        //activityStatus	活动状态
        //s   var activityStatus = 0;
        //   activityModel.activityStatus = activityStatus;
        //activityStatusName	活动状态名称
        //   activityModel.activityStatusName = '待审核';
        //statusName	状态名称
        //    activityModel.statusName = '待审核';
        //activityPic	图片ID
        activityModel.activityPic = this.imgs;
        //图片组
        //activityAddress	活动地址
        activityModel.activityAddress = $("input[name=activityAddress]").val();
        //activityLongitude	活动经度
        //activityModel.activityLongitude = '1';
        //activityLatitude	活动纬度
        //activityModel.activityLatitude = '1';
        //activityModel.activityLoLa = '117.227194,24.71772';
        //createAddress	创建地址
        //activityModel.createAddress = '1';
        //createLongitude	创建经度
        //activityModel.createLongitude = '1';
        //createLatitude	创建纬度
        //activityModel.createLatitude = '1';
        //content	介绍
        activityModel.content = $("textarea[name=content]").val();
        //participation	报名人数
        //activityModel.participation = '1';
        var url = Util.common.baseUrl + "/event/eventActivity/mobile/saveForMobile.do";
        var param = { "modelJson": JSON.stringify(activityModel) };
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.success == true) {
                history.back();
            } else {
                Util.msg.show("msgId", data.msg);
            }
        });
    },
    setImgs: function setImgs(imgs) {
        $('#activityImgs').html($("#activity_imgs").tmpl(imgs));
    },
    chooseImage: function chooseImage() {
        var imgs = this.imgs;
        var that = this;
        window.setHeadImg = function (url) {
            if (url) {
                imgs.push({
                    url: url
                });
                that.setImgs(imgs);
            }
        };
        Util.na.invoke('imageChoose', '1', function (url) {
            if (url) {
                imgs.push({
                    url: url
                });
                that.setImgs(imgs);
            }
        });
    }
};

//# sourceMappingURL=publish-activity-compiled.js.map