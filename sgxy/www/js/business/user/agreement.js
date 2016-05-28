$(function() {
    //初始化加载元素
    business.agreement.init();
});
var business = business || {};
business.agreement={
    init:function(){
        this.loadList();
    },
    //初始化加载收藏列表
    loadList:function(){
        var url = Util.common.baseUrl +"/module/text/mobile/my.do";
        var param = {};

        this.executeAjax(url ,param ,"#agreement_id", "#agreement_t");
    },
    executeAjax:function(url ,param ,render ,templateId){
        Util.common.executeAjaxCallback(url ,param,function(data){
            $(render).html($(templateId).tmpl(data));
        });
    }
}
