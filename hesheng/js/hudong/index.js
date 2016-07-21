/**
 * Created by Administrator on 2016/7/20.
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
    customer.hudong.loadMore();
}
var Loader = {
    isLoading: false,
    request: function (url, data, cb) {
        var loader = this;
        if (loader.isLoading) {
            return;
        }
        loader.isLoading = true;
        Util.common.executeGetAjaxCallback(url, data, function () {
            loader.isLoading = false;
            cb.apply(null, arguments);
        });
    }
};

$(function () {
    $('.sy-richang .sy-item').on('click', function () {
        $(this).parent().find('.sy-item-active').removeClass('sy-item-active');
        $(this).addClass('sy-item-active');
        customer.hudong.init();
        if ($(this).hasClass('sy-item-ing')) {
            customer.hudong.initListIng();
        } else {
            customer.hudong.initListClose();
        }
    });
});
var param = {
    "page": 1,
    "limit": 5,
    "start": 0
};
var $empty = $('<div class="empty-list"><img src="./../../images/ts_ygq.png" alt=""><p>暂无相关活动~</p></div>');

var customer = customer || {};
customer.hudong = {
    init: function(){
        $('#scroller').css("transform", "translate(0px,0px)");
    },
    //课程详情
    goDetail: function (obj) {
        document.location.href = 'dy-detail.html?id=' + $(obj).attr('id');
    },
    //-进行中
    initListIng: function () {
        param.page = 1;
        param.start = 0;
        var url = Util.common.baseUrl + "activityInfo/listActivitiesByConditions.do";
        $.extend(param, {
            "status": 1
        });
        Util.common.executeGetAjaxCallback(url, param, function (data) {
            if (data.success == true) {
                var temp = data.entities.activityInfos;
                var result = [];
                for (var i = 0, len = temp.length; i < len; i++) {
                    var p = getFirst(temp[i].photos);
                    console.log(p);

                    temp[i].img_src = Util.common.getImg(p);

                    temp[i].date = temp[i].endDate.split(" ")[0];
                    result.push(temp[i]);
                }
                console.log(result);
                if (result == "" || result == null) {
                    $("#sy-rc-list").empty();
                    $('#wrapper').append($empty);
                } else {
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", result);
                }
            }
        });
    },
    //-已关闭
    initListClose: function () {
        var url = Util.common.baseUrl + "activityInfo/listActivitiesByConditions.do";
        $.extend(param, {
            "status": 0
        });
        Util.common.executeGetAjaxCallback(url, param, function (data) {
            if (data.success == true) {
                var temp = data.entities.activityInfos;
                var result = [];
                for (var i = 0, len = temp.length; i < len; i++) {
                    var p = getFirst(temp[i].photos);
                    console.log(p);

                    temp[i].img_src = Util.common.getImg(p);

                    temp[i].date = temp[i].endDate.split(" ")[0];
                    result.push(temp[i]);
                }
                console.log(result);
                if (result == "" || result == null) {
                    $("#sy-rc-list").empty();
                    $('#wrapper').append($empty);
                } else {
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", result);
                }
            }
        });
    },
    //初始化详情
    initDetail: function () {
        var url = Util.common.baseUrl + "activityInfo/getById.do";
        var param = {
            "id": Util.common.getParameter('id')
        };
        Util.common.executeAjaxCallback(url, param, function (result) {
            var temp = result.entities.activityInfo;
            var p = getFirst(temp.photos);
            console.log(p);

            temp.img_src = Util.common.getImg(p);

            Util.common.loadTemplate("#rc-detail", "#rc-detail-t", temp);

            $('.detail-want').on('click', function () {
                $('.box-mask').show();
                $('.form-submit').on('click', function () {
                    customer.hudong.wantJoin();
                });
            });
            $('.box-mask').on('click', function (e) {
                var $target = $(e.target);
                if (!$target.is('.edit-box') && !$target.is('.edit-title') && !$target.is('input') && !$target.is('.form-submit')) {
                    $('.box-mask').hide();
                }
            });
        });
    },
    //报名
    wantJoin: function () {
        var url = Util.common.baseUrl + "activityInfo/sign.do";

        var name = $('#name').val();
        var phone = $('#phone').val();
        var number = $('#number').val();
        if (name == null || name == "") {
            Util.msg.show('msgId', "请输入姓名!");
            $('#name').focus();
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            Util.msg.show('msgId', "手机号码有误，请重填");
            $('#phone').focus();
        } else if (number == null || number == "" || number == 0) {
            Util.msg.show('msgId', "请输入大于0的报名人数!");
            $('#number').focus();
        } else {
            var param = {
                "curriculumId": Util.common.getParameter("id"),
                "contactUser": name,   //联系人
                "contactTel": phone,    //联系方式
                "signNum": number,       //报名人数
                "status": ""         //报名状态
            };
            Util.common.executeAjaxCallback(url, param, function (data) {
                console.log(data);
                if (data.success == true) {
                    $('.box-mask').hide();
                    Util.msg.show("msgId", data.msg);
                } else {
                    Util.msg.show("msgId", data.msg);
                }
            });
        }
    },
    loadMore: function () {
        param.page++;
        param.start += 5;
        var url = Util.common.baseUrl + "activityInfo/listActivitiesByConditions.do";

        Loader.request(url, param, function (data) {
            if (data.success == true) {
                var temp = data.entities.activityInfos;
                var result = [];
                for (var i = 0, len = temp.length; i < len; i++) {
                    var p = getFirst(temp[i].photos);
                    console.log(p);

                    temp[i].img_src = Util.common.getImg(p);

                    temp[i].date = temp[i].endDate.split(" ")[0];
                    result.push(temp[i]);
                }

                if (result == "" || result == null) {
                    $('.no-more').show();
                    setTimeout(function () {
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
};

function getFirst(str) {
    var temp;
    if (str == null || str == '') {
        temp = "/ProcedureInfo/21/1f715a26a7b741dfaa3348514b4ef399.png";
    } else if (str.indexOf(',') != -1) {
        temp = str.split(',')[0];
    } else {
        temp = str;
    }
    return temp;
}