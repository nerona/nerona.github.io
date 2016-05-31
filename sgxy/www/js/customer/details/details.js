
$(function(){
    customer.details.init();
});

var customer = customer || {};
customer.details = {
    conditionStr: {},
    init: function () {
        this.init();

    },
    init: function () {
        var url = Util.common.baseUrl + "/weixin/good/getGoodDetail.do";
        var param = {"goodId": Util.common.getParameter("id")};
        Util.common.executeAjaxCallback(url, param, function (data) {
            //图片轮播
            $("#slider-content").html($("#goodsDetail_showImage_t").tmpl(data.showImages));
            //商品描述
            $("#sp-desc-id .sp-desc-a").html($("#sp-desc-t").tmpl(data));
            //商品描述(运费,收藏,月销量)
            $("#sp-desc-ysy").html($("#sp-desc-ysy-t").tmpl(data));
            //查价格窗口
            $("#goods-cass-div-box").html($("#goods-cass-div-t").tmpl(data));
            //详情图片
            $("#detailTab").html($("#detailTab_t").tmpl(data.detailImages.images));
            //买家评论
            $("#commentTab").html($("#commentTab_t").tmpl(data.goodEvaluationList));

            customer.details.initEvent();
        });
    },
    initEvent: function () {
        /*图片轮播*/
        $("#slider-content").flexslider({
            slideshowSpeed: 4000, //展示时间间隔ms
            animationSpeed: 800, //滚动时间ms
            height: 100,
            touch: true, //是否支持触屏滑动
            slideshow: true,
        });
    },
    //添加到购物车
    addCart:function(){
        var url = Util.common.baseUrl + "/weixin/cart/addCart.do";
        var param = {"userId":localStorage.getItem("userid"),"goodsId": Util.common.getParameter("id"),"shopId":localStorage.getItem("shopId"),"count":$("#quantity").val()};
        Util.common.executeAjaxCallback(url, param, function (data) {
            //{"msg":"操作成功","code":"000000"}
            Util.msg.show("msgId",data.msg);
            if(data.code == "000000"){
                customer.details.getCartCount();
            }
        });
    },
    //查询购物车商品数量
    getCartCount:function(){
        var url = Util.common.baseUrl + "/weixin/cart/getCartCount.do";
        var param = {"userId":localStorage.getItem("userid"),"shopId":localStorage.getItem("shopId")};
        Util.common.executeAjaxCallback(url, param, function (data) {

        });
    }
}
/*规格弹出窗口*/
$("#ggdialog").on({
    popupafteropen: function() {
        $("#ggdialog-popup").css({"top":($(window).height()-$("#ggdialog-popup").height()),"left":"0","width":"100%"});
        $("body").css({overflow:"hidden"});    //禁用滚动条
    }
});

/*商品数量+1*/
function numAdd(){
    var num_add = parseInt($("#quantity").val())+1;
    if($("#quantity").val()==""){
        num_add = 1;
    }
    $("#quantity").val(num_add);
}
/*商品数量-1*/
function numDec(){
    var num_dec = parseInt($("#quantity").val())-1;
    if(num_dec<1){
        $("#quantity").val(0);
    }else{
        $("#quantity").val(num_dec);
    }
}
/**
 * 分享开始
 */
$(".share-bottom-bar-a").on("click",function () {
    $(".my-ui-share-bottom").show();
    $("body").css({"overflow":"hidden"});
});
$(".my-ui-share-bottom").on("click", function (e) {
    var target = $(e.target);
    if(target.closest(".share-content").length == 0){
        $(this).hide();
        $("body").css({"overflow":"visible"});
    }
});
/**
 * 分享开始
 */
$(".share-bottom-bar-a").on("click",function () {
    $(".my-ui-share-bottom").show();
    $("body").css({"overflow":"hidden"});
});
$(".my-ui-share-bottom,.dialog_close").on("click", function (e) {
    var target = $(e.target);
    if(target.closest(".share-content").length == 0){
        $(this).hide();
        $("body").css({"overflow":"visible"});
    }
});
function showGoodSize(){
    $("#goods-cass-div-box").show();
    $("body").css({"overflow":"hidden"});
}
function closeGoodSize(){
    $("#goods-cass-div-box").hide();
    $("body").css({"overflow":"visible"});
}