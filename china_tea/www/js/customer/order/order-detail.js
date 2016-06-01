$(function() {
    //初始化加载元素
    customer.order.init();
});
var customer = customer || {};
customer.order={
    //初始化加载元素
    init:function(){
        this.loadPage();
    },
    loadPage:function(){
        var shopCartInfo = Util.common.getParameter("shopCartInfo");
        var shopCartInfoJson = JSON.parse(shopCartInfo);
        console.log(shopCartInfo);
        $("#goodDetails").html($("#goodDetails_t").tmpl(shopCartInfo));
        $("#goodDetail_total").html($("#goodDetail_total_t").tmpl(shopCartInfo));
        $("#order-cast-info-id").html($("#order-cast-info_t").tmpl(shopCartInfo));

    },
    loadTemplate: function (render, templateId, data) {
        $(render).html($(templateId).tmpl(data));
    },
    goPay: function() {
        document.location.href = "html/customer/order/order-pay.html";
    },
    submit:function(){
        var modelJson = {};
        modelJson.subbranchId = localStorage.getItem("shopId");
        modelJson.buyerId = "249241661336145920";//localStorage.getItem("userid");
        modelJson.province = $("input[name=province]").val();
        modelJson.city = $("input[name=city]").val();
        modelJson.town = $("input[name=town]").val();
        modelJson.address = $("input[name=address]").val();
        modelJson.receiver = $("input[name=receiver]").val();
        modelJson.receiverPhone = $("input[name=receiverPhone]").val();
        modelJson.buyerRemark = $("input[name=buyerRemark]").val();
        modelJson.needInvoice = $("input[name=needInvoice]").val();;
        modelJson.invoiceName = $("input[name=invoiceName]").val();
        modelJson.invoiceContent = $("input[name=invoiceContent]").val();
        var indentList =[];
        var goodCount = $("input[name=goodCount]").val();
        for(var i = 0; i < goodCount; i++){
            var indent = {};
            indent.number  = $("input[name=number]")[i].value;
            indent.finalAmount  = $("input[name=finalAmount]")[i].value
            indent.tradeGoodSkuId  = $("input[name=tradeGoodSkuId]")[i].value
            indentList.push(indent);
        }
        modelJson.indentList = indentList;


        var url = Util.common.baseUrl + "/weixin/indent/add.do";
        var param = {"modelJson":JSON.stringify(modelJson)};
        Util.common.executeAjaxCallback(url, param, function (data) {
            Util.msg.show("msgId",data.msg);
        });
    }
}
