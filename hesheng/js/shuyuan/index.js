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
    "limit": 12,
    "start": 0
};

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
                    var t = temp[i].endDate.split(' ');
                    var p  = temp[i].photos.split(',');
                    temp[i].date = t[0];
                    ps.push(p[0]);
                    //
                    var beginTime = parseInt(temp[i].beginDate);
                    var endTime = parseInt(temp[i].endDate);
                    var now = new Date().getTime();
                    var diff = endTime - now;
                    var diff2 = beginTime - now;
                    //未开始是否进行中
                    //if(diff > 0 && diff2 < 0) {
                    if(temp[i].category == 1) {
                        resultNormal.push(temp[i]);
                    } else {
                        resultSpecial.push(temp[i]);
                    }
                    //}
                }
                Util.common.getImg(ps[0]);
                if (Util.common.getParameter('type') == "normal") {
                    console.log(resultNormal);
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", resultNormal);
                } else if(Util.common.getParameter('type') == "special") {
                    console.log(resultSpecial);
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", resultSpecial);
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

                    if(diff < 0) {
                        if(temp[i].category == 1) {
                            resultNormal.push(temp[i]);
                        } else {
                            resultSpecial.push(temp[i]);
                        }
                    }
                }
                //Util.common.getImg(ps[0]);
                if (Util.common.getParameter('type') == "normal") {
                    console.log(resultNormal);
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", resultNormal);
                } else if(Util.common.getParameter('type') == "special") {
                    console.log(resultSpecial);
                    Util.common.loadTemplate("#sy-rc-list", "#sy-rc-list-t", resultSpecial);
                }
            }
        });
    },
    //初始化课程详情
    initDetailNormal: function(){
        var data = {
                "img": "./../../images/shuyuan/sy-rc-bigpic.png",
                "title": "清洁无人管，居民叫苦清洁员喊难。",
                "number": 321,
                "share": 15,
                "location": "鼓浪屿中华城",
                "time": "2016-1-12",
                "endTime": "2016-12-12",
                "type": "养老活动",
                "telephone": "10010",
                "host": "莲前社区居委会",
                "content": "装修合同就是为了房屋装修而签订的合同。这个合同是依照《中华人民共和国合同法》及有关法律、法规的规定，结合家庭居室装饰装修工程施工的实际情况",
                "status": 0
        };
        //Util.common.loadTemplate("#rc-detail", "#rc-detail-t", data);

        var url = Util.common.baseUrl + "curriculumInfo/getById.do";
        var param = {
            "id": Util.common.getParameter('id'),
            "userId": localStorage.getItem("userId")
        };
        Util.common.executeAjaxCallback(url, param, function(result){
            console.log(result.entities.curriculumInfo);
            Util.common.loadTemplate("#rc-detail", "#rc-detail-t", result.entities.curriculumInfo);
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
    }
};