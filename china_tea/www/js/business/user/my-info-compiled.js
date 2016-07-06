"use strict";

$(function () {
    business.myinfo.init();
    $(function () {
        $(".my-header-edit").on("click", function () {
            business.myinfo.headerClick();
        });
    });
});
var business = business || {};
business.myinfo = {
    //初始化加载元素
    init: function init() {
        //var userName = Util.common.getParameter("user");
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        //没取到缓存数据，跨回登录页面
        if (userInfo == null) {
            document.location.href = "html/business/user/login.html";
        }
        // userInfo.userName = userName;
        this.loadPage(userInfo);
    },
    loadPage: function loadPage(data) {
        $(".my-info-main").html($("#myinfo_t").tmpl(data));
    },
    saveUserInfo: function saveUserInfo(name, text) {
        var url = Util.common.baseUrl + "/mobile/user/updateUserMsg.do";
        //var userName = Util.common.getParameter("user");
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        var data = '{"shopId":"' + userInfo.msg.id + '","' + name + '":"' + text + '"}';
        var param = { "param": data };
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.code == 0) {
                userInfo.msg[name] = text;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
        });
    },
    headerClick: function headerClick() {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        var that = this;
        //1：头像，2：活动
        window.setHeadImg = function (url) {
            if (url) {
                that.saveUserInfo('headImgUrl', url);
                $('#headImg').attr('src', url);
            }
        };
        Util.na.invoke('imageChoose', '1', function (url) {
            if (url) {
                userInfo.msg.headImgUrl = url;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                $('#headImg').attr('src', url);
            }
        });
    }
};

//# sourceMappingURL=my-info-compiled.js.map