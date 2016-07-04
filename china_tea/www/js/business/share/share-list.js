$(function () {
    $(".all-type-p").on("click", function () {
        $(".article-bar-list").show();
        $("body").css({"overflow": "hidden"});
    });
    $(".article-bar-list").on("click", function (e) {
        var target = $(e.target);
        if (target.closest(".share-content").length == 0) {
            $(this).hide();
            $("body").css({"overflow": "visible"});
        }
    });
    //初始化加载元素
    business.share.init();
});
var business = business || {};
business.share = {
    pageSize: 6, //默认一次加载6条
    pageNum: 0,//默认为1
    classifyId: '',
    updateTime: '',//排序:填入”1”,否则填空就行
    readNum: '',//排序:填入”1”,否则填空就行
    init: function () {
        this.loadList();
        this.loadClassify();
    },
    //初始化加载
    loadList: function () {
        var url = Util.common.baseUrl + "/mobile/getSpreadList.do";
        var conditionS = {
            classifyId: business.share.classifyId,
            updateTime: business.share.updateTime,
            readNum: business.share.readNum
        };
        var param = {
            conditionStr: JSON.stringify(conditionS),
            start: this.pageNum
        };
        //this.executeAjax(url, param, "#thelist", "#share_list_t");
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data && data.length > 0) {
                $("#thelist").html($("#share_list_t").tmpl(data));
            } else {
                $("#thelist").html('<li style="border-bottom: none;"><div style="text-align: center;color:  #999999;margin-top: 8rem;border-bottom: none;"> 没有数据了</div></li>');
            }
        });
    },
    loadClassify: function () {
        var url = Util.common.baseUrl + "/mobile/findAllSpreadClassifyOnStatus.do";
        Util.common.executeAjaxCallback(url, {}, function (data) {
            $("#share_classify_t").tmpl(data).appendTo('#theclassify');
        });
    },
    setCreateTimeOrder: function (obj) {
        business.share.readNum = '';
        if (business.share.updateTime == '') {
            business.share.updateTime = '1';
        } else {
            business.share.updateTime = '';
        }
        business.share.loadList();
        this.pageNum = 0;
    },
    setReadNumOrder: function (obj) {
        business.share.updateTime = '';
        if (business.share.readNum == '') {
            business.share.readNum = '1';
        } else {
            business.share.readNum = '';
        }
        business.share.loadList();
        this.pageNum = 0;
    },
    executeAjax: function (url, param, render, templateId) {
        Util.common.executeAjaxCallback(url, param, function (data) {
            $(render).html($(templateId).tmpl(data));
        });
    },
    loadTemplate: function (render, templateId, data) {
        $(render).html($(templateId).tmpl(data));
    },
    /**
     * 单击营销推广分类列表
     */
    classifyClick: function (obj, classify) {
        $("#article-bar-list").find("li").removeClass("checked-bar");
        $(obj).addClass("checked-bar");
        $(".article-bar-list").hide();
        $("body").css({"overflow": "visible"});
        $(".all-type-p").html(obj.innerText);
        business.share.classifyId = classify
        business.share.loadList();
        this.pageNum = 0;
    }
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function () {
    loaded("share_list")
}, false);
var myScroll;
//下拉刷新
function pullDownAction() {
    myScroll.refresh();
}
//滚动翻页 （自定义实现此方法）
function pullUpAction() {
    var url = Util.common.baseUrl + "/mobile/getSpreadList.do";
    var pageNum = business.share.pageNum + business.share.pageSize;
    var param = {
        conditionStr: '{"conditions":"%%","studyType":"0","studyChildType":"0","createTimeOrder":"asc","readNumOrder":"asc","type":"0"}',
        limit: business.share.pageSize,
        start: pageNum
    };
    Util.common.executeAjaxCallback(url, param, function (data) {
        if (data && data.length > 0) {
            business.share.pageNum = pageNum;
        }
        $("#thelist").append($("#share_list_t").tmpl(data));
        myScroll.refresh();		//调用刷新页面myScroll.refresh();
    });
}
