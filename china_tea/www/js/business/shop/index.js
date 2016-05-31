
$(function(){
    business.shop.init();
});

var business = business || {};
business.shop = {
    //初始化加载元素

    init:function() {
        //var userName = Util.common.getParameter("user");
        var userInfo =  JSON.parse(localStorage.getItem("userInfo"));
        //没取到缓存数据，跨回登录页面
        if(userInfo == null){
            document.location.href="html/business/user/index.html";
        }
        //userInfo.userName=userName;
        this.loadPage(userInfo);
    },
    loadPage:function(userInfo){
        var url = Util.common.baseUrl +"/mobile/user/getOrderTotalMsg.do";
        var param = {"shopId":userInfo.msg.id};
        Util.common.executeAjaxCallback(url, param, function(data){
            userInfo.orderTotal = data;
            $("#shopInfo").html($("#shopInfo_t").tmpl(userInfo));
        });
    }
}