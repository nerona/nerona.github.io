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
        var url = Util.common.baseUrl +"/weixin/cart/queryCart.do";
        var param = {"userId":"241553513600057344"};
        if(isdebug){
            //测试数据
            var data = [{"id":0001,"goodId":"241952126440509440","shopId":"0","shopName":null,"userId":null,"goodCount":1,"marketPrice":0.0,"retailPrice":0.0,"salePrice":0.0,"goodDesc":"12321323","goodTitle":"2233444","goodImgUrl":"http://7xk1l7.dl1.z0.glb.clouddn.com/14618243817973e42b99.jpg","skuId":239423032162701312,"skuItem":"尺码:M,颜色:绿色"},
                {"id":0002,"goodId":"241952126440509440","shopId":"0","shopName":null,"userId":null,"goodCount":1,"marketPrice":0.0,"retailPrice":10.0,"salePrice":0.0,"goodDesc":"12321323","goodTitle":"2233444","goodImgUrl":"http://7xk1l7.dl1.z0.glb.clouddn.com/14618243817973e42b99.jpg","skuId":239423032162701312,"skuItem":"尺码:M,颜色:绿色"},
                {"id":0003,"goodId":"241952126440509440","shopId":"0","shopName":null,"userId":null,"goodCount":1,"marketPrice":0.0,"retailPrice":0.0,"salePrice":20.0,"goodDesc":"12321323","goodTitle":"2233444","goodImgUrl":"http://7xk1l7.dl1.z0.glb.clouddn.com/14618243817973e42b99.jpg","skuId":239423032162701312,"skuItem":"尺码:M,颜色:绿色"},
                {"id":0004,"goodId":"241952126440509440","shopId":"0","shopName":null,"userId":null,"goodCount":1,"marketPrice":0.0,"retailPrice":30.0,"salePrice":40.0,"goodDesc":"12321323","goodTitle":"2233444","goodImgUrl":"http://7xk1l7.dl1.z0.glb.clouddn.com/14618243817973e42b99.jpg","skuId":239423032162701312,"skuItem":"尺码:M,颜色:绿色"},
                {"id":0005,"goodId":"241952126440509440","shopId":"0","shopName":null,"userId":null,"goodCount":1,"marketPrice":0.0,"retailPrice":0.0,"salePrice":0.0,"goodDesc":"12321323","goodTitle":"2233444","goodImgUrl":"http://7xk1l7.dl1.z0.glb.clouddn.com/14618243817973e42b99.jpg","skuId":239423032162701312,"skuItem":"尺码:M,颜色:绿色"}];
            var datas ={"datas":data};
            this.loadTemplate("#collection_list", "#collection_list_t", datas);
        }else{
            this.executeAjax(url ,param ,"#collection_list", "#collection_list_t");
        }
    },
    //删除收藏商品
    delStore:function(goodId){
        alert("删除测试"+goodId);
        var url = Util.common.baseUrl +"/weixin/store/delStore.do";
        var param = {"userId":"123","goodsIds":goodId};
        Util.common.executeAjaxCallback(url ,param,function(data){
            //{"msg":"操作成功","code":"000000"}
            alert(data.msg);
        });
    },
    //添加商品收藏
    addStore:function(){

    },
    executeAjax:function(url ,param ,render ,templateId){
        Util.common.executeAjaxCallback(url ,param,function(data){
            this.loadTemplate(render,templateId,data);
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        $(render).html($(templateId).tmpl(data));
    }
}
