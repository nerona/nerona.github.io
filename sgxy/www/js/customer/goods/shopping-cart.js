$(function() {
    //初始化加载元素
    customer.cart.init();
    $("#cart-radio-all").on('change',function () {
        if($(this).is(":checked")){
         $(".my-ui-checkbox :input[type='checkbox']").prop("checked",true);
        }else {
            $(".my-ui-checkbox :input[type='checkbox']").prop("checked",false);
        }
    });
    $(".edit-btn").on("click",'.options',function(){
          $(this).hide();
        if($(this).attr("value")==1) {
            $(this).next().show();
           $(this).parents('dt').next().hide();
           $(this).parents('dt').next().next().show();
            $(this).parents('div').prev().find('dd').each(function (index) {
                if(index==0||index==1){
                    $(this).hide();
                } else if(index==2){
                    $(this).show();
                }
            });
        }else {
            $(this).prev().show();
            $(this).parents('dt').next().show();
            $(this).parents('dt').next().next().hide();
            $(this).parents('div').prev().find('dd').each(function (index) {
                if(index==0||index==1){
                    $(this).show();
                }else if(index==2){
                    $(this).hide();
                }
            });
        }
    });
});
var customer = customer || {};
/*商品数量+1*/
customer.numAdd =function(){
    var num_add = parseInt($("#quantity").val())+1;
    if($("#quantity").val()==""){
        num_add = 1;
    }
    $("#quantity").val(num_add);
}
/*商品数量-1*/
customer.numDec=function(){
    var num_dec = parseInt($("#quantity").val())-1;
    if(num_dec<1){
        $("#quantity").val(0);
    }else{
        $("#quantity").val(num_dec);
    }
}
customer.cart={
    //初始化加载元素
    init:function(){
        this.loadList();
        //this.doTatolMoney();
    },
    //初始化加载商品分类
    loadList:function(){
        var url = Util.common.baseUrl + "/weixin/cart/queryCart.do";
        var param = {"userId":localStorage.getItem("userid"),"shopId":localStorage.getItem("shopId")};
        Util.common.executeAjaxCallback(url, param, function (data) {
            var datas ={"datas":data};
            customer.cart.loadTemplate("#shopping-cart-list", "#shopping_cart_list_t", datas);
        });
    },
    //删除购物车商品
    delCart:function(goodsIds){
        var url = Util.common.baseUrl +"/weixin/cart/delCart.do";
        var param = {"userId":localStorage.getItem("userid"),"shopId":localStorage.getItem("shopId"),"goodsIds":goodsIds};
        Util.common.executeAjaxCallback(url ,param,function(data){
            //{"msg":"操作成功","code":"000000"}
            Util.msg.show("MsgId",data.msg);
        });
    },
    //修改购物车商品数量
    updateCart:function(userId,goodsIds){
        var url = Util.common.baseUrl +"/weixin/cart/delCart.do";
        var param = {"userId":userId,"goodsIds":goodsIds,"count":10,"status":1};
        Util.common.executeAjaxCallback(url ,param,function(data){
            //{"msg":"操作成功","code":"000000"}
            alert(data.msg);
        });
    },
    //计算总金额
    doTatolMoney:function(){
        var tatol = 0;
        $('input:checkbox[name=id]').each(function(i){
            if($(this).attr("checked"))
            {
                alert($("input[name=salePrice]:eq("+i+")").val());
                //tatol += ;
            }
        });
    },
    executeAjax:function(url ,param ,render ,templateId){
        Util.common.executeAjaxCallback(url ,param,function(data){
            this.loadTemplate(render,templateId,data);
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        $(render).html($(templateId).tmpl(data));
    },
    submit:function(){
        var shopCartInfo = {};
        var shopCarts = [];
        var count = 0;
        var amount = 0;
        $("input[name='shopCart']:checked").each(function(){
            var i = this.value;
            var shopCart = {};
            shopCart.id =  $("input[name=id]")[i].value;
            shopCart.goodImgUrl =  $("input[name=goodImgUrl]")[i].value;
            shopCart.goodTitle =  $("input[name=goodTitle]")[i].value;
            shopCart.salePrice =  $("input[name=salePrice]")[i].value;
            shopCart.goodCount =  $("input[name=goodCount]")[i].value;
            shopCart.skuItem =  $("input[name=skuItem]")[i].value;
            shopCarts.push(shopCart);
            count++;
            amount += parseFloat(shopCart.salePrice);
        });
        if(count == 0){
            return ;
        }
        shopCartInfo.shopCarts = shopCarts;
        shopCartInfo.count = count;
        shopCartInfo.amount = amount;
        console.log(JSON.stringify(shopCartInfo))
        document.location.href = "html/customer/order/order-detail-submit.html?shopCartInfo="+JSON.stringify(shopCartInfo);
    }
}
