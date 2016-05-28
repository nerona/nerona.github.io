$(function() {
    //初始化加载元素
    business.fans.init();
});
var business = business || {};
business.fans={
    pageSize:6, //默认一次加载6条
    pageNum:1,//默认为1
    shopId:null,
    init:function(){
        this.shopId = Util.common.getParameter("shopId");
        this.loadList();
    },
    //初始化加载收藏列表
    loadList:function(){
        var url = Util.common.baseUrl +"/mobile/fans/getFansList.do";
        var param = {"shopId":this.shopId,"pageSize":this.pageSize,"pageNum":this.pageNum};
        this.executeAjax(url ,param ,"#thelist", "#fans_list_t");
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

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function(){loaded("fans_list")}, false);
var myScroll;
//下拉刷新
function pullDownAction () {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction () {
    var url = Util.common.baseUrl +"/mobile/fans/getFansList.do";
    business.fans.pageNum = business.fans.pageNum + business.fans.pageSize;
    var param = {"shopId":business.fans.shopId,"pageSize":business.fans.pageSize,"pageNum":business.fans.pageNum};
    Util.common.executeAjaxCallback(url, param, function(data){
        $("#thelist").append($("#fans_list_t").tmpl(data));
        myScroll.refresh();		//调用刷新页面myScroll.refresh();
    });
}