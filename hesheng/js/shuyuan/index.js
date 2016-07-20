/**
 * Created by dell on 2016/6/16.
 */
$(function(){
    $('.sy-richang .sy-item').on('click', function(){
        $(this).parent().find('.sy-item-active').removeClass('sy-item-active');
        $(this).addClass('sy-item-active');
        if($(this).hasClass('sy-item-ing')) {
            customer.book.initDailyIng();
        } else {
            customer.book.initDailyClose();
        }
    });
});

var param = {
    "page": 1,
    "limit": 10,
    "start": 0
};
//
var $empty = $('<li class="empty-list"><img src="./../../images/ts_ygq.png" alt=""><p>暂无相关课程</p><p>看看其他课程吧~</p></li>');

var customer = customer || {};
customer.book = {
    //课程详情
    goCourseDetail: function(obj){
        document.location.href = 'rc-detail.html?id=' + $(obj).attr('id');
    },
    //课程详情
    goSpecialCourseDetail: function(obj){
        document.location.href = 'ts-detail.html?id=' + $(obj).attr('id');
    },
    //平台详情
    goPlatformDetail: function(obj){
        document.location.href = 'pf-detail.html?id=' + $(obj).attr('id');
    },
    //课程-进行中
    initDailyIng: function(){
        var url = Util.common.baseUrl + "curriculumInfo/listCurriculumInfoByConditions.do";
        Util.common.executeGetAjaxCallback(url, param, function(data){
            if(data.success == true){
                var temp = data.entities.curriculumInfos;
                var ps = [], resultNormal = [], resultSpecial = [];
                for(var i=0,len=temp.length;i<len;i++) {
                    var t = temp[i].beginDate.split(' ');
                    var p  = temp[i].photos.split(',');
                    temp[i].date = t[0];
                    ps.push(p[0]);
                    //
                    var endTime = parseInt(temp[i].endDate);
                    var now = new Date().getTime();
                    var diff = endTime - now;

                    temp[i].img_src = Util.common.getImg(p[0]);

                    if(diff > 0) {
                        if(temp[i].category == 1) {
                            resultNormal.push(temp[i]);
                        } else {
                            resultSpecial.push(temp[i]);
                        }
                    }
                }

                if (Util.common.getParameter('type') == "normal") {
                    console.log(resultNormal);
                    if(resultNormal == "" || resultNormal == null) {
                        $('#sy-rc-list').empty().append($empty);
                    } else {
                        Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", resultNormal);
                    }

                } else if(Util.common.getParameter('type') == "special") {
                    console.log(resultSpecial);
                    if(resultSpecial == "" || resultSpecial == null) {
                        $('#sy-rc-list').empty().append($empty);
                    } else {
                        Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", resultSpecial);
                    }
                }
            }
        });
    },
    //课程-已关闭
    initDailyClose: function() {
        var url = Util.common.baseUrl + "curriculumInfo/listCurriculumInfoByConditions.do";
        Util.common.executeGetAjaxCallback(url, param, function(data){
            if(data.success == true){
                var temp = data.entities.curriculumInfos;

                var ps = [], resultNormal = [], resultSpecial = [];
                for(var i=0,len=temp.length;i<len;i++) {
                    var t = temp[i].endDate.split(' ');
                    var p  = temp[i].photos.split(',');
                    temp[i].date = t[0];
                    ps.push(p[0]);

                    var endTime = parseInt(temp[i].endDate);
                    var now = new Date().getTime();
                    var diff = endTime - now;

                    temp[i].img_src = Util.common.getImg(p[0]);

                    if(diff < 0) {
                        if(temp[i].category == 1) {
                            resultNormal.push(temp[i]);
                        } else {
                            resultSpecial.push(temp[i]);
                        }
                    }
                }
                if (Util.common.getParameter('type') == "normal") {
                    console.log(resultNormal);
                    if(resultNormal == "" || resultNormal == null) {
                        $('#sy-rc-list').empty().append($empty);
                    } else {
                        Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", resultNormal);
                    }

                } else if(Util.common.getParameter('type') == "special") {
                    console.log(resultSpecial);
                    if(resultSpecial == "" || resultSpecial == null) {
                        $('#sy-rc-list').empty().append($empty);
                    } else {
                        Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", resultSpecial);
                    }
                }
            }
        });
    },
    //初始化课程详情
    initDetailNormal: function(){
        var url = Util.common.baseUrl + "curriculumInfo/getById.do";
        var param = {
            "id": Util.common.getParameter('id'),
            "userId": localStorage.getItem("userId")
        };
        Util.common.executeAjaxCallback(url, param, function(result){
            console.log(result.entities.curriculumInfo);
            var temp = result.entities.curriculumInfo;
            var p  = temp.photos.split(',');

            temp.img_src = Util.common.getImg(p[0]);
            
            Util.common.loadTemplate("#rc-detail", "#rc-detail-t", temp);

            $('.detail-want').on('click', function(){
                $('.box-mask').show();
                $('.form-submit').on('click', function () {
                    customer.book.wantJoin();
                    $('.box-mask').hide();
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
    //初始化议事平台
    initPlatform: function(){
        var url = Util.common.baseUrl + "procedureInfo/listProcedureInfoByPage.do";
        Util.common.executeGetAjaxCallback(url , param , function(data){
            console.log(data.entities.procedureInfos);
            Util.common.loadTemplate("#sy-platform-list", "#sy-platform-list-t", data.entities.procedureInfos);
        });
    },
    //初始化议事项目详情
    initPlatformDetail: function(){
        var url = Util.common.baseUrl + "procedureInfo/getById.do";
        var param = {
            "id": Util.common.getParameter('id'),
            "userId": localStorage.getItem('userId')
        };
        Util.common.executeAjaxCallback(url , param , function(data){
            console.log(data);
            Util.common.loadTemplate("#platform-detail", "#platform-detail-t", data.entities.procedureInfo);
        });
    },
    //课程报名
    wantJoin: function(){
        var url = Util.common.baseUrl + "curriculumInfo/sign.do";
        var param = {
            "curriculumId": Util.common.getParameter("id"),
            "contactUser": "",   //联系人
            "contactTel": "",    //联系方式
            "signNum": "",       //报名人数
            "status": ""         //报名状态
        };
        Util.common.executeAjaxCallback(url, param, function(data){
            console.log(data);
            if(data.success == true) {
                Util.msg.show("msgId", data.msg);
            } else {
                Util.msg.show("msgId", "请确认输入信息!");
            }
        });
    },
    //课程点赞
    support: function(){
        var url = Util.common.baseUrl + "curriculumInfo/supportActivity.do";
        var param = {
            "id": Util.common.getParameter('id'),
            "userId": localStorage.getItem('userId')
        };
        Util.common.executeAjaxCallback(url, param, function(result){
            console.log(result);
        });
    },
    //议事评论
    addComment: function(){
        var url = Util.common.baseUrl + "commentInfo/addNewComment.do";
        var param = {
            "procedureId": Util.common.getParameter('id'),
            "userId": localStorage.getItem('userId'),
            "content": $('#word').val(),
            "commentDate": new Date(),
            "pid": "",    //回复评论id
            "remark": ""   //备注
        };
        console.log(param);
       /* Util.common.executeAjaxCallback(url, param, function(result){
            console.log(result);
        });*/
    }
};