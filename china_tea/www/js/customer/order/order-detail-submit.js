$(function(){
    customer.order.init();
    setTimeout(function(){
        if($('#statusName').html() == '待付款' || $('#statusName').html() == '待评价'){
            $('.ok-order-btn-r').removeClass('wait-pay-btn');
        }
    }, 1000);
});

var customer = customer || {};
customer.order = {
    init:function(){
        this.initOrderDetail();
    },
    initOrderDetail:function(){
        var url = Util.common.baseUrl+ "/weixin/indent/getOrderDetail.do";
        var param = {"id": Util.common.getParameter('orderId')};
        Util.common.executeAjaxCallback(url, param, function (data) {
            console.log(data);
            customer.order.loadTemplate("#OrderDetail_showInfo", "#OrderDetail_showInfo_t", data);
            customer.order.loadTemplate("#OrderDetail_showImage", "#OrderDetail_showImage_t", {datas:data.indentList});
            customer.order.loadTemplate("#bar-b-tj", "#bar-b-tj_t", data);

            var statusValues = ["待付款","待发货","待收货","退货中","已退款","已退货","已收货","已取消","待评价"];
            for(var i=0; i <statusValues.length; i++) {
                if(data.status == (i+1)) {
                    data.statusValue = statusValues[i];
                }
            }
            customer.order.loadTemplate("#order-cast-info", "#order-cast-info_t", data);

            if($('#statusName').html() == "已取消") {
                console.log('1');
                $('.order-cast-info > span:first-child').html('待收款');
            }
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        // $(render).loadTemplate(templateId, data);
        $(render).html($(templateId).tmpl(data));
    },
    goDetailPro: function(obj){
        document.location.href = 'html/customer/details/details.html?id=' + $(obj).attr('id');
    },
    goPay: function(obj) {
        var all = $("#all").html();
        if($(obj).html() == "待付款") {
            document.location.href = 'html/customer/order/order-pay.html?all=' + all + "&orderId=" + Util.common.getParameter('orderId');
        } else if($(obj).html() == "待评价") {
            var goodModel = [];

            $('tbody tr').each(function(index){
                var good = {};
                good.goodSkuId = $(this).attr('id');
                good.goodImg = $(this).find('img').attr('src');
                good.goodName = $(this).find('.td-middle > p:first-child').html();
                good.indentId = Util.common.getParameter('orderId');
                goodModel.push(good);
            });
            console.log(goodModel);

            document.location.href = 'html/customer/order/judge.html?goodModel=' + JSON.stringify(goodModel);
        }
    }
}