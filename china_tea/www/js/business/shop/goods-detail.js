$(function () {
    business.goodsDetail.init();
});

var business = business || {};
business.goodsDetail = {
    content: null,
    //初始化加载元素
    init: function () {
        var id = Util.common.getParameter("id");
        var isShared = Util.common.getParameter("isShared");
        if(isShared){
            $('.my-ui-footer-bar').hide();
            $('.goods-share-td').hide();
        }
        this.loadPage(id);
        this.initEvent();
    },
    loadPage: function (id) {
        var url = Util.common.baseUrl + "/mobile/good/getGoodDetail.do";
        var param = {"goodId": id};
        var that = this;
        Util.common.executeAjaxCallback(url, param, function (data) {
            that.normalize(data);
            that.content = data;
            $("#slider-content").html($("#goodsDetail_showImage_t").tmpl(data.showImages));
            $(".text-desc-content").html($("#goodsDetail_t").tmpl(data));
            $(".goods-img-show-content").append($("#goodsDetail_images_t").tmpl(data.detailImages.images));
            $("#goods-cass-div-box").html($("#goodsDetail_shotType_t").tmpl(data));
            $(".my-ui-footer-bar ul").html($("#goodsDetail_shelve_t").tmpl(data));

            business.goodsDetail.showLeftTime(data.goodSkuList[0].startTime, data.goodSkuList[0].endTime);
        });
    },
    normalize: function (data) {
        var skuDisplay = [];
        var skuDisplayMap = {};
        var skuTypeList = data.skuTypeList;
        var goodSkuList = data.goodSkuList;
        skuTypeList.forEach(function (item) {
            var obj = {
                type: item.skuName,
                details: []
            };
            skuDisplayMap[item.skuName] = obj.details;
            skuDisplay.push(obj);
        });
        goodSkuList.forEach(function (good) {
            var skuLongs = good.skuLong.split(',');
            skuLongs.forEach(function (item) {
                var arr = item.split('~');
                skuDisplayMap[arr[0]].push(arr[1]);
            });
        });
        data.skuDisplay = skuDisplay;
    },
    //1.1.2.5	店铺商品上架 0-下架1-上架
    setGoodShelve: function () {
        var url = Util.common.baseUrl + "/mobile/good/setGoodShelve.do";
        var param = {"shopId": Util.common.getParameter("shopId"), "goodIds": Util.common.getParameter("id")};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.code == 0) {
                $(".my-ui-footer-bar ul").html($("#goodsDetail_shelve_t").tmpl({"status": 1}));
                Util.msg.show("successShelveId", "商品已经成功上架", "imgs/test-img/put-scc-ico.png");
            } else {
                Util.msg.show("successShelveId", "商品上架失败", "imgs/test-img/put-scc-ico.png");
            }
        });
    },
    //1.1.2.6	店铺商品下架
    setGoodOutShelve: function () {
        var url = Util.common.baseUrl + "/mobile/good/setGoodOutShelve.do";
        var param = {"shopId": Util.common.getParameter("shopId"), "goodIds": Util.common.getParameter("id")};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.code == 0) {
                $(".my-ui-footer-bar ul").html($("#goodsDetail_shelve_t").tmpl({"status": 0}));
                Util.msg.show("successOutShelveId", "商品已经成功下架", "imgs/test-img/put-scc-ico.png");
            } else {
                Util.msg.show("successShelveId", "商品下架失败", "imgs/test-img/put-scc-ico.png");
            }
        });
    },
    //计算活动时间
    showLeftTime: function (startTime, endTime) {
        if (!Util.string.isEmpty(startTime) && !Util.string.isEmpty(endTime)) {
            var timeTasker = setInterval(function () {
                if (new Date() < new Date(startTime)) {
                    $("#showLeftTime").html("距开始: " + Util.date.getTimeDiffer(new Date(), new Date(startTime)));
                } else if (new Date() > new Date(startTime) && new Date() < new Date(endTime)) {
                    $("#showLeftTime").html("距结束: " + Util.date.getTimeDiffer(new Date(endTime), new Date()));
                } else {
                    $("#showLeftTime").css("color", "red");
                    $("#showLeftTime").css("text-shadow", "none");
                    $("#showLeftTime").html("已结束");
                    clearInterval(timeTasker);
                }
            }, 1000);
        }
    },
    //商品详情
    lookGoodsCass: function () {
        $("#goods-cass-div-box").show();
        $("body").css({"overflow": "hidden"});
    },
    initEvent: function () {
        $("#slider-content").flexslider({
            slideshowSpeed: 4000, //展示时间间隔ms
            animationSpeed: 800, //滚动时间ms
            touch: true, //是否支持触屏滑动
            slideshow: true
        });
        /**
         * 上架提示
         */
        $(".my-list-view-t").on("change", ".ext-box-select", function () {
            var num = $(".my-list-view-t").find(".ext-box-select:checked").length;
            $("#manager-box-btn-all").next().find("em").html(num);
        });
        /**
         * 商品详情
         */
        $("#goods-cass-div-box").on("click", function (e) {
            var target = $(e.target);
            if (target.closest(".share-content").length == 0) {
                $(this).hide();
                $("body").css({"overflow": "visible"});
            }
        });
    }
}