$(function(){
    customer.order.init();
});

var customer = customer || {};
customer.order = {
    init: function () {
        var all = Util.common.getParameter('all');
        $('#pay-all').html(all);
    },
    goHome: function(){
      document.location.href = 'html/customer/index.html?storeId=' + localStorage.getItem('shopId') + '&type=weixinIndex&userId=' + localStorage.getItem('userid');
    },
    goOrder: function(){
        document.location.href = 'html/customer/order/order-detail.html?orderId=' + Util.common.getParameter('orderId');
    }
}