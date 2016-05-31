$(function(){
    business.goodsDetail.init();
});

var business = business || {};
business.goodsDetail = {
    //初始化加载元素
    init:function() {
        var id = Util.common.getParameter("id");
        this.loadPage(id);
        this.initEvent();
    },
    loadPage:function(id) {
        var url = Util.common.baseUrl + "/mobile/good/getGoodDetail.do";
        var param = {"goodId": id};
        //Util.common.executeAjaxCallback(url, param, function (data) {
            var data = {"tradeGoodId":"248507439881342976","goodSkuList":[{"leftNums":0,"skuLong":"规格~5g*20泡/100g~5g*20泡/100g","id":"248507439881342977","goodId":"248507439881342976","cargoSkuId":"248506883285295105","nums":8,"marketPrice":300,"retailPrice":null,"startTime":"2016-05-23 15:58:36","endTime":null,"limitNum":0,"salePrice":300,"cargoSkuName":"5g*20泡/100g","saleNum":0}],"name":"小种野茶S1500-100g","post":"包邮","marketPrice":300,"salePrice":300,"saleNum":0,"kucun":8,"score":0,"smallImage":"http://7xk1l7.dl1.z0.glb.clouddn.com/1463990025158d457536.jpg","showImages":{"groupId":"248506882828115970","images":[{"id":"248506882828115971","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/14639900439054562fd0.jpg","idLong":248506882828115970},{"id":"248506882828115972","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/1463990040062c720b67.jpg","idLong":248506882828115970},{"id":"248506882828115973","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/1463990036609d21eb99.jpg","idLong":248506882828115970},{"id":"248506882828115974","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/1463990032712eae1f54.jpg","idLong":248506882828115970},{"id":"248506882828115975","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/146399002876560dee0d.jpg","idLong":248506882828115970}],"groupIdLong":248506882828115970},"detailImages":{"groupId":"248506882828115976","images":[{"id":"248506882828115977","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/1463990055637fc1b0ea.jpg","idLong":248506882828115970},{"id":"248506882828115978","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/146399005134379977e1.jpg","idLong":248506882828115970},{"id":"248506882828115979","url":"http://7xk1l7.dl1.z0.glb.clouddn.com/14639900475648c7dd81.jpg","idLong":248506882828115970}],"groupIdLong":248506882828115970},"goodEvaluationList":[],"skuTypeList":[{"skuName":"规格","skuType":1}],"status":0,"startDate":null,"endDate":null,"columnName":"今日推荐","storeNum":0};
            $("#slider-content").html($("#goodsDetail_showImage_t").tmpl(data.showImages));
            $(".text-desc-content").html($("#goodsDetail_t").tmpl(data));
            $(".goods-img-show-content").append($("#goodsDetail_images_t").tmpl(data.detailImages.images));
            $("#goods-cass-div-box").html($("#goodsDetail_shotType_t").tmpl(data));
            $(".my-ui-footer-bar ul").html($("#goodsDetail_shelve_t").tmpl(data));

            business.goodsDetail.showLeftTime(data.goodSkuList[0].startTime,data.goodSkuList[0].endTime);
       //});
    },
    //1.1.2.5	店铺商品上架 0-下架1-上架
    setGoodShelve:function(){
        var url = Util.common.baseUrl + "/mobile/good/setGoodShelve.do";
        var param = {"shopId": Util.common.getParameter("shopId"),"goodIds":Util.common.getParameter("id")};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if(data.code==0){
                $(".my-ui-footer-bar ul").html($("#goodsDetail_shelve_t").tmpl({"status":1}));
                Util.msg.show("successShelveId","商品已经成功上架","imgs/test-img/put-scc-ico.png");
            }else{
                Util.msg.show("successShelveId","商品上架失败","imgs/test-img/put-scc-ico.png");
            }
        });
    },
    //1.1.2.6	店铺商品下架
    setGoodOutShelve: function () {
        var url = Util.common.baseUrl + "/mobile/good/setGoodOutShelve.do";
        var param = {"shopId": Util.common.getParameter("shopId"),"goodIds":Util.common.getParameter("id")};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if(data.code==0){
                $(".my-ui-footer-bar ul").html($("#goodsDetail_shelve_t").tmpl({"status":0}));
                Util.msg.show("successOutShelveId","商品已经成功下架","imgs/test-img/put-scc-ico.png");
            }else{
                Util.msg.show("successShelveId","商品下架失败","imgs/test-img/put-scc-ico.png");
            }
        });
    },
    //计算活动时间
    showLeftTime: function (startTime, endTime) {
        if(!Util.string.isEmpty(startTime) && !Util.string.isEmpty(endTime)){
            var timeTasker = setInterval(function () {
                if(new Date()  < new Date(startTime)){
                    $("#showLeftTime").html("距开始: " + Util.date.getTimeDiffer(new Date(),new Date(startTime)));
                }else if(new Date() > new Date(startTime) && new Date() <  new Date(endTime)){
                    $("#showLeftTime").html("距结束: " + Util.date.getTimeDiffer(new Date(endTime) ,new Date()));
                }else{
                    $("#showLeftTime").css("color","red");
                    $("#showLeftTime").css("text-shadow","none");
                    $("#showLeftTime").html("已结束");
                    clearInterval(timeTasker);
                }
            },1000);
        }
    },
    //商品详情
    lookGoodsCass:function(){
        $("#goods-cass-div-box").show();
        $("body").css({"overflow":"hidden"});
    },
    initEvent:function(){
        $("#slider-content").flexslider({
            slideshowSpeed: 4000, //展示时间间隔ms
            animationSpeed: 800, //滚动时间ms
            touch: true, //是否支持触屏滑动
            slideshow: true
        });
        /**
         * 上架提示
         */
        $(".my-list-view-t").on("change", ".ext-box-select", function(){
            var num = $(".my-list-view-t").find(".ext-box-select:checked").length;
            $("#manager-box-btn-all").next().find("em").html(num);
        }) ;
        /**
         * 商品详情
         */
        $("#goods-cass-div-box").on("click", function (e) {
            var target = $(e.target);
            if(target.closest(".share-content").length == 0){
                $(this).hide();
                $("body").css({"overflow":"visible"});
            }
        });
    }
}