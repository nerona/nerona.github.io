
$(function(){
    business.amountInfo.init();
});

var business = business || {};
business.amountInfo = {
    init:function() {
        this.loadPage();
        this.loadBank();
    },
    //初始化加载收藏列表
    loadPage:function(){
        var url = Util.common.baseUrl +"/mobile/user/getUserMsg.do";
        var param = {"shopId":Util.common.getParameter("shopId")};
        Util.common.executeAjaxCallback(url ,param,function(data){
            $("#top_amount_id").html($("#info_t").tmpl(data));
        });
    },
    loadBank:function(){
        var url = Util.common.baseUrl +"/mobile/user/getBankCardList.do";
        var param = {"shopId":Util.common.getParameter("shopId"),"pageSize":"6","pageNum":1};
        Util.common.executeAjaxCallback(url ,param,function(data){
            if(data.length > 0){
                //id
                $("input[name=id]").val(data[0].id);
                //name	姓名
                $("input[name=name]").val(data[0].name);
                //bankCard	银行卡号
                $("input[name=bankCard]").val(data[0].bankCard);
                //bankName	开户银行
                $("input[name=bankName]").val(data[0].bankName);
                //card	身份证号码
                $("input[name=card]").val(data[0].card);
                //mobile	手机号码
                $("input[name=mobile]").val(data[0].mobile);
                $("#submitId").html("修改");
            }else{
                $("#submitId").html("添加银行卡");
            }
        });
    },
    toShopAgreement:function(){
        document.location.href = "html/business/user/shop-agreement.html?shopId="+Util.common.getParameter("shopId");
    },
    toAddBank:function(){
        document.location.href = "html/business/user/add-bank-card.html?shopId="+Util.common.getParameter("shopId")+"&id="+$("input[name=id]").val();
    }
}