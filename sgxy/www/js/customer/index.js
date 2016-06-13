$(function() {
    //初始化加载元素
    customer.index.init();
    $('.yt').hide();
    var storeId = Util.common.getParameter("storeId");
    var userId = Util.common.getParameter("userId");
    var openid = 'dqewqdads21312';
    var loadShopUrl = Util.common.baseUrl+"/weixin/store/subbranch/loadInfo.do";
    var param = {"id": storeId};
    //var param = {"id": "248474721296064512"};
    Util.common.executeAjaxCallback(loadShopUrl, param, function (store) {
        console.info(store);
        localStorage.setItem('store',store);
        $('head title').html(store.name);
        $('#my-header > h2').html(store.name);
        //var store = {"id":"248474721296064512","name":"中国茶商通","userName":"测试1","mobile":"15960252577","levelId":"248472574727991296","levelName":"加盟商","state":0,"password":null,"headImgUrl":"http://7xk1l7.dl1.z0.glb.clouddn.com/1463982599011ac85978.jpg","email":null,"weixin":"weixin","description":"","number":"01","createBy":"null","createTime":"2016-05-23 00:00:00","storeId":"227476069188571136","updateTime":"2016-06-03 10:57:42","province":"1147","city":"1162","country":"1163","address":"","phone":"15960252685"};
    });
    //localStorage.clear();
    //localStorage.setItem("userid",userId);
    //localStorage.setItem("shopId",storeId);
    //debug
    //localStorage.setItem("userid","252415569891778560");
    //localStorage.setItem("shopId","248474721296064512");
    localStorage.setItem("openid",openid);
    ////测试使用 1.1.1.2	会员入口
    //var url = Util.common.baseUrl+"/weixin/weixinClient/index.do";
    //var param = {"from":"html/customer/index.html","storeId":shopId,"type":"weixinIndex"};
    //Util.common.executeAjaxCallback(url, param, function (data) {
    //    console.info(data)
    //});
    //var user = {"from":"/weixin/index.html?param=xxxx","storeId":"1111111","type":"weixinIndex","userInfo":{"id":"11111111"}:"openid":"dqewqdads21312"};
    //以下测试使用，实际需微信客户端上获取，待开发
});
var customer = customer || {};
customer.index={
    //初始化加载元素
    init:function(){
        this.loadAdvertise();
        this.loadClassify();
        this.loadColumn();
        this.loadApplication();
        this.loadCargoBrand();
        //页面加载完成后再播放幻灯片
        this.initSlide();
        this.loadCartNumber();
    },
    //初始化加载购物车数目
    loadCartNumber: function () {
        var url = Util.common.baseUrl + "/weixin/cart/queryCart.do";
        var param = {"userId": localStorage.getItem("userid"), "shopId": localStorage.getItem("shopId")};
        Util.common.executeAjaxCallback(url, param, function (data) {
            console.log(data.length);
            if(data.length != '') {
                $('#cart_num').html(data.length);
            } else {
                $('#cart_num').hide();
            }
        });
    },
    //初始化加载广告幻灯片//初始化加载广告幻灯片
    loadAdvertise:function(){
        var url = Util.common.baseUrl+"/weixin/common/getImg.do";
        var param = {"category":"0"};
        Util.common.executeAjaxCallback(url, param, function (data) {
            var datas ={"datas":data};
            customer.index.loadTemplate("#slider-content", "#index_advertise_t", datas);
            customer.index.initAdvertiseSlide();
        });
    },
    initAdvertiseSlide:function(){
        $("#slider-content").swiper({
            slidesPerView: 1,
            autoplay: 2500,
            loop: true,
            effect: 'fade',
            speed: 2000,
            //centeredSlides: true,
            pagination: '.swiper-pagination',
            spaceBetween: 0
        });
    },
    //初始化加载商品分类
    loadClassify:function(){
        var url = Util.common.baseUrl+ "/weixin/cargo/classify/queryByParentId.do";
        var param = {"category":"0"};
        Util.common.executeAjaxCallback(url, param, function (data) {
            console.log(data.length);
            if(data.length > 6) {
                //
                $("#index_classify_id").swiper({
                    speed: 1000,
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    loop: true
                });
            }
            customer.index.loadTemplate("#index_classify_id ul", "#index_classify_t", data);
            $('.yt').show();
        });
    },
    //初始化加载栏目
    loadColumn:function(){
        var url = Util.common.baseUrl+ "/weixin/good/goodColumn/findAllGoodColumns.do";
        var param = {};
        Util.common.executeAjaxCallback(url, param, function (data) {
            customer.index.loadTemplate("#index_column_id", "#index_column_t", data);
        });
    },
    //初始化商品用途
    loadApplication:function(){
        var url = Util.common.baseUrl+ "/weixin/good/goodLabels/findAll.do";
        var param = {};
        Util.common.executeAjaxCallback(url, param, function (data) {
            var datas ={"datas":data};
            customer.index.loadTemplate("#slider-application", "#index_application_t", datas);
            //商品用途播放
            $("#slider-application").swiper({
                slidesPerView: 2.4,
                speed: 1000,
                //autoplay: 3000,
                autoplayDisableOnInteraction: false,
                slidesOffsetBefore : 8,
                slidesOffsetAfter : 30,
                //loop: true,
                //centeredSlides: true,
                spaceBetween: 16
            });
            var out_wid = $('#slider-application .swiper-slide a > img').width();
            var in_wid = $('#slider-application .swiper-slide a > span').width();
            var out_hei = $('#slider-application .swiper-slide a > img').height();
            var in_hei = $('#slider-application .swiper-slide a > span').height();
            $('#slider-application .swiper-slide a > span').css({
                'left': (out_wid-in_wid) / 2,
                'top': (out_hei-in_hei) / 2
            });
        });
    },
    //初始化品牌推荐
    loadCargoBrand:function(){
        var url = Util.common.baseUrl+ "/weixin/cargo/brand/findAll.do";
        var param = {};
        Util.common.executeAjaxCallback(url, param, function (data) {
            var datas ={"datas":data};
            customer.index.loadTemplate("#slider-brand", "#index_brand_t", datas);
            //品牌播放
            //品牌播放
            $('#slider-brand').swiper({
                slidesPerView: 4,
                autoplay: 3000,
                loop: true,
                slidesOffsetBefore : 15,
                //centeredSlides: true,
                slidesOffsetAfter : 50,
                spaceBetween: 20
            });
        });
        /*if(isdebug){
            //测试数据
            var data = [{"id":"238986851953229875","logo":"images/test-img/index/brand1.png","name":"山国饮艺","brandRecommendation":"1"},
                {"id":"238986851953229875","logo":"images/test-img/index/brand2.png","name":"尚客茶品","brandRecommendation":"1"},
                {"id":"238986851953229875","logo":"images/test-img/index/brand3.png","name":"福村梅记","brandRecommendation":"1"},
                {"id":"238986851953229875","logo":"images/test-img/index/brand4.png","name":"壹日壹茶","brandRecommendation":"1"},
                {"id":"238986851953229875","logo":"images/test-img/index/brand5.png","name":"一品一茶","brandRecommendation":"1"},
                {"id":"238986851953229875","logo":"images/test-img/index/brand3.png","name":"铁观音","brandRecommendation":"1"}];
            var datas ={"datas":data};
            this.loadTemplate("#slider-brand", "#index_brand_t", datas);
        }else{
            this.executeAjax(url ,param ,"#slider-brand", "#index_brand_t");
        }*/
    },
    //初始化幻灯片
    initSlide:function(){
        //广告轮播
      
    },
    executeAjax:function(url ,param ,render ,templateId){
        Util.common.executeAjaxCallback(url ,param,function(data){
            this.loadTemplate(render,templateId,data);
        });
    },
    loadTemplate:function(render ,templateId ,data ){
       // $(render).loadTemplate(templateId, data);
        $(render).html($(templateId).tmpl(data));
    },
    //搜索框跳转
    searchEven:function(){
        setTimeout(function(){
            document.location.href="html/customer/search/search.html";
        }, 300);
    }
}
