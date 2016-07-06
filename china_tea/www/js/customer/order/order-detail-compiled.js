"use strict";

$(function () {
    //初始化加载元素
    customer.order.init();
    //
    var needInvoice, invoiceName, invoiceContent;
    needInvoice = false;
    invoiceName = "";
    invoiceContent = "";
    $("input[name=needInvoice]").val(needInvoice);
    $("input[name=invoiceName]").val(invoiceName);
    $("input[name=invoiceContent]").val(invoiceContent);
    $('#pc-judge-radio').on('click', function () {
        if ($(this).is(':checked')) {
            $('.packet-mask').show();
            $('#unit-person').on('click', function () {
                if ($(this).is(':checked')) {
                    $('.unit-input-text').hide();
                }
            });
            $('#unit-company').on('click', function () {
                if ($(this).is(':checked')) {
                    $('.unit-input-text').show();
                }
            });
            $('#no-packet').on('click', function () {
                needInvoice = false;
                invoiceName = "";
                invoiceContent = "";
                $("input[name=needInvoice]").val(needInvoice);
                $("input[name=invoiceName]").val(invoiceName);
                $("input[name=invoiceContent]").val(invoiceContent);
                $('.packet-mask').hide();
                $('#pc-judge-radio').removeAttr('checked');
            });
            $('.packet-submit').on('click', function () {
                if ($('#unit-company').is(':checked')) {
                    if ($('.unit-input-text').val() == '') {
                        Util.msg.show('msgId', '请输入正确的单位发票抬头');
                    } else {
                        needInvoice = true;
                        invoiceName = "公司";
                        invoiceContent = $('.unit-input-text').val();
                        $('.packet-mask').hide();
                    }
                } else {
                    needInvoice = true;
                    invoiceName = "个人";
                    invoiceContent = "";
                    $('.packet-mask').hide();
                }
                $("input[name=needInvoice]").val(needInvoice);
                $("input[name=invoiceName]").val(invoiceName);
                $("input[name=invoiceContent]").val(invoiceContent);
            });
        }
    });
});
var customer = customer || {};
customer.order = {
    //初始化加载元素
    init: function init() {
        this.loadPage();

        var orderPage = localStorage.getItem('orderPage');
        console.info(orderPage);
        if (orderPage) {
            $('#back').attr('href', orderPage);
        }
    },
    loadPage: function loadPage() {
        var shopCartInfo = Util.common.getParameter("shopCartInfo");
        var shopCartInfoJson = JSON.parse(shopCartInfo);
        console.log(shopCartInfoJson);
        $("#goodDetails").html($("#goodDetails_t").tmpl(shopCartInfoJson));
        $("#goodDetail_total").html($("#goodDetail_total_t").tmpl(shopCartInfoJson));
        $("#order-cast-info-id").html($("#order-cast-info_t").tmpl(shopCartInfoJson));

        if (Util.common.getParameter("buyType") == 0) {
            //get addr
            var url_addr = Util.common.baseUrl + "/weixin/addr/query.do";
            //var param_addr = {"userId": "1"};i
            var param_addr = { "userId": localStorage.getItem('userid') };
            console.log(param_addr);
            Util.common.executeAjaxCallback(url_addr, param_addr, function (data) {
                var get_address = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].status == 1) {
                        $("input[name=province]").val(data[i].provinceName);
                        $("input[name=city]").val(data[i].cityName);
                        $("input[name=town]").val(data[i].areaName);
                        $("input[name=address]").val(data[i].detailAddr);
                        $("input[name=receiver]").val(data[i].receiptName);
                        $("input[name=receiverPhone]").val(data[i].mobile);

                        get_address = data[i].provinceName + data[i].cityName + data[i].areaName + data[i].detailAddr;
                        var temp = {
                            "provinceName": data[i].provinceName,
                            "cityName": data[i].cityName,
                            "areaName": data[i].areaName,
                            "detailAddr": data[i].detailAddr,
                            "receiptName": data[i].receiptName,
                            "mobile": data[i].mobile
                        };
                        localStorage.setItem("one_location", JSON.stringify(temp));
                    }
                }
                if (get_address != "") {
                    $('#pay-address-edit').html(get_address);
                }
            });
            $("#send-info-div").hide();
            //$("#packet-needed").hide();
            $("#pay-address-edit").on('click', function () {

                localStorage.setItem('addressPage', 'html/customer/order/order-detail-submit.html');
                document.location.href = 'html/customer/address/index.html?type=html/customer/order/order-detail-submit.html';
            });
        }
        if (Util.common.getParameter("buyType") == 1) {
            var one_location = JSON.parse(localStorage.getItem('one_location'));
            if (one_location == null) {
                $("#pay-address-edit").html('编辑收货地址').css({
                    'position': 'relative',
                    'top': '6px'
                }).on('click', function () {
                    document.location.href = 'html/customer/address/edit.html?type=add&&use=now';
                });
            } else {
                $("#pay-address-edit").html(one_location.provinceName + one_location.cityName + one_location.areaName + one_location.detailAddr).css({
                    'position': 'relative',
                    'top': '5px'
                }).on('click', function () {
                    document.location.href = 'html/customer/address/edit.html?type=add&&use=now';
                });
            }
        }
    },
    loadTemplate: function loadTemplate(render, templateId, data) {
        $(render).html($(templateId).tmpl(data));
    },
    goDetailPro: function goDetailPro() {
        document.location.href = 'html/customer/details/detail.html?id=' + $(this).attr('value');
    },
    goPay: function goPay() {
        this.submit();
    },
    submit: function submit() {
        var modelJson = {};
        modelJson.subbranchId = localStorage.getItem("shopId");
        modelJson.buyerId = localStorage.getItem("userid");
        //
        if (Util.common.getParameter('buyType') == 0) {
            modelJson.buyType = "z";
        } else {
            modelJson.buyType = "s";
        }
        modelJson.type = "1";
        modelJson.ticketNum = "";
        modelJson.buyerCarriage = "";
        modelJson.province = JSON.parse(localStorage.getItem('one_location')).provinceName;
        modelJson.city = JSON.parse(localStorage.getItem('one_location')).cityName;
        modelJson.town = JSON.parse(localStorage.getItem('one_location')).areaName;
        modelJson.address = JSON.parse(localStorage.getItem('one_location')).detailAddr;
        modelJson.receiver = JSON.parse(localStorage.getItem('one_location')).receiptName;
        modelJson.receiverPhone = JSON.parse(localStorage.getItem('one_location')).mobile;
        modelJson.buyerRemark = $("input[name=buyerRemark]").val();
        modelJson.needInvoice = $("input[name=needInvoice]").val();
        modelJson.invoiceName = $("input[name=invoiceName]").val();
        modelJson.invoiceContent = $("input[name=invoiceContent]").val();
        var indentList = [];
        var goodCount = $("input[name=goodCount]").val();

        var shopCartInfo = Util.common.getParameter("shopCartInfo");
        var shopCartInfoJson = JSON.parse(shopCartInfo);
        for (var i = 0; i < shopCartInfoJson.shopCarts.length; i++) {
            var shopCart = shopCartInfoJson.shopCarts[i];
            var indent = {};
            indent.number = shopCart.goodCount;
            indent.finalAmount = shopCart.salePrice;
            indent.tradeGoodSkuId = shopCart.skuId;
            indentList.push(indent);
        }
        console.log(indentList);
        modelJson.indentList = indentList;

        var url = Util.common.baseUrl + "/weixin/indent/add.do";
        var param = { "modelJson": JSON.stringify(modelJson) };
        if ($('#pay-address-edit').html() == '编辑收货地址' || $('#pay-address-edit').html() == '收货地址:') {
            Util.msg.show("msgId", "请填写收货地址");
        } else {
            Util.common.executeAjaxCallback(url, param, function (data) {
                if (data.code == 1) {
                    var all = parseFloat($('#pay-all').html());
                    document.location.href = "html/customer/order/order-pay.html" + "?goodCount=" + goodCount + "&all=" + all + '&orderId=' + data.msg + "&goodId=" + Util.common.getParameter('goodId') + "&shopCartInfo=" + shopCartInfo;
                } else {
                    if (data.msg) {
                        Util.msg.show("msgId", data.msg);
                    } else {
                        Util.msg.show("msgId", "库存不足");
                    }
                }
            });
        }
    }
};

//# sourceMappingURL=order-detail-compiled.js.map