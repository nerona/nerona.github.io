$(function(){
    //初始化加载元素
    $(".manager-shop-top-bar").on("click","a",function () {
        $(".manager-shop-top-bar").find("a").removeClass("manager-shop-bar-a-active");
        $(this).addClass("manager-shop-bar-a-active");
    });
    $(".goods-search-cancel-a").on("click",function () {
        $(".my-header-search").hide();
        $("#my-header").show();
    });

    $(".clear-a-text").on("click",function () {
        $('#goodSearchId').val('');
        business.MangerShop.exchangeBtn();
    });

    //监听搜索框变化事件,以切换搜索与取消显示
    $('#goodSearchId').bind('input propertychange', function (event) {
        business.MangerShop.exchangeBtn();
    });
    business.MangerShop.init();
});
var business = business || {};
business.MangerShop={
    pageSize:6, //默认一次加载6条
    pageNum:1,//默认为1
    type:1,//1 出售中，2 已下架商品
    init:function(){
        $(".my-header-search").show();
        $("#my-header").hide();
        $('#goodSearchId').val(Util.common.getParameter("goodsName"));
        business.MangerShop.exchangeBtn();
        this.loadList(Util.common.getParameter("goodsName"));
    },
    //初始化加载收藏列表
    loadList:function(goodsName) {
        this.pageNum = 1; //切换tab重新查询
        var url = Util.common.baseUrl + "/mobile/good/getSearchGoodList.do";
        var param = {"goodsName":goodsName,"pageSize":this.pageSize ,"pageNum":this.pageNum};
        Util.common.executeAjaxCallback(url ,param,function(data){
            if( data.length>0 ) {
                $("#thelist").html($("#list_t").tmpl(data));
            }else {
                $("#thelist").html('<li><div style="text-align: center;">  <img src="imgs/test-img/no-search-result.png"/></div></li>');
            }
        });
    },
    searchBtn:function(obj) {
        var searchVal = $('#goodSearchId').val();
        this.loadList(searchVal);
    },
    cancelBtn:function(obj){
        //$(".my-header-search").hide();
        //$("#my-header").show();
        history.back();
    },
    //跳转到商品详情页面
    toDetails:function(id){
        document.location.href="html/business/shop/goods-detail.html?id="+id+"&shopId="+Util.common.getParameter("shopId");
    },
    exchangeBtn:function(){
        var searchVal = $('#goodSearchId').val();
        if(Util.string.isEmpty(searchVal)){
            $("#submitBtn").html('<a  class="goods-search-cancel-a" data-role="none" href="#" onclick="business.MangerShop.cancelBtn(this)">取消</a>');
        }else{
            $("#submitBtn").html('<a  class="goods-search-cancel-a" data-role="none" href="#"  onclick="business.MangerShop.searchBtn(this)">搜索</a>');
        }
    }

}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function(){loaded("scroll-list")}, false);
var myScroll;
//下拉刷新
function pullDownAction () {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction () {
    var url = Util.common.baseUrl ;
    var url = Util.common.baseUrl + "/mobile/good/getSearchGoodList.do";
    var param = {"shopId":Util.common.getParameter("shopId"),"pageSize":business.MangerShop.pageSize ,"pageNum":business.MangerShop.pageNum + 1};
    Util.common.executeAjaxCallback(url, param, function(data){
        if( data.length>0 ) {
            $("#thelist").append($("#list_t").tmpl(data));
            business.MangerShop.pageNum +=  1;
        }else{

        }
        myScroll.refresh();
    });
}