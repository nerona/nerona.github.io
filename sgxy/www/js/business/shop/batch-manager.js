$(function(){
    //初始化加载元素
    business.batchManger.init();
});
var business = business || {};
business.batchManger={
    pageSize:6, //默认一次加载6条
    pageNum:1,//默认为1
    type:1,//1 出售中，2 已下架商品
    init:function(){
        this.loadList();
        this.initManagerSubmit();
    },
    //初始化加载收藏列表
    loadList:function() {
        this.pageNum = 1; //切换tab重新查询
        var url = Util.common.baseUrl ;
        if (Util.common.getParameter("type") == 1) {
            url +=  "/mobile/good/getSaleGoodList.do";
        }else{
            url +=  "/mobile/good/getUnshelveGoodList.do";
        }
        var param = {"shopId":Util.common.getParameter("shopId"),"pageSize":this.pageSize ,"pageNum":this.pageNum};
        Util.common.executeAjaxCallback(url ,param,function(data){
            if( data.length>0 ) {
                $("#thelist").html($("#list_t").tmpl(data));
            }else{
                $("#thelist").html('<li><div class="no-goods-notice">  <img src="imgs/test-img/no-goods.png"/></div></li>');
            }
        });
    },
    initManagerSubmit:function(){
        var liHtml = "";
        //1 出售中，2 已下架商品
        if (Util.common.getParameter("type") == 1) {
            liHtml = '<a href="#" class="manager-down-a-ico" onclick="business.batchManger.setGoodOutShelve()"><b>下架</b></a>';
        }else{
            liHtml = '<a href="#" class="manager-put-a-ico" onclick="business.batchManger.setGoodShelve()"><b>上架</b></a>';
        }
        $("#managerSubmit").html(liHtml);
    },
    geCheckedGoodIds:function(){
        //多个商品Id用,隔开
        var arrChk=$("input[name='goodId']:checked");
        var goodIds = "";
        $(arrChk).each(function(){
            goodIds += this.value+",";
        });
        return goodIds;
    },
    //1.1.2.5	店铺商品上架 0-下架1-上架
    setGoodShelve:function(){
        var goodIds = this.geCheckedGoodIds();
        if(goodIds == ""){
            Util.msg.show("successShelveId","您没有选中商品");
            return ;
        }else{
            goodIds = goodIds.substring(0,goodIds.length-1);
        }
        var url = Util.common.baseUrl + "/mobile/good/setGoodShelve.do";
        var param = {"shopId": Util.common.getParameter("shopId"),"goodIds":goodIds};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if(data.code==0){
                $("#manager-box-btn-all").prop("checked", false);
                business.batchManger.loadList();//重新刷新页面
                myScroll.refresh();
                Util.msg.show("successShelveId","商品已经成功上架","imgs/test-img/put-scc-ico.png");
            }else{
                Util.msg.show("successShelveId","商品上架失败","imgs/test-img/put-scc-ico.png");
            }
        });
    },
    //1.1.2.6	店铺商品下架
    setGoodOutShelve: function () {
        var goodIds = this.geCheckedGoodIds();
        if(goodIds == ""){
            Util.msg.show("successShelveId","您没有选中商品");
            return ;
        }else{
            goodIds = goodIds.substring(0,goodIds.length-1);
        }
        var url = Util.common.baseUrl + "/mobile/good/setGoodOutShelve.do";
        var param = {"shopId": Util.common.getParameter("shopId"),"goodIds":goodIds};
        Util.common.executeAjaxCallback(url, param, function (data) {
            if(data.code==0){
                $("#manager-box-btn-all").prop("checked", false);
                business.batchManger.loadList();//重新刷新页面
                myScroll.refresh();
                Util.msg.show("successOutShelveId","商品已经成功下架","imgs/test-img/put-scc-ico.png");
            }else{
                Util.msg.show("successShelveId","商品下架失败","imgs/test-img/put-scc-ico.png");
            }
        });
    },
    //跳转到商品详情页面
    toDetails:function(id){
        document.location.href="html/business/shop/goods-detail.html?id="+id+"&shopId="+Util.common.getParameter("shopId");

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
    if (Util.common.getParameter("type") == 1) {
        url +=  "/mobile/good/getSaleGoodList.do";
    }else{
        url +=  "/mobile/good/getUnshelveGoodList.do";
    }
    var param = {"shopId":Util.common.getParameter("shopId"),"pageSize":business.batchManger.pageSize ,"pageNum":business.batchManger.pageNum + business.batchManger.pageSize};
    Util.common.executeAjaxCallback(url, param, function(data){
        if( data.length>0 ) {
            $("#thelist").append($("#list_t").tmpl(data));
            business.batchManger.pageNum +=  business.batchManger.pageSize;
        }else{
            //Util.msg.show("msgId","没有更多了");
        }
        myScroll.refresh();
    });
}