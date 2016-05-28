$(function () {
    $(".all-type-p").on("click",function () {
        $(".article-bar-list").show();
        $("body").css({"overflow":"hidden"});
    });
    $(".my-header-ddd-btn").on("click",function () {
        $('#goodSearchId').val('');
        $(".my-header-search").show();
        $("#my-header").hide();
    });
    /*$(".article-bar-list").on("click", function (e) {
     var target = $(e.target);
     if(target.closest(".share-content").length == 0){
     $(this).hide();
     $("body").css({"overflow":"visible"});
     }
     });*/
    //监听搜索框变化事件,以切换搜索与取消显示
    $('#goodSearchId').bind('input propertychange', function (event) {
        business.study.exchangeBtn();
    });
    $(".clear-a-text").on("click",function () {
        $('#goodSearchId').val('');
        business.study.exchangeBtn();
    });
    //初始化加载元素
    business.study.init();
});
var business = business || {};
business.study = {
    pageSize: 6, //默认一次加载6条
    pageNum: 1,//默认为1
    conditions:"%%",
    studyType:'0', // 一级分类 ，默认全部为0
    studyChildType:'0', // 二级分类 ，默认全部为0
    createTimeOrder:'asc',//时间排序 ，默认asc
    readNumOrder:'asc',//阅读排序 ，默认asc
    type:'0',
    init: function () {
        this.loadParentClassify();
        this.loadList();
    },
    //初始化加载
    loadList: function () {
        var url = Util.common.baseUrl + "/event/onlineStudy/mobile/findAllForMobile.do";
        var conditionS = {};
        conditionS.conditions=business.study.conditions;
        conditionS.studyType=business.study.studyType;
        conditionS.studyChildType=business.study.studyChildType;
        conditionS.createTimeOrder=business.study.createTimeOrder;
        conditionS.readNumOrder=business.study.readNumOrder;
        conditionS.type=business.study.type;

        var param = {
            conditionStr: JSON.stringify(conditionS),
            limit: this.pageSize,
            start: this.pageNum
        };
        Util.common.executeAjaxCallback(url, param, function (data) {
            if(data.resultList.length>0){
                $("#thelist").html($("#study_list_t").tmpl(data.resultList));
            }else{
                $("#thelist").html('<li style="border-bottom: none;"><div style="text-align: center;color:  #999999;margin-top: 8rem;border-bottom: none;"> 没有数据了</div></li>');
            }
        });
    },
    loadParentClassify:function(){
        var url = Util.common.baseUrl + "/event/onlineStudyType/mobile/getMobileParentList.do";
        Util.common.executeAjaxCallback(url, {}, function (data) {
            data.unshift({"id":0,"name":"全部分类"});
            var datas = {"datas":data};
            $("#article-bar-list").html($("#classify_a_t").tmpl(datas));
        });
    },
    loadSecondClassify:function(obj, parentId){
        business.study.studyType = parentId;
        $('#menu-a li').css("background-color", "#F5F5F5");
        $(obj).css("background-color", "#FFF");
        var url = Util.common.baseUrl + "/event/onlineStudyType/mobile/getMobileListByParentId.do";
        Util.common.executeAjaxCallback(url, {parentId:parentId}, function (data) {
            data.unshift({"id":0,"name":"全部"});
            $("#menu-b ul").html($("#classify_b_t").tmpl(data));
        });
    },
    classifyClick:function(classifyId,classifName){
        business.study.studyChildType = classifyId;
        /*$("#article-bar-list").find("li").removeClass("checked-bar");
        $(obj).addClass("checked-bar");
        $(".article-bar-list").hide();
        $("body").css({"overflow":"visible"});*/
        $(".article-bar-list").hide();
        $(".all-type-p").html(classifName);
        business.study.loadList();
    },
    setCreateTimeOrder:function(obj){
        if(business.study.createTimeOrder=='asc'){
            business.study.createTimeOrder = 'desc';
        }else{
            business.study.createTimeOrder = 'asc';
        }
        business.study.loadList();
    },
    setReadNumOrder:function (obj){
        if(business.study.readNumOrder=='asc'){
            business.study.readNumOrder = 'desc';
        }else{
            business.study.readNumOrder = 'asc';
        }
        business.study.loadList();
    },
    cancelBtn:function(){
        $(".my-header-search").hide();
        $("#my-header").show();
    },
    exchangeBtn:function(){
        var searchVal = $('#goodSearchId').val();
        if(Util.string.isEmpty(searchVal)){
            $("#submitBtn").html('<a  class="goods-search-cancel-a" data-role="none" href="#" onclick="business.study.cancelBtn(this)">取消</a>');
        }else{
            business.study.conditions = "%"+searchVal+"%";
            $("#submitBtn").html('<a  class="goods-search-cancel-a" data-role="none" href="#"  onclick="business.study.loadList(this)">搜索</a>');
        }
    }
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function () {
    loaded("study_list")
}, false);
var myScroll;
//下拉刷新
function pullDownAction() {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction() {
    var url = Util.common.baseUrl + "/event/onlineStudy/mobile/findAllForMobile.do";
    business.study.pageNum = business.study.pageNum + business.study.pageSize;
    var conditionS = {};
    conditionS.conditions="%%";
    conditionS.studyType=business.study.studyType;
    conditionS.studyChildType=business.study.studyChildType;
    conditionS.createTimeOrder=business.study.createTimeOrder;
    conditionS.readNumOrder=business.study.readNumOrder;
    conditionS.type=business.study.type;

    var param = {
        conditionStr: JSON.stringify(conditionS),
        limit: business.study.pageSize,
        start: business.study.pageSize + business.study.pageNum
    };
    Util.common.executeAjaxCallback(url, param, function (data) {
        if (data.resultList.length > 0) {
            $("#thelist").append($("#study_list_t").tmpl(data.resultList));
        }
        myScroll.refresh();		//调用刷新页面myScroll.refresh();
    });
}
/**
 * 单击营销推广一级分类列表
 */
/*function classifyClick(classifyId){
    business.study.loadSecondClassify(classifyId);
}*/
/**
 * 单击营销推广二级分类列表
 */
/*
function classifyClick(obj, classifyId){
    $("#article-bar-list").find("li").removeClass("checked-bar");
    $(obj).addClass("checked-bar");
    $(".article-bar-list").hide();
    $("body").css({"overflow":"visible"});
    business.study.loadList(classifyId);
}*/
