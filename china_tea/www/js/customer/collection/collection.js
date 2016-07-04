$(function() {
    //初始化加载元素
    customer.collection.init();
});
var customer = customer || {};
customer.collection={
    //初始化加载元素
    init:function(){
        this.loadList();
    },
    //初始化加载收藏列表
    loadList:function(){
        var url = Util.common.baseUrl +"/weixin/store/queryStore.do";
        var param = {"userId":localStorage.getItem("userid"),"shopId":localStorage.getItem("shopId")};
        this.executeAjax(url ,param ,"#collection_list", "#collection_list_t");
    },
    //删除收藏商品
    delStore:function(goodId){
        var me = this;
        console.info(goodId)
        var url = Util.common.baseUrl +"/weixin/store/delStore.do";
        var param = {"userId":localStorage.getItem("userid"),"goodsIds":goodId,shopId:localStorage.getItem("shopId")};
        Util.common.executeAjaxCallback(url ,param,function(data){
            //{"msg":"操作成功","code":"000000"}
            if(data.code!='000000'){
                Util.msg.show("msgId",data.msg);
            }
            else{
                me.loadList();
            }
        });
    },
    //添加商品收藏
    addStore:function(){

    },
    executeAjax:function(url ,param ,render ,templateId){
        var me = this;
        Util.common.executeAjaxCallback(url ,param,function(data){
            console.info(data)
            me.loadTemplate(render,templateId,data);
        });
    },
    loadTemplate:function(render ,templateId ,data ){

        console.info($(templateId),$(templateId).tmpl(data))
        $(render).html($(templateId).tmpl({datas:data}));
    },
    goDetail: function(obj){
        document.location.href = 'html/customer/details/details.html?id=' + $(obj).parent().attr('value');
    }
}
