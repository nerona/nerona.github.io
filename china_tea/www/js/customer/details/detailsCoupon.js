/**
 * Created by dell on 2016/6/15.
 */
$(function () {
    $('#back').attr('href',localStorage.getItem('searchPage'));
    localStorage.setItem('orderPage', 'html/customer/details/details.html?id='+Util.common.getParameter("id"));
    customer.details.init();
    customer.details.initSc();

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

    setTimeout(function(){
        $('.sp-desc-font-e li').html(localStorage.getItem('my_name'));
    }, 100);
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
        var url = Util.common.baseUrl + "/weixin/good/getGoodDetail.do";
        var param = {"goodId": Util.common.getParameter("id")};

        localStorage.setItem('goodId', Util.common.getParameter("id"));
        Util.common.executeAjaxCallback(url, param, function (data) {
            localStorage.setItem('skuId', data.goodSkuList[0].id);
            //图片轮播
            $("#slider-content").html($("#goodsDetail_showImage_t").tmpl(data.showImages));
            //商品描述
            $("#sp-desc-id .sp-desc-a").html($("#sp-desc-t").tmpl(data));
            //商品描述(运费,收藏,月销量)
            $("#sp-desc-ysy").html($("#sp-desc-ysy-t").tmpl(data));
            //详情图片
            $("#detailTab").html($("#detailTab_t").tmpl(data.detailImages.images));
            //买家评论
            $("#commentTab").html($("#commentTab_t").tmpl(data.goodEvaluationList));

            if (data.goodEvaluationList == null || data.goodEvaluationList == '') {
                $('#commentTab').html('<p style="text-align: center;padding: 10px 0;letter-spacing: 1px;">暂无评价</p>');
            }

            localStorage.setItem('nums', data.goodSkuList[0].nums);

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
        shopCart.goodCount = 1;
        shopCart.skuItem = $("input[name=skuItem]").val();
        shopCart.skuId = $("input[name=skuId]").val();
        shopCarts.push(shopCart);
        amount += parseFloat(shopCart.salePrice);
        shopCartInfo.shopCarts = shopCarts;
        shopCartInfo.goodTitle = shopCart.goodTitle;
        shopCartInfo.count = shopCart.goodCount;
        shopCartInfo.amount = amount;
        shopCartInfo.all = amount * $('#quantity').val();

        //save cartInfo
        localStorage.setItem('goodId', Util.common.getParameter("id"));
        localStorage.setItem('shopCartInfo', JSON.stringify(shopCartInfo));

        document.location.href = "html/customer/details/editCoupon.html?type=add&uew=now";

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