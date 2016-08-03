/**
 * Created by Administrator on 2016/7/21.
 */
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
    customer.platform.loadMore();
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

var customer = customer || {};
customer.platform = {
    //课程详情
    goDetail: function (obj) {
        document.location.href = 'pf-detail.html?id=' + $(obj).attr('id');
    },
    //-init
    initList: function () {
        var url = Util.common.baseUrl + "procedureInfo/listProcedureInfoByPage.do";

        var $empty = $('<li class="empty-list"><img src="./../../images/ts_ygq.png" alt=""><p>暂无相关议事~</p></li>');

        Util.common.executeGetAjaxCallback(url, param, function (data) {
            if (data.success == true) {
                var temp = data.entities.procedureInfos;
                var result = [];
                for (var i = 0, len = temp.length; i < len; i++) {
                    if(temp[i].photos == null) {
                        temp[i].img_src = './../../images/default.jpg';
                    } else {
                        var p = getFirst(temp[i].photos);
                        console.log(p[0]);

                        temp[i].img_src = Util.common.getImg(p[0]);
                    }

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
        var url = Util.common.baseUrl + "procedureInfo/getById.do";
        var param = {
            "id": Util.common.getParameter('id')
        };
        Util.common.executeAjaxCallback(url , param , function(data){
            var result = data.entities.procedureInfo;
            if(result.photos == null) {
                result.length = 1;
                result.img_src = './../../images/default.jpg';
            } else {
                var p = getFirst(result.photos);
                console.log(p.length);
                result.length = p.length;
                if(p.length > 1) {
                    var ts = [];
                    for(var x=0;x<p.length;x++) {
                        ts.push( Util.common.getImgHigh(p[x]));
                    }
                    result.img_src = ts;
                } else {
                    result.img_src = Util.common.getImgHigh(p[0]);
                }
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
                        customer.platform.initDetail();
                    }, 300);
                } else {
                    Util.msg.show("msgId", "请确定输入信息!");
                }
            });
        }
    },
    loadMore: function () {
        param.page++;
        param.start += 5;
        var url = Util.common.baseUrl + "procedureInfo/listProcedureInfoByPage.do";

        Loader.request(url, param, function (data) {
            if (data.success == true) {
                var temp = data.entities.procedureInfos;
                var result = [];
                for (var i = 0, len = temp.length; i < len; i++) {
                    var p = getFirst(temp[i].photos);
                    console.log(p);

                    temp[i].img_src = Util.common.getImg(p);

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
function FormatDate (strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
function getFirst(str) {
    var temp = [];
    if (str == null || str == '') {
        temp.push("/CurriculumInfo/23/3f11e760135949c8b6c1bd3c55edc447.png");
    } else if (str.indexOf(',') != -1) {
        temp = str.split(',');
    } else {
        temp.push(str);
    }
    return temp;
}