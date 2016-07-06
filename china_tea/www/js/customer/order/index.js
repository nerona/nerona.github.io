$(function(){
    customer.order.init();
    $('#thelist').on('click', 'table', function(){
        document.location.href = 'html/customer/order/order-detail.html?orderId=' + $(this).attr('value');
    });
    $('#thelist').on('click', '.ok-order-btn', function(){
        var type = $(this).attr('value');
        var ids = $(this).closest('li').attr('value');
        console.log(type);
        if(type == 1) {
            var all = $(this).parent().parent().parent().parent().find('#payment').html();
            document.location.href = 'html/customer/order/order-pay.html?all=' + all + "&orderId=" + $(this).parent().parent().parent().parent().attr('value');
        } else if(type == 2) {
            //$("#my-order-return-popup .text-change").html('确定要退款,不再考虑下吗？亲。');
            //$("#my-order-return-popup").show().popup("open").on('tap', '.ok-order-btn', function(){
            //    setTimeout(function(){
                    document.location.href = 'html/customer/order/return-reason.html??title=申请退款&id=' + ids;
             //   }, 100);
            //});
            //$("#my-order-tip-popup").show().popup("open");
        }  else if(type == 3) {
            $("#my-order-ok-popup").show().popup("open").on('tap', '.ok-order-btn', function(){
                setTimeout(function(){
                    customer.order.sureOrder(ids);
                }, 100);
            });
        } else if(type == 4) {

            var that = $(this).parent().parent().parent().parent();
            var goodModel = [];
            that.find('tbody tr').each(function(index){
                var good = {};
                good.goodSkuId = $(this).attr('goodskuid');
                good.goodImg = $(this).find('img').attr('src');
                good.goodName = $(this).find('h1').html();
                good.indentId = $(this).parent().parent().attr('value');
                goodModel.push(good);
            });
            console.log(goodModel);

            document.location.href = 'html/customer/order/judge.html?goodModel=' + JSON.stringify(goodModel);
        } else if(type == 6) {
            //
            document.location.href = "html/customer/order/address.html";
        }else if(type == 7) {
            //
            $(this).parent().parent().parent().parent().remove();
            customer.order.deleteOrder(ids);
        }
    });
    $('#thelist').on('click', '.cancel-order-btn', function(){
        var type = $(this).attr('value');
        console.log(type);

        var ids = $(this).closest('li').attr('value');
        if(type == 1) {
            $("#my-order-cancel-popup").show().popup("open").on('tap', '.ok-order-btn', function(){
                customer.order.cancelOrder(ids);
            });
        } else if(type == 2) {
           //
        }  else if(type == 3) {
            //$("#my-order-return-popup").show().popup("open").on('tap', '.ok-order-btn', function(){
                //setTimeout(function(){
                    document.location.href = 'html/customer/order/return-reason.html?title=申请退货&id=' + ids;
                //}, 100);
            //});
        } else if(type == 4) {
            //
            $(this).parent().parent().parent().parent().remove();
            customer.order.deleteOrder(ids);
        } else if(type == 6) {
            //
        }
    });
    $('.manager-shop-top-bar').on('click', 'a', function(){
        $(this).parent().parent().find('li').find('.ui-active').removeClass('ui-active');
        $(this).addClass('ui-active');
    })
});

var customer = customer || {};
customer.order = {
    init:function(){
        this.initGoodList();
        //save token
        customer.order.getToken();
    },
    initGoodList:function(){
        var url = Util.common.baseUrl+ "/weixin/indent/listByBuyerIdAndStoreId.do";
        var param = {"status":"","storeId":localStorage.getItem("shopId"),buyerId:localStorage.getItem("userid"),"startIndex": 0, "pageSize": 500};
        //console.log(localStorage.getItem("shopId") + ":" + localStorage.getItem("userid"));
        Util.common.executeAjaxCallback(url, param, function (data) {
            console.log(data.length);
            for(var i=0;i<data.length;i++) {
                if(data[i].statusText == '待付款') {
                    data[i].newStatus = "去付款";
                    data[i].addStatus = "取消订单";
                    data[i].newType = "1";
                } else if(data[i].statusText == '待发货') {
                    data[i].newStatus = "提醒发货";
                    data[i].addStatus = "申请退款";
                    data[i].newType = "2";
                } else if(data[i].statusText == '待收货') {
                    data[i].newStatus = "确认收货";
                    data[i].addStatus = "申请退货";
                    data[i].newType = "3";
                } else if(data[i].statusText == '待评价') {
                    data[i].newStatus = "去评价";
                    data[i].addStatus = "删除订单";
                    data[i].newType = "4";
                }else if(data[i].statusText == '退货申请'||data[i].statusText == '退款申请') {
                    data[i].newStatus = "等待卖家确认";
                    data[i].newType = "5";
                } else if(data[i].statusText == '退货中') {
                    data[i].newStatus = "查看退货地址";
                    data[i].newType = "6";
                } else if(data[i].statusText == '已退款' || data[i].statusText == '已退货' || data[i].statusText == '已收货' || data[i].statusText == '已取消' || data[i].statusText == '已完成') {
                    data[i].newStatus = "删除订单";
                    data[i].newType = "7";
                }
            }
            customer.order.loadTemplate("#thelist", "#order_list_b_t", {datas:data});
        });
    },
    initGoodsNoPay: function(){
        var url = Util.common.baseUrl+ "/weixin/indent/listByBuyerIdAndStoreId.do";
        var param = {"status": "0","storeId":localStorage.getItem("shopId"),buyerId:localStorage.getItem("userid"),"startIndex": 0, "pageSize": 500};
        Util.common.executeAjaxCallback(url, param, function (data) {
            for (var i=0;i<data.length;i++) {
                data[i].newStatus = "去付款";
                data[i].addStatus = "取消订单";
                data[i].newType = "1";
            }
            customer.order.loadTemplate("#thelist", "#order_list_b_t", {datas:data});
        });
    },
    initGoodsHavePay: function(){
        var url = Util.common.baseUrl+ "/weixin/indent/listByBuyerIdAndStoreId.do";
        var param = {"status": "1","storeId":localStorage.getItem("shopId"),buyerId:localStorage.getItem("userid"),"startIndex": 0, "pageSize": 500};
        Util.common.executeAjaxCallback(url, param, function (data) {
            for (var i=0;i<data.length;i++) {
                if(data[i].statusText == '待发货') {
                    data[i].newStatus = "提醒发货";
                    data[i].addStatus = "申请退款";
                    data[i].newType = "2";
                } else if(data[i].statusText == '待收货') {
                    data[i].newStatus = "确认收货";
                    data[i].addStatus = "申请退货";
                    data[i].newType = "3";
                } else if(data[i].statusText == '待评价') {
                    data[i].newStatus = "去评价";
                    data[i].addStatus = "删除订单";
                    data[i].newType = "4";
                }else if(data[i].statusText == '退货申请'||data[i].statusText == '退款申请') {
                    data[i].newStatus = "等待卖家确认";
                    data[i].newType = "5";
                } else if(data[i].statusText == '退货中') {
                    data[i].newStatus = "查看退货地址";
                    data[i].newType = "6";
                } else if(data[i].statusText == '已退款' || data[i].statusText == '已退货' || data[i].statusText == '已收货' || data[i].statusText == '已取消' || data[i].statusText == '已完成') {
                    data[i].newStatus = "删除订单";
                    data[i].newType = "7";
                }
            }
            customer.order.loadTemplate("#thelist", "#order_list_b_t", {datas:data});
        });
    },
    executeAjax:function(url ,param ,render ,templateId){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: url,
            data: param,
            dataType: 'json',
            success: function(result) {
                this.loadTemplate(render,templateId,result[0].row);
            }
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        // $(render).loadTemplate(templateId, data);
        $(render).html($(templateId).tmpl(data));
    },
    cancelOrder:function(id) {
        var url = Util.common.baseUrl + "/weixin/indent/update/cancel.do";
        var param = {"ids": id};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if(data.code === 1){
                this.initGoodList();
            }
        }.bind(this));
    },
    sureOrder:function(id) {
        var url = Util.common.baseUrl + "/weixin/indent/update/evaluate.do";
        var param = {"ids": id};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if(data.code === 1){
                this.initGoodList();
            }
        }.bind(this));
    },
    deleteOrder: function(ids){
        var url = Util.common.baseUrl + "/weixin/indent/delete.do";
        var param = {"ids": ids};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if(data.code === 1){
                this.initGoodList();
            }
        }.bind(this));
    },
    getToken: function(){
        var url = Util.common.baseUrl + "/weixin/qiniu/getToken.do";
        var param = {};
        Util.common.executeAjaxCallback(url, param, function(result){
            localStorage.setItem('qiniu_token', result.uptoken);
        });
    }
};