$(function () {
    //初始化加载元素
    customer.cart.init();

    localStorage.setItem('orderPage', 'html/customer/goods/shopping-cart.html');
    $("#cart-radio-all").on('change', function () {
        if ($(this).is(":checked")) {
            $(".my-ui-checkbox :input[type='checkbox']").prop("checked", true);
        } else {
            $(".my-ui-checkbox :input[type='checkbox']").prop("checked", false);
        }
    });
    $("#shopping-cart-list").on("click", '.options', function () {
        $(this).hide();
        var status=0;
        if ($(this).attr("value") == 1) {
            $(this).next().show();
            $(this).parents('dt').next().hide();
            $(this).parents('dt').next().next().show();
            $(this).parents('div').prev().find('dd').each(function (index) {
                if (index == 0 || index == 1) {
                    $(this).hide();
                } else if (index == 2) {
                    $(this).show();
                }
            });
        } else {
            $(this).prev().show();
            $(this).parents('dt').next().show();
            $(this).parents('dt').next().next().hide();
            $(this).parents('div').prev().find('dd').each(function (index) {
                if (index == 0 || index == 1) {
                    $(this).show();
                } else if (index == 2) {
                    $(this).hide();
                }
            });

            var $new_count = $(this).parent().parent().parent().find(".quantity");
            var $new_counter = $(this).parent().parent().parent().parent().find('input[name=goodCounter]');
            var $new_num = $(this).parent().parent().find('.goods_num');

            var url = Util.common.baseUrl + "/weixin/good/getGoodDetail.do";
            var param = {"goodId": $(this).parent().parent().parent().attr('value')};
            Util.common.executeAjaxCallback(url, param, function (data) {
                var kucun = data.kucun;
                var new_count = $new_count.val();
                console.log(kucun + ":" + new_count);
                if(kucun < new_count) {
                    Util.msg.show('msgId', "购买数量超过库存" + kucun + "，请重新选择！");
                } else {
                    $new_counter.val(new_count);
                    $new_num.html("X" + new_count);
                    customer.cart.doTotalMoney();
                }
            });

            var goodIds = $(this).parent().parent().parent().parent().find('input[name=skuId]').attr('value');
            customer.cart.updateCart($new_count.val(), goodIds, status);
        }
    });
    $("#shopping-cart-list").on("click", '.del_ico', function () {
        customer.cart.delCart($(this).attr('val'));
        $(this).parent().parent().parent().remove();
    });
});

var customer = customer || {};
/*商品数量+1*/
customer.numAdd = function (obj) {
    var that = $(obj).parent().parent().find(".quantity");
    var num_add = parseInt(that.val()) + 1;
    if (that.val() == "") {
        num_add = 1;
    }
    that.val(num_add);
}
/*商品数量-1*/
customer.numDec = function (obj) {
    var that = $(obj).parent().parent().find(".quantity");
    var num_dec = parseInt(that.val()) - 1;
    if (num_dec < 1) {
        that.val(1);
    } else {
        that.val(num_dec);
    }
}
customer.cart = {
    //初始化加载元素
    init: function () {
        this.loadList();
        //customer.cart.doTotalMoney();
    },
    //初始化加载商品分类
    loadList: function () {
        var url = Util.common.baseUrl + "/weixin/cart/queryCart.do";
        var param = {"userId": localStorage.getItem("userid"), "shopId": localStorage.getItem("shopId")};
        Util.common.executeAjaxCallback(url, param, function (data) {
            var datas = {"datas": data};
            customer.cart.loadTemplate("#shopping-cart-list", "#shopping_cart_list_t", datas);
        });
    },
    //
    goDetail: function(obj){
        document.location.href = 'html/customer/details/details.html?id=' + $(obj).parent().attr('value');
    },
    //删除购物车商品
    delCart: function (goodsIds) {
        var url = Util.common.baseUrl + "/weixin/cart/delCart.do";
        var param = {
            "userId": localStorage.getItem("userid"),
            "shopId": localStorage.getItem("shopId"),
            "goodsIds": goodsIds
        };
        Util.common.executeAjaxCallback(url, param, function (data) {
            //{"msg":"操作成功","code":"000000"}
            Util.msg.show("MsgId", data.msg);
        });
    },
    //修改购物车商品数量
    updateCart: function (count, goodIds, status) {
        var userId = localStorage.getItem('userid');
        var shopId = localStorage.getItem('shopId');
        var url = Util.common.baseUrl + "/weixin/cart/updateCart.do";
        var param = {"userId": userId, "shopId": shopId, "goodsId": goodIds, "count": count, "status": status};
        Util.common.executeAjaxCallback(url, param, function (data) {
            //{"msg":"操作成功","code":"000000"}
            console.log(data.msg);
        });
    },
    //计算总金额
    doTotalMoney: function () {
        var total = 0;
        $('input[name=shopCart]').each(function (i) {
            if ($(this).is(':checked')) {
                var sin_price = $(this).parent().parent().find('input[name=salePrice]').val();
                var sin_count = $(this).parent().parent().find('input[name=goodCount]').val();
                total += sin_price * sin_count;
            }
            $('#cart-money-all').html(total.toFixed(2));
        });
    },
    doTotalMoneyOne: function () {
        var total = 0;
        if(!$('#cart-radio-all').is(':checked')) {
            $('input[name=shopCart]').each(function () {
                var sin_price = $(this).parent().parent().find('input[name=salePrice]').val();
                var sin_count = $(this).parent().parent().find('input[name=goodCount]').val();
                total += sin_price * sin_count;
                $('#cart-money-all').html(total.toFixed(2));
            });
        } else {
            $('#cart-money-all').html(0);
        }
    },
    executeAjax: function (url, param, render, templateId) {
        Util.common.executeAjaxCallback(url, param, function (data) {
            this.loadTemplate(render, templateId, data);
        });
    },
    loadTemplate: function (render, templateId, data) {
        $(render).html($(templateId).tmpl(data));
    },
    submit: function () {
        var shopCartInfo = {};
        var shopCarts = [];
        var count = 0;
        var amount = 0;
        $("input[name='shopCart']:checked").each(function () {
            var i = this.value;
            var shopCart = {};
            shopCart.id = $("input[name=id]")[i].value;
            shopCart.goodImgUrl = $("input[name=goodImgUrl]")[i].value;
            shopCart.goodTitle = $("input[name=goodTitle]")[i].value;
            shopCart.salePrice = $("input[name=salePrice]")[i].value;
            shopCart.goodCount = $("input[name=goodCounter]")[i].value;
            shopCart.skuItem = $("input[name=skuItem]")[i].value;
            shopCart.skuId = $("input[name=skuId]")[i].value;
            shopCarts.push(shopCart);
            count += parseFloat(shopCart.goodCount);
            amount += parseFloat(shopCart.salePrice);
            console.log($("input[name=goodCount]")[i].value);
        });
        if (count == 0) {
            return;
        }
        shopCartInfo.shopCarts = shopCarts;
        shopCartInfo.count = count;
        shopCartInfo.amount = amount;
        shopCartInfo.all = $('#cart-money-all').html();
        console.log(JSON.stringify(shopCartInfo));
        document.location.href = "html/customer/order/order-detail-submit.html?buyType=0&shopCartInfo=" + JSON.stringify(shopCartInfo);
    }
}
