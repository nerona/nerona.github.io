var myScroll;// 引用滑动分页需定义此固定变量myScroll，下拉时刷新使用
/**
 * 下拉刷新 （自定义实现此方法）
 * 此处用延迟模拟数据，
 */
function pullDownAction () {
    /**
     *此处填写加载后台数据代码
     * 结束处记得要调用刷新myScroll.refresh();
     **/
    myScroll.refresh();
}

/**
 * 滚动翻页 （自定义实现此方法）
 */
function pullUpAction () {
    if(isdebug){
        setTimeout(function () {
            /*for (var i=1; i<6; i++) {
             var list='<li><div class="good-grid-info">'+
             '<div class="good-grid-a"><img src="images/test-img/goods.png"></div>'+
             '<div><span>'+i+'云南七子饼普洱茶</span></div>'+
             '<div class="good-grid-b">'+
             '<span><em><s>￥1888</s></em></span>'+
             '<span><img src="images/hdpi/grzx_wddd.png"></span>'+
             '</div>'+
             '<div class="good-grid-c" style="font-size: 1.2rem;">'+
             '<span><em style="color:#ff6e82;">￥889.00</em></span>'+
             '<span class="good-grid-c-sell">月销2680</span>'+
             '</div>'+
             '</div></li><li></li>';
             $("#thelist").append(list);
             }*/
            var data = [{"id":"238986851953229875","cargoId":"23898685195322987","showPicture":"http://7xk1l7.dl1.z0.glb.clouddn.com/1461720581680f334fcb.jpg","name":"龙井2016新茶 春茶 清承堂 茶叶 绿茶 龙井茶 西湖散装 浓香耐泡","marketPrice":17.53,"salePrice":16.53,"saleNum":16,"columnId":"238986851953229875","columnName":"团购专区"},
                {"id":"238986851953229875","cargoId":"23898685195322987","showPicture":"http://7xk1l7.dl1.z0.glb.clouddn.com/1461720581680f334fcb.jpg","name":"雨前茶春茶 2016新茶100g老胜香茶叶 龙井茶 绿茶 新昌大佛龙井 ","marketPrice":17.53,"salePrice":16.53,"saleNum":16,"columnId":"238986851953229875","columnName":"团购专区"},
                {"id":"238986851953229875","cargoId":"23898685195322987","showPicture":"http://7xk1l7.dl1.z0.glb.clouddn.com/1461720581680f334fcb.jpg","name":"云南七子饼357g 茶叶 普洱熟茶拍下9.9 祥珊 普洱茶熟茶 国色天香","marketPrice":17.53,"salePrice":16.53,"saleNum":16,"columnId":"238986851953229875","columnName":"团购专区"},
                {"id":"238986851953229875","cargoId":"23898685195322987","showPicture":"http://7xk1l7.dl1.z0.glb.clouddn.com/1461720581680f334fcb.jpg","name":"檬片 柠檬茶泡水 茶叶花茶花草茶买一发二 柠檬片泡茶 蜂蜜冻干柠","marketPrice":17.53,"salePrice":16.53,"saleNum":16,"columnId":"238986851953229875","columnName":"团购专区"},
                {"id":"238986851953229875","cargoId":"23898685195322987","showPicture":"http://7xk1l7.dl1.z0.glb.clouddn.com/1461720581680f334fcb.jpg","name":"祁红香螺安徽历口原产地茶农价买一送一 祁门红茶2016新茶叶特级","marketPrice":17.53,"salePrice":16.53,"saleNum":16,"columnId":"238986851953229875","columnName":"团购专区"},
                {"id":"238986851953229875","cargoId":"23898685195322987","showPicture":"http://7xk1l7.dl1.z0.glb.clouddn.com/1461720581680f334fcb.jpg","name":"音王茶叶正品1725春茶散装乌龙茶新茶铁观音浓香型特级兰花香铁观","marketPrice":17.53,"salePrice":16.53,"saleNum":16,"columnId":"238986851953229875","columnName":"团购专区"}];
            $("#thelist").append($("#search_goodlist_t").tmpl(data));
            myScroll.refresh();		//调用刷新页面myScroll.refresh();
        }, 1000);
    }else{
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: url,
            data: param,
            dataType: 'json',
            success: function(result) {
                $("#thelist").append($(templateId).tmpl(result));
                myScroll.refresh();		//调用刷新页面myScroll.refresh();
            }
        });
    }
}
//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function(){loaded("good-grid-id")}, false);
$(document).bind('mobileinit',function(){
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

$(function(){
    customer.search.init();
});

var customer = customer || {};
customer.search = {
    init:function(){
        this.initParameter();
        this.initGoodList();
    },
    //商品分类跳转过来参数初始化 参数title=茶叶&classify=238986851953229824&type=classify
    initParameter: function () {
        var title = Util.common.getParameter("title");
        if(title!=null&&title!=''){
            $("#pageTitle").html(title);
        }
        var classify = Util.common.getParameter("classify");
        if(classify!=null&&classify!=''){
            $("#classifyId").attr('classify',classify);
            //保存选择的分类id,默认为链接过来的父分类ID
            $("#selectClassifyId").val(classify);
        }
        var searchText = Util.common.getParameter("searchText");
        if(searchText!=null&&searchText!=''){
            $("#goodSearchId").val(searchText);
        }
    },
    //分类下拉
    showClassify:function(obj){
        $("#searchFilterPopup").hide();
        $('#searchFilterId').css("color","#000");
        if( $("#teaNavbarPopup").css("display") == 'block' ){
            $('#classifyId').css("color","#000");
            $("#teaNavbarPopup").hide();
            return;
        }else{
            $('#classifyId').css("color","#ff6e82");
            $("#teaNavbarPopup").show();
        }

        var url = Util.common.baseUrl + "/weixin/good/childType.do";
        var param = { parented:$(obj).attr('classify'), status:1};
        if(isdebug){
            //测试数据
            var data = [{"id":"1111111","name":Util.common.getParameter("title")+1,"parentId":"238986851953229826" },
                {"id":"1111112","name":Util.common.getParameter("title")+2,"parentId":"238986851953229826" },
                {"id":"1111113","name":Util.common.getParameter("title")+3,"parentId":"238986851953229826" },
                {"id":"1111114","name":Util.common.getParameter("title")+4,"parentId":"238986851953229826" }];
            //添加一条全部，全部默认为父节点
            data.unshift({"id":$(obj).attr('classify'),"name":"全部","parentId": ""});
            var datas ={"datas":data};
            this.loadTemplate("#teaNavbarPopup", "#search_classify_a_t", datas);
        }else{
            this.executeAjax(url ,param ,"#teaNavbarPopup", "#search_classify_a_t");
        }
        $("#teaNavbarPopup").show();
    },
    //下拉分类菜单
    nextClassify:function(obj,parentId,parentName){
        $("#selectClassifyId").val(parentId);
        var url = Util.common.baseUrl + "/weixin/good/childType.do";
        var param = { parented:parentId, status:1};
        if(isdebug){
            //测试数据
            var data = [{"id":"222221","name":parentName+1,"parentId":"238986851953229826" },
                {"id":"222222","name":parentName+2,"parentId":"238986851953229826" },
                {"id":"222223","name":parentName+3,"parentId":"238986851953229826" },
                {"id":"222224","name":parentName+4,"parentId":"238986851953229826" }];
            //添加一条全部，全部默认为父节点
            data.unshift({"id":parentId,"name":"全部","parentId": ""});
            var datas ={"datas":data};

            this.loadTemplate("#menu-b", "#search_classify_b_t", datas);
        }else{
            this.executeAjax(url ,param ,"#menu-b", "#search_classify_b_t");
        }

        $("#teaNavbarPopup div:first-child").removeClass("ui-grid-b");
        $("#teaNavbarPopup div:first-child").addClass("ui-grid-a");
        $("#menu-c").html("");
        $('#menu-a li').css("background-color", "#FFF");
        $(obj).css("background-color", "#F2F2F2");
    },
    lastClassify:function(obj,parentId,parentName){
        $("#selectClassifyId").val(parentId);
        var url = Util.common.baseUrl + "/weixin/good/childType.do";
        var param = { parented:parentId, status:1};
        if(isdebug){
            //测试数据
            var data = [{"id":"333331","name":parentName+1,"parentId":"238986851953229826" },
                {"id":"333332","name":parentName+2,"parentId":"238986851953229826" },
                {"id":"333333","name":parentName+3,"parentId":"238986851953229826" },
                {"id":"333334","name":parentName+4,"parentId":"238986851953229826" }];
            //添加一条全部，全部默认为父节点
            data.unshift({"id":parentId,"name":"全部","parentId": ""});
            var datas ={"datas":data};

            this.loadTemplate("#menu-c", "#search_classify_c_t", datas);
        }else{
            this.executeAjax(url ,param ,"#menu-c", "#search_classify_b_t");
        }
        $("#teaNavbarPopup div:first-child").removeClass("ui-grid-a");
        $("#teaNavbarPopup div:first-child").addClass("ui-grid-b");
        $('#menu-b li').css("background-color", "#F2F2F2");
        $(obj).css("background-color", "#E6E6E6");
    },
    getClassify:function(obj,parentId,parentName){
        $("#selectClassifyId").val(parentId);
    },
    initGoodList:function(){
        var url = Util.common.baseUrl+ "/weixin/good/getGoodList.do";
        var conditionStr={"shopId":localStorage.getItem('shopId'),"goodName":"","pageSize":"","pageNum":"","classifyId":"",
            "saleNumSort":"","priceSort":"","startPrice":"","endPrice":"","brandId":"","labelId":"",
            "columnId":""};
        var param = {"conditionStr":JSON.stringify(conditionStr)};
        Util.common.executeAjaxCallback(url, param, function (data) {
            customer.search.loadTemplate("#thelist", "#search_goodlist_t", data);
        });
    },
    //切换排序
    changeToAsc:function (obj) {
        if($(obj).attr("value")==1){ // 降序->升序
            $(obj).removeClass("ui-icon-splb-xx");
            $(obj).addClass("ui-icon-splb-xs");
            $(obj).attr("value",2);
        }else{ // 升序->降序
            $(obj).removeClass("ui-icon-splb-xs");
            $(obj).addClass("ui-icon-splb-xx");
            $(obj).attr("value",1);
        }
    },
    //弹出筛选框
    showSearchFilter:function(obj){
        $("#teaNavbarPopup").hide();
        $('#classifyId').css("color","#000");

        if( $("#searchFilterPopup").css("display") == 'block' ){
            $('#searchFilterId').css("color","#000");
            $("#searchFilterPopup").hide();
            return;
        }else{
            $('#searchFilterId').css("color","#ff6e82");
            $("#searchFilterPopup").show();
        }
    },
    //筛选框确定事件
    sureBtnfileter:function(){
        $('#searchFilterId').css("color","#000");
        $("#searchFilterPopup").hide();
    },
    executeAjax:function(url ,param ,render ,templateId){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: url,
            data: param,
            dataType: 'json',
            success: function(result) {
                this.loadTemplate(render,templateId,result[0].row);
            }
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        // $(render).loadTemplate(templateId, data);
        $(render).html($(templateId).tmpl(data));
    },
    //获取元素的纵坐标
    getTop:function (e){
        var offset=e.offsetTop;
        if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
        return offset;
    },
    //获取元素的横坐标
    getLeft:function(e){
        var offset=e.offsetLeft;
        if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
        return offset;
    }
}