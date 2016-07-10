$(function () {
    $('#back').attr('href',localStorage.getItem('searchPage'));
    localStorage.setItem('orderPage', 'html/customer/details/details.html?id='+Util.common.getParameter("id"));
    customer.details.init();
    customer.details.initSc();
    customer.details.getCartCount();
    localStorage.removeItem('one_location');
    //customer.details.wxInit();
    $('#detailCommentTabs').on('click', '.tabs a', function () {
        $(this).parent().parent().find('.ui-btn-active').removeClass('ui-btn-active');
        $(this).addClass('ui-btn-active');
        if ($(this).find('span').html() == '买家评论') {
            $('#commentTab').show();
            $('#detailTab').hide();
        }
        if ($(this).find('span').html() == '商品详情') {
            $('#commentTab').hide();
            $('#detailTab').show();
        }
    });
});

var customer = customer || {};
customer.details = {
    conditionStr: {},
    wxInit: function () {
        var url = Util.common.baseUrl + "/weixin/weixinConfig/verification.do";
        var currentUrl = "weixinfront/html/customer/details/details.html?id=" + Util.common.getParameter("id");
        var param = {"url": currentUrl};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.success) {
                wx.config({
                    debug: false,
                    appId: data.msg.appId,
                    timestamp: data.msg.timestamp,
                    nonceStr: data.msg.nonceStr,
                    signature: data.msg.signature,
                    jsApiList: [
                        // 所有要调用的 API 都要加到这个列表中
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ]
                });
                wx.ready(function () {
                    var imageSrc = $(".slides").find('li').eq(0).find('img').attr('src');
                    var shareUrl = Util.common.baseUrl + 'weixin/weixinClient/index.do?from=weixinfront/html/customer/details/details.html?id=' + Util.common.getParameter("id");
                    var title = $("#goodsName").text();
                    var desc = $("#goodsName").text();
                    $("#wxShareLink").on("click", function () {
                        wx.onMenuShareAppMessage({
                            title: $("#goodsName").text(), // 分享标题
                            desc: $("#goodsName").text(), // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: imageSrc, // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                Util.msg.show("msgId", "分享成功");
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                Util.msg.show("msgId", "分享失败");
                            }
                        });
                    });
                    $("#wxCircleShareLink").on("click", function () {
                        wx.onMenuShareTimeline({
                            title: $("#goodsName").text(), // 分享标题
                            link: shareUrl, // 分享链接
                            imgUrl: imageSrc, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                Util.msg.show("msgId", "分享成功");
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                Util.msg.show("msgId", "分享失败");
                            }
                        });
                    })
                    var shareData = {
                        title: title,
                        desc: desc,
                        link: shareUrl,
                        imgUrl: imageSrc
                    };
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);

                });
            }
        })
    },
    init: function () {
        //分享出来的详情页重新获取商铺名称
        var shareStoreId = Util.common.getParameter("storeId");
        if(shareStoreId!=null){
            localStorage.setItem("shopId",shareStoreId);
            var loadShopUrl = Util.common.baseUrl+"/weixin/store/subbranch/loadInfo.do";
            var param = {"id": shareStoreId};
            //var param = {"id": "248474721296064512"};
            Util.common.executeAjaxCallback(loadShopUrl, param, function (store) {
                localStorage.setItem('store',JSON.stringify(store));
                localStorage.setItem('my_name',store.name);
            });
        }

        var url = Util.common.baseUrl + "/weixin/good/getGoodDetail.do";
        var param = {"goodId": Util.common.getParameter("id")};

        localStorage.setItem('goodId', Util.common.getParameter("id"));
        Util.common.executeAjaxCallback(url, param, function (data) {
            localStorage.setItem('skuId', data.goodSkuList[0].id);
            //图片轮播
            $("#slider-content").html($("#goodsDetail_showImage_t").tmpl(data.showImages));
            //商品描述
            data.shopName = localStorage.getItem('my_name');
            $("#sp-desc-id .sp-desc-a").html($("#sp-desc-t").tmpl(data));
            //商品描述(运费,收藏,月销量)
            $("#sp-desc-ysy").html($("#sp-desc-ysy-t").tmpl(data));
            //查价格窗口
            //规格
            var new_skuList = [];
            var items_1 = {}, items_2 = {}, items_3 = {};
            var item_value_1 = [], item_value_2 = [], item_value_3 = [];
            for (var i = 0; i < data.goodSkuList.length; i++) {
                var item_1 = data.goodSkuList[i].skuLong.split('!!');
                for (var j = 0; j < item_1.length; j += 3) {
                    var item_2 = item_1[j].split("~");
                    items_1.type = item_2[0];
                    item_value_1.push(item_2[2]);
                }
                for (var j = 1; j < item_1.length; j += 3) {
                    var item_2 = item_1[j].split("~");
                    items_2.type = item_2[0];
                    item_value_2.push(item_2[2]);
                }
                for (var j = 2; j < item_1.length; j += 3) {
                    var item_2 = item_1[j].split("~");
                    items_3.type = item_2[0];
                    item_value_3.push(item_2[2]);
                }
            }
            var result_1 = [], hash_1 = {};
            var result_2 = [], hash_2 = {};
            var result_3 = [], hash_3 = {};
            for (var n = 0, elem; (elem = item_value_1[n]) != null; n++) {
                if (!hash_1[elem]) {
                    result_1.push(elem);
                    hash_1[elem] = true;
                }
            }
            for (var n = 0, elem; (elem = item_value_2[n]) != null; n++) {
                if (!hash_2[elem]) {
                    result_2.push(elem);
                    hash_2[elem] = true;
                }
            }
            for (var n = 0, elem; (elem = item_value_3[n]) != null; n++) {
                if (!hash_3[elem]) {
                    result_3.push(elem);
                    hash_3[elem] = true;
                }
            }
            items_1.value = result_1;
            items_2.value = result_2;
            items_3.value = result_3;
            new_skuList.push(items_1);
            new_skuList.push(items_2);
            new_skuList.push(items_3);
            console.log(new_skuList);
            data.new_skuList = new_skuList;

            $("#goods-cass-div-box").html($("#goods-cass-div-t").tmpl(data));
            //详情图片
            $("#detailTab").html($("#detailTab_t").tmpl(data.detailImages.images));
            //买家评论
            $("#commentTab").html($("#commentTab_t").tmpl(data.goodEvaluationList));

            if (data.goodEvaluationList == null || data.goodEvaluationList == '') {
                $('#commentTab').html('<p style="text-align: center;padding: 10px 0;letter-spacing: 1px;">暂无评价</p>');
            }

            localStorage.setItem('nums', data.kucun);

            customer.details.initEvent(data);
        });
    },
    initEvent: function (data) {
        /*图片轮播*/
        $("#slider-content").swiper({
            slidesPerView: 1,
            autoplay: 2500,
            loop: true,
            effect: 'fade',
            fade: {
                crossFade: true
            },
            speed: 1000,
            autoplayDisableOnInteraction: false,
            pagination: '.swiper-pagination',
            spaceBetween: 0
        });
    },
    //获取收藏状态
    initSc: function () {
        var url = Util.common.baseUrl + "/weixin/store/queryStore.do";
        var param = {"userId": localStorage.getItem("userid"), "shopId": localStorage.getItem("shopId")};
        var this_id = Util.common.getParameter('id');
        Util.common.executeAjaxCallback(url, param, function (data) {
            for (var i = 0; i < data.length; i++) {
                var temp = data[i].goodId;
                if (this_id == temp) {
                    $('#spxq_sc_dj_id').addClass('sc-share-active');
                }
            }
        });
    },
    //添加到购物车
    addCart: function () {
        var url = Util.common.baseUrl + "/weixin/cart/addCart.do";
        var param = {
            "userId": localStorage.getItem("userid"),
            "goodsId": localStorage.getItem("skuId"),
            "shopId": localStorage.getItem("shopId"),
            "count": $("#quantity").val()
        };
        Util.common.executeAjaxCallback(url, param, function (data) {
            //{"msg":"操作成功","code":"000000"}
            //Util.msg.show("msgId",data.msg);
            if (data.code == "000000") {
                $("#join-cart-popup").popup("open").css({'visibility': 'visible'});
                $("#join-cart-popup-popup").css({'top': '30%'});
                customer.details.getCartCount();
            }
        });
    },
    addFav: function () {
        var url = Util.common.baseUrl + "/weixin/store/addStore.do";
        var param = {
            "userId": localStorage.getItem("userid"),
            "goodsId": localStorage.getItem("goodId"),
            "shopId": localStorage.getItem("shopId"),
            "count": $("#quantity").val()
        };
        if ($('#spxq_sc_dj_id').hasClass('sc-share-active')) {
            Util.msg.show("msgId", "已收藏");
            //var url2 = Util.common.baseUrl +"/weixin/store/delStore.do";
            //var param2 = {
            //    "userId": localStorage.getItem("userid"),
            //    "goodsId": localStorage.getItem("goodId"),
            //    "shopId": localStorage.getItem("shopId")
            //};
            //Util.common.executeAjaxCallback(url2, param2, function (data) {
            //    console.log(data);
            //});
        } else {
            Util.common.executeAjaxCallback(url, param, function (data) {
                //{"msg":"操作成功","code":"000000"}
                if (data.msg == "操作成功") {
                    $('#spxq_sc_dj_id').addClass('sc-share-active');
                    Util.msg.show("msgId", "收藏成功");
                }
            });
        }

    },
    //buy self
    goBuy: function () {
        var shopCartInfo = {};
        var shopCarts = [];
        var count = 1;
        var amount = 0;
        var shopCart = {};
        shopCart.goodImgUrl = $("#slider-content ul li:first-child > img").attr('src');
        shopCart.goodTitle = $("input[name=goodName]").val();
        shopCart.salePrice = $("input[name=salePrice]").val();
        shopCart.goodCount = $("input[name=goodCount]").val() * $('#quantity').val();
        shopCart.skuItem = $("input[name=skuItem]").val();
        shopCart.skuId = $("input[name=skuId]").val();
        shopCarts.push(shopCart);
        count += parseFloat(shopCart.goodCount);
        amount += parseFloat(shopCart.salePrice);
        shopCartInfo.shopCarts = shopCarts;
        shopCartInfo.count = shopCart.goodCount;
        shopCartInfo.amount = amount;
        shopCartInfo.all = amount * $('#quantity').val();
        document.location.href = "html/customer/order/order-detail-submit.html?buyType=0&&goodId=" + Util.common.getParameter('id') + "&&shopCartInfo=" + JSON.stringify(shopCartInfo);
    },
    //buy gift
    goBuyFor: function () {
        var shopCartInfo = {};
        var shopCarts = [];
        var count = 1;
        var amount = 0;
        var shopCart = {};
        shopCart.goodImgUrl = $("#slider-content ul li:first-child > img").attr('src');
        shopCart.goodTitle = $("input[name=goodName]").val();
        shopCart.salePrice = $("input[name=salePrice]").val();
        shopCart.goodCount = $("input[name=goodCount]").val() * $('#quantity').val();
        shopCart.skuItem = $("input[name=skuItem]").val();
        shopCart.skuId = $("input[name=skuId]").val();
        shopCarts.push(shopCart);
        count += parseFloat(shopCart.goodCount);
        amount += parseFloat(shopCart.salePrice);
        shopCartInfo.shopCarts = shopCarts;
        shopCartInfo.count = shopCart.goodCount;
        shopCartInfo.amount = amount;
        shopCartInfo.all = amount * $('#quantity').val();

        //save cartInfo
        localStorage.setItem('buyType', '1');
        localStorage.setItem('goodId', Util.common.getParameter("id"));
        localStorage.setItem('shopCartInfo', JSON.stringify(shopCartInfo));
        
        document.location.href = "html/customer/address/edit.html?type=add&&use=now&buyType=1&&goodId=" + Util.common.getParameter('id') + "&&shopCartInfo=" + JSON.stringify(shopCartInfo);
        //document.location.href = "html/customer/order/order-detail-submit.html?buyType=1&&goodId=" + Util.common.getParameter('id') + "&&shopCartInfo=" + JSON.stringify(shopCartInfo);
    },
    //查询购物车商品数量
    getCartCount: function () {
        var url = Util.common.baseUrl + "/weixin/cart/getCartCount.do";
        var param = {"userId": localStorage.getItem("userid"), "shopId": localStorage.getItem("shopId")};
        var $cart_num = $('<span id="cart_num"></span>');

        Util.common.executeAjaxCallback(url, param, function (data) {
            console.log(data);
            if(data != '' && data != null) {
                $('.my-goods-cart-search-a').append($cart_num);
                $('#cart_num').html(data);
            } else {
                $('#cart_num').hide();
            }
        });
    }
}
/*规格弹出窗口*/
$("#ggdialog").on({
    popupafteropen: function () {
        $("#ggdialog-popup").css({
            "top": ($(window).height() - $("#ggdialog-popup").height()),
            "left": "0",
            "width": "100%"
        });
        $("body").css({overflow: "hidden"});    //禁用滚动条
    }
});

/*商品数量+1*/
function numAdd() {
    var num_add = parseInt($("#quantity").val()) + 1;
    if ($("#quantity").val() == "") {
        num_add = 1;
    }
    $("#quantity").val(num_add);
}
/*商品数量-1*/
function numDec() {
    var num_dec = parseInt($("#quantity").val()) - 1;
    if (num_dec < 1) {
        $("#quantity").val(0);
    } else {
        $("#quantity").val(num_dec);
    }
}
/**
 * 分享开始
 */
$(".share-bottom-bar-a").on("click", function () {
    $(".my-ui-share-bottom").show();
    $("body").css({"overflow": "hidden"});
});
$(".my-ui-share-bottom").on("click", function (e) {
    var target = $(e.target);
    if (target.closest(".share-content").length == 0) {
        $(this).hide();
        $("body").css({"overflow": "visible"});
    }
});
/**
 * 分享开始
 */
$(".share-bottom-bar-a").on("click", function () {
    $(".my-ui-share-bottom").show();
    $("body").css({"overflow": "hidden"});
});
$(".my-ui-share-bottom,.dialog_close").on("click", function (e) {
    var target = $(e.target);
    if (target.closest(".share-content").length == 0) {
        $(this).hide();
        $("body").css({"overflow": "visible"});
    }
});
function showGoodSize(type) {
    var nums = localStorage.getItem('nums');

    if (type == 1) {
        if (nums == 0) {
            $("#no-goods-popup").show().on('click', '.ok-order-btn, .dialog_close' ,function(){
                $("#no-goods-popup").hide();
            });
            return;
        } else {
            $("#goods-cass-div-box").show();
            $('#buyNow').on('click', function () {
                customer.details.goBuyFor();
            });
        }
    } else if (type == 2) {
        if (nums == 0) {
            $("#no-goods-popup").show().on('click', '.ok-order-btn, .dialog_close' ,function(){
                $("#no-goods-popup").hide();
            });
            return;
        } else {
            $("#goods-cass-div-box").show();
            $('#buyNow').on('click', function () {
                customer.details.goBuy();
            });
        }
    } else if (type == 3) {
        if (nums == 0) {
            $("#no-goods-popup").show().on('click', '.ok-order-btn, .dialog_close' ,function(){
                $("#no-goods-popup").hide();
            });
            return;
        } else {
            $("#goods-cass-div-box").show();
            $('#buyNow').on('click', function () {
                customer.details.goBuy();
            });
        }
    }
    
    $('#addCart').on('click', function () {
        if (nums == 0) {
            $("#no-goods-popup").show().popup("open");
        } else {
            customer.details.addCart();
        }
    });
    $('#weight-0-0').attr('checked', 'true');
    $('#weight-1-0').attr('checked', 'true');
    $('#weight-2-0').attr('checked', 'true');

    $("body").css({"overflow": "hidden"});
}
function closeGoodSize() {
    $("#goods-cass-div-box").hide();
    $("body").css({"overflow": "visible"});
}

function goodsWxShare() {
    var imageSrc = $(".slides").find('li').eq(0).find('img').attr('src');
    alert($("#goodsName").text());
    var shareUrl = Util.common.baseUrl + 'weixin/weixinClient/index.do?from=weixinfront/html/customer/details/details.html?id=' + Util.common.getParameter("id");
    wx.onMenuShareAppMessage({
        title: $("#goodsName").text(), // 分享标题
        desc: $("#goodsName").text(), // 分享描述
        link: shareUrl, // 分享链接
        imgUrl: imageSrc, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            Util.msg.show("msgId", "分享成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            Util.msg.show("msgId", "分享失败");
        }
    });
}

function goodsWxCircleShare() {
    var imageSrc = $(".slides").find('li').eq(0).find('img').attr('src');
    alert($("#goodsName").text());
    wx.onMenuShareTimeline({
        title: $("#goodsName").text(), // 分享标题
        link: window.location.url, // 分享链接
        imgUrl: imageSrc, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            Util.msg.show("msgId", "分享成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            Util.msg.show("msgId", "分享失败");
        }
    });
}