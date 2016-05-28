
$(function(){
    business.myinfo.init();
    $(function () {
        $(".my-header-edit").on("click",function () {
            $(".my-ui-share-bottom").show();
        });
    });
});
var business = business || {};
business.myinfo = {
    //初始化加载元素
    init:function() {
        //var userName = Util.common.getParameter("user");
        var userInfo =  JSON.parse(localStorage.getItem("userInfo"));
        //没取到缓存数据，跨回登录页面
        if(userInfo == null){
            document.location.href="html/business/user/login.html";
        }
       // userInfo.userName = userName;
        this.loadPage(userInfo);
    },
    loadPage:function(data){
        $(".my-info-main").html($("#myinfo_t").tmpl(data));
    },
    headerClick:function () {
        $(".my-ui-share-bottom").show();
    }
}