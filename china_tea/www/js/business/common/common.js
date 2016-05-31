$(function(){
    /**
     * 自定义input框事件
     */
   $(".clear-a-text").on("click", function(){
        $(this).prev().val("");
       $(this).hide();
   });
    $(".my-ui-input").on("input propertychange","input",function(){
        $(this).next().show();
    });
    $(".my-ui-input").on("focus","input",function(){
        $(".clear-a-text").hide();
        if($(this).val()!='') {
            $(this).next().show();
        }
    });
    /**
     * 回到顶部
     */
    $(".my-ui-up-btn").on("click", "a", function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });
    /**
     * 分享开始
     */
    $(".share-bottom-bar-a").on("click",function () {
        $(".my-ui-share-bottom").show();
        $("body").css({"overflow":"hidden"});
    });
    $(".my-ui-share-bottom").on("click", function (e) {
        var target = $(e.target);
        if(target.closest(".share-content").length == 0){
            $(this).hide();
            $("body").css({"overflow":"visible"});
        }
    });

});

var common = {};
common.shareOnclick = function () {
    $(".my-ui-share-bottom").show();
    $("body").css({"overflow":"hidden"});
}