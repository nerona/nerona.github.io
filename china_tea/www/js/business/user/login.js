$(function(){
    //$("#login-a-click")
    $("#login-box-btn").prop("checked","true");
    $("#login-a-click").removeClass("login-no-checked");
    $("#login-a-click").addClass("login-checked");
    $("#login-box-btn").on("click",function(){
        if($(this).is(':checked')) {
             $("#login-a-click").removeClass("login-no-checked");
             $("#login-a-click").addClass("login-checked");
        } else {
            $("#login-a-click").removeClass("login-checked");
            $("#login-a-click").addClass("login-no-checked");
        }
    });
    $("#login-a-click").on("click",function(){
        var url = Util.common.baseUrl +"/mobile/user/login.do";
        var userName = $("input[name=userName]").val();
        var password = $("input[name=password]").val();
        var param = {"loginName":userName,"password":$.md5(password)};
        Util.common.executeAjaxCallback(url ,param,function(data){
            //执行提交后台后代码
            if(data.code==0){
                localStorage.clear();
                data.userName = userName;
                localStorage.setItem("userInfo",JSON.stringify(data));
                document.location.href="html/business/shop/index.html?user="+userName;
            }else{
                alert(data.msg);
            }
        })
    });
});