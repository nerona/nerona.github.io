/**
 * Created by dell on 2016/6/16.
 */
$(function(){
    $('.sy-normal .sy-item').on('click', function(){
        $(this).parent().find('.sy-item-active').removeClass('sy-item-active');
        $(this).addClass('sy-item-active');
        if($(this).hasClass('sy-item-ing')) {
            customer.book.initDailyIng();
        } else {
            customer.book.initDailyClose();
        }
    });
    $('.sy-special .sy-item').on('click', function(){
        $(this).parent().find('.sy-item-active').removeClass('sy-item-active');
        $(this).addClass('sy-item-active');
        if($(this).hasClass('sy-item-ing')) {
            customer.book.initSpecialIng();
        } else {
            customer.book.initSpecialClose();
        }
    });
});

var param = {
    "page": 1,
    "limit": 6,
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
    //日常课程-进行中
    initDailyIng: function(){
        var url = Util.common.baseUrl + "curriculumInfo/listCurriculumInfoByConditions.do";
        $.extend(param, {
            "category": 1,
            "status": 1
        });
        Util.common.executeGetAjaxCallback(url, param, function(data){
            if(data.success == true){
                var temp = data.entities.curriculumInfos;
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
    //日常课程-已关闭
    initDailyClose: function() {
        var url = Util.common.baseUrl + "curriculumInfo/listCurriculumInfoByConditions.do";
        $.extend(param, {
            "category": 1,
            "status": 0
        });
        Util.common.executeGetAjaxCallback(url, param, function(data){
            if(data.success == true){
                var temp = data.entities.curriculumInfos;

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
    //特色课程-进行中
    initSpecialIng: function(){
        var url = Util.common.baseUrl + "curriculumInfo/listCurriculumInfoByConditions.do";
        $.extend(param, {
            "category": 2,
            "status": 1
        });
        Util.common.executeGetAjaxCallback(url, param, function(data){
            if(data.success == true){
                var temp = data.entities.curriculumInfos;
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
    //特色课程-已关闭
    initSpecialClose: function() {
        var url = Util.common.baseUrl + "curriculumInfo/listCurriculumInfoByConditions.do";
        $.extend(param, {
            "category": 2,
            "status": 0
        });
        Util.common.executeGetAjaxCallback(url, param, function(data){
            if(data.success == true){
                var temp = data.entities.curriculumInfos;

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
    //初始化课程详情
    initDetailNormal: function(){
        var url = Util.common.baseUrl + "curriculumInfo/getById.do";
        var param = {
            "id": Util.common.getParameter('id')
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
        var $empty = $('<li class="empty-list"><img src="./../../images/ts_ygq.png" alt=""><p>暂无相关活动~</p></li>');

        Util.common.executeGetAjaxCallback(url , param , function(data){
            var result = data.entities.procedureInfos;

            console.log(result);
            for(var i=0,len=result.length;i<len;i++) {
                if(result[i].photos == null) {
                    result[i].img_src = "./../../images/shuyuan/sy-rc-bigpic.png";
                } else {
                    result[i].img_src = Util.common.getImg(result[i].photos);
                }
            }

            if(result == "" || result == null) {
                $('#sy-platform-list').empty().append($empty);
            } else {
                Util.common.loadTemplate("#sy-platform-list", "#sy-platform-list-t", result);
            }
        });
    },
    //初始化议事项目详情
    initPlatformDetail: function(){
        var url = Util.common.baseUrl + "procedureInfo/getById.do";
        var param = {
            "id": Util.common.getParameter('id')
        };
        Util.common.executeAjaxCallback(url , param , function(data){
            var result = data.entities.procedureInfo;
            result.html = "<button>123</button>";
            if(result.photos == null) {
                result.img_src = "./../../images/shuyuan/sy-rc-bigpic.png";
            } else {
                result.img_src = Util.common.getImg(result.photos);
            }

            Util.common.loadTemplate("#platform-detail", "#platform-detail-t", result);

            console.log(result.commentInfoList);
            for(var i=0,len=result.commentInfoList.length;i<len;i++) {
                if(result.commentInfoList[i].remark == null) {
                    result.commentInfoList[i].remark =0;
                }
            }
            Util.common.loadTemplate("#comment-list", "#comment-list-t", result.commentInfoList);
        });
        var news_url = Util.common.baseUrl + "procedureInfo/listHotProcedureInfo.do";
        Util.common.executeGetAjaxCallback(news_url , param , function(data){
            Util.common.loadTemplate("#news-list", "#news-list-t", data.entities.procedureInfos);
        });
    },
    //课程报名
    wantJoin: function(){
        var url = Util.common.baseUrl + "curriculumInfo/sign.do";

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
    },
    //课程点赞
    support: function(){
        var url = Util.common.baseUrl + "curriculumInfo/supportActivity.do";
        var param = {
            "id": Util.common.getParameter('id')
        };
        Util.common.executeAjaxCallback(url, param, function(result){
            console.log(result);
        });
    },
    //议事评论
    addComment: function(){
        var url = Util.common.baseUrl + "commentInfo/addNewComment.do";

        var username = $('#username').val();
        var word = $('#word').val();
        if(username == null || username == '') {
            Util.msg.show('msgId', "请输入姓名!");
            $('#username').focus();
        } else if (word == null || word == '') {
            Util.msg.show('msgId', "请输入评论内容!");
            $('#word').focus();
        } else {
            var param = {
                "procedureId": Util.common.getParameter('id'),
                "userName": username,
                "content": word,
                "commentDate": FormatDate(new Date()),
                "pid": 0    //回复评论id
                //"remark": ""   //备注
            };
            console.log(param);
            Util.common.executeAjaxCallback(url, param, function(result){
                console.log(result);
                if(result.success == true) {
                    Util.msg.show("msgId", "评论成功!");
                    $('.box-mask').hide();
                    setTimeout(function(){
                        customer.book.initPlatformDetail();
                    }, 300);
                } else {
                    Util.msg.show("msgId", "请确定输入信息!");
                }
            });
        }
    }
};

function FormatDate (strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}