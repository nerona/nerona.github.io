/**
 * Created by dell on 2016/6/16.
 */
var myScroll;// 引用滑动分页需定义此固定变量myScroll，下拉时刷新使用
/**
 * 下拉刷新 （自定义实现此方法）
 * 此处用延迟模拟数据，
 */
function pullDownAction() {
    /**
     *此处填写加载后台数据代码
     * 结束处记得要调用刷新myScroll.refresh();
     **/
    myScroll.refresh();
}
/**
 * 滚动翻页 （自定义实现此方法）
 */
function pullUpAction() {
    customer.book.loadMore();
}
var Loader = {
    isLoading:false,
    request:function(url,data,cb){
        var loader = this;
        if(loader.isLoading){
            return;
        }
        loader.isLoading = true;
        Util.common.executeGetAjaxCallback(url,data,function(){
            loader.isLoading = false;
            cb.apply(null,arguments);
        });
    }
};

$(function(){
    customer.book.init();

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
    "limit": 5,
    "start": 0
};
//
var $empty = $('<div class="empty-list"><img src="./../../images/ts_ygq.png" alt=""><p>暂无相关课程</p><p>看看其他课程吧~</p></div>');

var customer = customer || {};
customer.book = {
    init: function(){
        $('#scroller').css("transform", "translate(0px,0px)");
    },
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
        this.init();
        param.page = 1;
        param.start = 0;
        var url = Util.common.baseUrl + "curriculumInfo/listCurriculumInfoByConditions.do";
        $.extend(param, {
            "category": 1,
            "status": 1
        });
        Util.common.executeGetAjaxCallback(url, param, function(data){
            if(data.success == true){
                var temp = data.entities.curriculumInfos;
                var result = [];
                for(var i=0,len=temp.length;i<len;i++) {
                    var p = getFirst(temp[i].photos);
                    console.log(p);

                    temp[i].img_src = Util.common.getImg(p);

                    temp[i]. date = temp[i].endDate.split(" ")[0];
                    result.push(temp[i]);
                }
                console.log(result);
                if(result == "" || result == null) {
                    $("#sy-rc-list").empty();
                    $('#wrapper').append($empty);
                } else {
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", result);
                }
            }
        });
    },
    //日常课程-已关闭
    initDailyClose: function() {
        this.init();
        param.page = 1;
        param.start = 0;
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
                    var p = getFirst(temp[i].photos);
                    console.log(p);

                    temp[i].img_src = Util.common.getImg(p);
                    temp[i]. date = temp[i].endDate.split(" ")[0];

                    result.push(temp[i]);
                }
                console.log(result);
                if(result == "" || result == null) {
                    $("#sy-rc-list").empty();
                    $('#wrapper').append($empty);
                } else {
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", result);
                }
            }
        });
    },
    //特色课程-进行中
    initSpecialIng: function(){
        this.init();
        param.page = 1;
        param.start = 0;
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
                    var p = getFirst(temp[i].photos);
                    console.log(p);

                    temp[i].img_src = Util.common.getImg(p);
                    temp[i]. date = temp[i].endDate.split(" ")[0];

                    result.push(temp[i]);
                }
                console.log(result);
                if(result == "" || result == null) {
                    $("#sy-rc-list").empty();
                    $('#wrapper').append($empty);
                } else {
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", result);
                }
            }
        });
    },
    //特色课程-已关闭
    initSpecialClose: function() {
        this.init();
        param.page = 1;
        param.start = 0;
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
                    var p = getFirst(temp[i].photos);
                    console.log(p);

                    temp[i].img_src = Util.common.getImg(p);
                    temp[i]. date = temp[i].endDate.split(" ")[0];

                    result.push(temp[i]);
                }
                console.log(result);
                if(result == "" || result == null) {
                    $("#sy-rc-list").empty();
                    $('#wrapper').append($empty);
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
            var p = getFirst(temp.photos);
            console.log(p);

            temp.img_src = Util.common.getImg(p);
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
                    Util.msg.show("msgId", data.msg);
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
    },
    loadMore: function(){
        param.page++;
        param.start += 5;
        var $level = $('.sy-richang');
        var url = Util.common.baseUrl + "curriculumInfo/listCurriculumInfoByConditions.do";
        //议事平台
        if($level.hasClass('sy-platform')) {
            url = Util.common.baseUrl + "procedureInfo/listProcedureInfoByPage.do";
            Loader.request(url , param , function(data){
                var result = data.entities.procedureInfos;

                for(var i=0,len=result.length;i<len;i++) {
                    var p = getFirst(result[i].photos);
                    console.log(p);

                    result[i].img_src = Util.common.getImg(p);
                }

                if(result == "" || result == null) {
                    $('.no-more').show();
                    setTimeout(function(){
                        $('.no-more').hide();
                    }, 1000);
                } else {
                    var tpl = $("#sy-rc-list-t").tmpl(result);
                    $("#sy-rc-list").append(tpl);
                }
            });
        } else {
            var $level2 = $('.sy-item-active');
            if($level.hasClass('sy-normal')){
                if($level2 .hasClass('sy-item-ing')){
                    $.extend(param, {
                        "category": 1,
                        "status": 1
                    });
                } else if($level2 .hasClass('sy-item-close')) {
                    $.extend(param, {
                        "category": 1,
                        "status": 0
                    });
                }
            } else if($level.hasClass('sy-special')) {
                if ($level2.hasClass('sy-item-ing')) {
                    $.extend(param, {
                        "category": 2,
                        "status": 1
                    });
                } else if ($level2.hasClass('sy-item-close')) {
                    $.extend(param, {
                        "category": 2,
                        "status": 0
                    });
                }
            }
            Loader.request(url, param, function (data) {
                if(data.success == true){
                    var temp = data.entities.curriculumInfos;
                    var ps = [], result = [];
                    for(var i=0,len=temp.length;i<len;i++) {
                        var p = getFirst(temp[i].photos);
                        console.log(p);

                        temp[i].img_src = Util.common.getImg(p);

                        temp[i]. date = temp[i].endDate.split(" ")[0];
                        result.push(temp[i]);
                    }
                    console.log(result);

                    if(result == "" || result == null) {
                        $('.no-more').show();
                        setTimeout(function(){
                            $('.no-more').hide();
                        }, 1000);
                    } else {
                        var tpl = $("#sy-rc-list-t").tmpl(result);
                        $("#sy-rc-list").append(tpl);
                    }
                }
                myScroll.refresh();		//调用刷新页面myScroll.refresh();
            });
        }

    }
};

function FormatDate (strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
function getFirst(str) {
    var temp;
    if(str == null || str == '') {
        temp = "/ProcedureInfo/21/1f715a26a7b741dfaa3348514b4ef399.png";
    } else if(str.indexOf(',') != -1) {
        temp = str.split(',')[0];
    } else {
        temp = str;
    }
    return temp;
}