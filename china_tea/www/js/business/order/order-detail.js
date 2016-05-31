$(function() {
    //初始化加载元素
    business.orderInfo.init();
});
var business = business || {};
business.orderInfo={
    init:function(){
        var id = Util.common.getParameter("id");
        this.loadInfo(id);
    },
    //初始化加载收藏列表
    loadInfo:function(id){
        var url = Util.common.baseUrl +"/deal/indent/mobile/getOrderDetail.do";
        var param = {"id":id};
        this.executeAjax(url ,param ,"#order_info", "#order_info_t");
    },
    executeAjax:function(url ,param ,render ,templateId){
        Util.common.executeAjaxCallback(url ,param,function(data){
            $(render).html($(templateId).tmpl(data));
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        $(render).html($(templateId).tmpl(data));
    }
}
