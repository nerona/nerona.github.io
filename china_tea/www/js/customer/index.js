$(function() {
    //初始化加载元素
    customer.index.init();
    //测试使用 1.1.1.2	会员入口
    /*var url = Util.common.baseUrl+"/weixin/weixinClient/index.do";
    var param = {"from":"html/customer/index.html?param=xxxx","storeId":"248474721296064512","type":"weixinIndex"};
    Util.common.executeAjaxCallback(url, param, function (data) {

    });*/
    //var user = {"from":"/weixin/index.html?param=xxxx","storeId":"1111111","type":"weixinIndex","userInfo":{"id":"11111111"}:"openid":"dqewqdads21312"};
    //以下测试使用，实际需微信客户端上获取，待开发
    var userid = '249241661336145920';
    var shopId = '248474721296064512';
    var openid = 'dqewqdads21312';
    localStorage.clear();
    localStorage.setItem("userid",userid);
    localStorage.setItem("shopId",shopId);
    localStorage.setItem("openid",openid);
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
    },
    //初始化加载广告幻灯片
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
        $("#slider-content").flexslider({
            slideshowSpeed: 4000, //展示时间间隔ms
            animationSpeed: 800, //滚动时间ms
            height:100,
            touch: true, //是否支持触屏滑动
            slideshow: true,
            start: function() {           }
        });
    },
    //初始化加载商品分类
    loadClassify:function(){
        var url = Util.common.baseUrl+ "/weixin/cargo/classify/queryByParentId.do";
        var param = {"category":"0"};
        Util.common.executeAjaxCallback(url, param, function (data) {
            customer.index.loadTemplate("#index_classify_id ul", "#index_classify_t", data);
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
            $("#slider-application").flexslider({
                animation: "slide",
                animationLoop: true,
                itemWidth: 210,
                itemMargin: 5,
                controlNav: false,
                slideshow: true,
                move: 1
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
            $("#slider-brand").flexslider({
                animation: "slide",
                animationLoop: true,
                itemWidth: 180,
                itemMargin: 5,
                controlNav: false,
                slideshow: true,
                move: 1,
                end: function(){/*滑动到最后一张执行的动作*/}
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
        /*$("#slider-content").flexslider({
            slideshowSpeed: 4000, //展示时间间隔ms
            animationSpeed: 800, //滚动时间ms
            height:100,
            touch: true, //是否支持触屏滑动
            slideshow: true,
            start: function() {
               // $("#slider-content #richTextId").css({'position':'absolute','left':$("#slider-content .flex-direction-nav").position().left+20,'top':$("#slider-content .flex-direction-nav").position().top-70});
            }
        });*/
        //商品用途播放
        /*$("#slider-application").flexslider({
         animation: "slide",
         animationLoop: true,
         itemWidth: 210,
         itemMargin: 5,
         controlNav: false,
         slideshow: true,
         move: 1,
         end: function(){/!*滑动到最后一张执行的动作*!/}
         });*/
        //品牌播放
        $("#slider-brand").flexslider({
            animation: "slide",
            animationLoop: true,
            itemWidth: 180,
            itemMargin: 5,
            controlNav: false,
            slideshow: true,
            move: 1,
            end: function(){/*滑动到最后一张执行的动作*/}
        });
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
        document.location.href="html/customer/search/search.html";
    }
}
