'use strict';

$(function () {
    customer.order.init();
});

var customer = customer || {};
customer.order = {
    init: function init() {
        var all = Util.common.getParameter('all');
        $('#pay-all').html(all);
    },
    goHome: function goHome() {
        document.location.href = 'html/customer/index.html?storeId=' + localStorage.getItem('shopId') + '&type=weixinIndex&userId=' + localStorage.getItem('userid');
    },
    goOrder: function goOrder() {
        document.location.href = 'html/customer/order/order-detail.html?orderId=' + Util.common.getParameter('orderId');
    }
};

//# sourceMappingURL=order-pay-compiled.js.map