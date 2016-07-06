"use strict";

$(function () {
    //初始化加载元素
    business.MangerShop.loadList(1);
    $(".manager-shop-top-bar").on("click", "a", function () {
        $(".manager-shop-top-bar").find("a").removeClass("manager-shop-bar-a-active");
        $(this).addClass("manager-shop-bar-a-active");
    });
    /*$(".goods-search-cancel-a").on("click",function () {
     $(".my-header-search").hide();
     $("#my-header").show();
     });*/
    $(".my-header-ddd-btn").on("click", function () {
        $('#goodSearchId').val('');
        $(".my-header-search").show();
        $("#my-header").hide();
    });
    $(".clear-a-text").on("click", function () {
        $('#goodSearchId').val('');
        business.MangerShop.exchangeBtn();
    });

    //监听搜索框变化事件,以切换搜索与取消显示
    $('#goodSearchId').bind('input propertychange', function (event) {
        business.MangerShop.exchangeBtn();
    });
});
var business = business || {};
business.MangerShop = {
    pageSize: 6, //默认一次加载6条
    pageNum: 1, //默认为1
    type: 1, //1 出售中，2 已下架商品
    //初始化加载收藏列表
    loadList: function loadList(type) {
        this.pageNum = 1; //切换tab重新查询
        var url = Util.common.baseUrl;
        if (this.type == 1) {
            url += "/mobile/good/getSaleGoodList.do";
        } else {
            url += "/mobile/good/getUnshelveGoodList.do";
        }

        var param = { "shopId": Util.common.getParameter("shopId"), "pageSize": this.pageSize, "pageNum": this.pageNum };
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.length > 0) {
                $("#thelist").html($("#list_t").tmpl(data));
            } else {
                $("#thelist").html('<li><div style="text-align: center;">  <img src="imgs/test-img/no-search-result.png"/></div></li>');
            }
        });
    },
    //切换tab 1 出售中，2 已下架商品
    exchangeTab: function exchangeTab(type) {
        this.type = type;
        this.loadList(type);
        myScroll.refresh();
    },
    toEWM: function toEWM() {
        location.href = 'html/business/shop/shop-ewm-share.html?shopId=' + Util.common.getParameter("shopId");
    },
    //回到顶部
    toTop: function toTop() {
        myScroll.scrollTo(0, 0);
    },
    //跳转到商品详情页面
    toDetails: function toDetails(id) {
        document.location.href = "html/business/shop/goods-detail.html?id=" + id + "&shopId=" + Util.common.getParameter("shopId");
    },
    //跳转到批量处理页面
    toBatchManager: function toBatchManager() {
        document.location.href = "html/business/shop/batch-manager.html?type=" + business.MangerShop.type + "&shopId=" + Util.common.getParameter("shopId");
    },
    searchBtn: function searchBtn(obj) {
        document.location.href = "html/business/shop/search-goods.html?goodsName=" + $('#goodSearchId').val() + "&shopId=" + Util.common.getParameter("shopId");
    },
    cancelBtn: function cancelBtn() {
        $(".my-header-search").hide();
        $("#my-header").show();
    },
    exchangeBtn: function exchangeBtn() {
        var searchVal = $('#goodSearchId').val();
        if (Util.string.isEmpty(searchVal)) {
            $("#submitBtn").html('<a  class="goods-search-cancel-a" data-role="none" href="#" onclick="business.MangerShop.cancelBtn(this)">取消</a>');
        } else {
            $("#submitBtn").html('<a  class="goods-search-cancel-a" type="button" data-role="none" href="#"  onclick="business.MangerShop.searchBtn(this)">搜索</a>');
        }
    }
};
//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function () {
    loaded("scroll-list");
}, false);
var myScroll;
//下拉刷新
function pullDownAction() {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction() {
    var url = Util.common.baseUrl;
    if (this.type == 1) {
        url += "/mobile/good/getSaleGoodList.do";
    } else {
        url += "/mobile/good/getUnshelveGoodList.do";
    }
    var param = {
        "shopId": Util.common.getParameter("shopId"),
        "pageSize": business.MangerShop.pageSize,
        "pageNum": business.MangerShop.pageNum + 1
    };
    Util.common.executeAjaxCallback(url, param, function (data) {
        if (data.length > 0) {
            $("#thelist").append($("#list_t").tmpl(data));
            business.MangerShop.pageNum += 1;
        }
        myScroll.refresh();
    });
}

//# sourceMappingURL=manager-shop-compiled.js.map