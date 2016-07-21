/**
 * Created by Administrator on 2016/7/20.
 */
$(function(){
    $('.sy-richang .sy-item').on('click', function(){
        $(this).parent().find('.sy-item-active').removeClass('sy-item-active');
        $(this).addClass('sy-item-active');
        if($(this).hasClass('sy-item-ing')) {
            customer.hudong.initListIng();
        } else {
            customer.hudong.initListClose();
        }
    });
});
var param = {
    "page": 1,
    "limit": 6,
    "start": 0
};

var customer = customer || {};
customer.hudong = {
    //课程详情
    goDetail: function(obj){
        document.location.href = 'dy-detail.html?id=' + $(obj).attr('id');
    },
    //-进行中
    initListIng: function(){
        var url = Util.common.baseUrl + "activityInfo/listActivitiesByConditions.do";
        $.extend(param, {
            "status": 1
        });
        Util.common.executeGetAjaxCallback(url, param, function(data){
            if(data.success == true){
                var temp = data.entities.activityInfos;
                var ps = [], result = [];
                for(var i=0,len=temp.length;i<len;i++) {
                    var p  = temp[i].photos.split(',');
                    ps.push(p[0]);
                    temp[i].img_src = Util.common.getImg(p[0]);
                    result.push(temp[i]);
                }
                console.log(result);
                if(result == "" || result == null) {
                    $('#sy-rc-list').empty().append($empty);
                } else {
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", result);
                }
            }
        });
    },
    //-已关闭
    initListClose: function() {
        var url = Util.common.baseUrl + "activityInfo/listActivitiesByConditions.do";
        $.extend(param, {
            "status": 0
        });
        Util.common.executeGetAjaxCallback(url, param, function(data){
            if(data.success == true){
                var temp = data.entities.activityInfos;
                var ps = [], result = [];
                for(var i=0,len=temp.length;i<len;i++) {
                    var p  = temp[i].photos.split(',');
                    ps.push(p[0]);
                    temp[i].img_src = Util.common.getImg(p[0]);
                    result.push(temp[i]);
                }
                console.log(result);
                if(result == "" || result == null) {
                    $('#sy-rc-list').empty().append($empty);
                } else {
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", result);
                }
            }
        });
    },
    //初始化详情
    initDetail: function(){
        var url = Util.common.baseUrl + "activityInfo/getById.do";
        var param = {
            "id": Util.common.getParameter('id')
        };
        Util.common.executeAjaxCallback(url, param, function(result){
            var temp = result.entities.activityInfo;
            var p  = temp.photos.split(',');

            temp.img_src = Util.common.getImg(p[0]);

            Util.common.loadTemplate("#rc-detail", "#rc-detail-t", temp);

            $('.detail-want').on('click', function(){
                $('.box-mask').show();
                $('.form-submit').on('click', function () {
                    customer.hudong.wantJoin();
                });
            });
            $('.box-mask').on('click', function(e){
                var $target = $(e.target);
                if(!$target.is('.edit-box') && !$target.is('.edit-title') && !$target.is('input') && !$target.is('.form-submit')) {
                    $('.box-mask').hide();
                }
            });
        });
    },
    //报名
    wantJoin: function(){
        var url = Util.common.baseUrl + "activityInfo/sign.do";

        var name = $('#name').val();
        var phone = $('#phone').val();
        var number = $('#number').val();
        if(name == null || name == ""){
            Util.msg.show('msgId', "请输入姓名!");
            $('#name').focus();
        } else if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
            Util.msg.show('msgId',"手机号码有误，请重填");
            $('#phone').focus();
        } else if(number == null || number == "" || number == 0){
            Util.msg.show('msgId', "请输入大于0的报名人数!");
            $('#number').focus();
        }else {
            var param = {
                "curriculumId": Util.common.getParameter("id"),
                "contactUser": name,   //联系人
                "contactTel": phone,    //联系方式
                "signNum": number,       //报名人数
                "status": ""         //报名状态
            };
            Util.common.executeAjaxCallback(url, param, function(data){
                console.log(data);
                if(data.success == true) {
                    $('.box-mask').hide();
                    Util.msg.show("msgId", data.msg);
                } else {
                    Util.msg.show("msgId", "请确认输入信息!");
                }
            });
        }
    }
};