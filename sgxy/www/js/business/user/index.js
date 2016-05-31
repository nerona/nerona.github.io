
$(function(){
    business.user.init();
});

var business = business || {};
business.user = {
    //初始化加载元素
    init:function() {
        //var userName = Util.common.getParameter("user");
        var userInfo =  JSON.parse(localStorage.getItem("userInfo"));
        //没取到缓存数据，跨回登录页面
        if(userInfo == null){
            document.location.href="html/business/user/login.html";
        }
       // userInfo.userName=userName;
        this.loadPage(userInfo);
    },
    loadPage:function(data){
        $(".my-info-main").html($("#index_t").tmpl(data));
    },
    toSetting:function(){
        document.location.href="html/business/user/settings.html?user="+Util.common.getParameter("user");
    }
}