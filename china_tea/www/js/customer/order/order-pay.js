$(function(){
    customer.order.init();
});

var customer = customer || {};
customer.order = {
    init: function () {

    },
    goHome: function(){
      document.location.href = 'html/customer/index.html';
    },
    goDetail: function(){
        document.location.href = 'html/customer/order/order-detail.html';
    }
}