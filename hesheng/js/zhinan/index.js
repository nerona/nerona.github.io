/**
 * Created by dell on 2016/6/30.
 */
var myScroll;// 引用滑动分页需定义此固定变量myScroll，下拉时刷新使用
/**
 * 下拉刷新 （自定义实现此方法）
 * 此处用延迟模拟数据，
 */
function pullDownAction() {
    /**
     *此处填写加载后台数据代码
     * 结束处记得要调用刷新myScroll.refresh();
     **/
    myScroll.refresh();
}
/**
 * 滚动翻页 （自定义实现此方法）
 */
function pullUpAction() {
    customer.guide.loadMore();
}
var Loader = {
    isLoading:false,
    request:function(url,data,cb){
        var loader = this;
        if(loader.isLoading){
            return;
        }
        loader.isLoading = true;
        Util.common.executeGetAjaxCallback(url,data,function(){
            loader.isLoading = false;
            cb.apply(null,arguments);
        });
    }
};
//
$(function(){
    $('.tab-item').on('click', function(){
        $(this).parent().find('.tab-active').removeClass('tab-active');
        $(this).addClass('tab-active');
        customer.guide.init();
    });
    $('.tab-laodong').on('click', function(){
        customer.guide.initLaodong();
    });
    $('.tab-jisheng').on('click', function(){
        customer.guide.initJisheng();
    });
    $('.tab-zonghe').on('click', function(){
        customer.guide.initZonghe();
    });
});
var customer = customer || {};

var param = {
    "page": 1,
    "limit": 60,
    "start": 0
};
customer.guide = {
    init: function(){
        $('#scroller').css("transform", "translate(0px,0px)");
    },
    initLaodong: function(){
        param.page = 1;
        param.start = 0;
        var url = Util.common.baseUrl + "serviceGuide/listServiceGuideByPage.do";
        $.extend(param, {
            "category": 1
        });
        localStorage.setItem('category', 1);
        Util.common.executeGetAjaxCallback(url, param, function(data){
            Util.common.loadTemplate("#zn-list", "#zn-list-t", data.entities.serviceGuides);
        });
    },
    initJisheng: function(){
        param.page = 1;
        param.start = 0;
        var url = Util.common.baseUrl + "serviceGuide/listServiceGuideByPage.do";
        $.extend(param, {
            "category": 2
        });
        localStorage.setItem('category', 2);
        Util.common.executeGetAjaxCallback(url, param, function(data){
            Util.common.loadTemplate("#zn-list", "#zn-list-t", data.entities.serviceGuides);
        });
    },
    initZonghe: function(){
        param.page = 1;
        param.start = 0;
        var url = Util.common.baseUrl + "serviceGuide/listServiceGuideByPage.do";
        $.extend(param, {
            "category": 3
        });
        localStorage.setItem('category', 3);
        Util.common.executeGetAjaxCallback(url, param, function(data){
            Util.common.loadTemplate("#zn-list", "#zn-list-t", data.entities.serviceGuides);
        });
    },
    initCard: function(){
        var data = [{
            "title": "个人简介1",
            "content": "1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理",
            "photo": "./../../images/zhinan/pic.png"
        },{
            "title": "个人简介2",
            "content": "1999年创办阿里巴巴，并担任阿里集团CEO、董事局主席",
            "photo": "./../../images/zhinan/pic.png"
        },{
            "title": "个人简介3",
            "content": "1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理",
            "photo": "./../../images/zhinan/pic.png"
        },{
            "title": "个人简介4",
            "content": "1999年创办阿里巴巴，并担任阿里集团CEO、董事局主席",
            "photo": "./../../images/zhinan/pic.png"
        },{
            "title": "个人简介5",
            "content": "1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理",
            "photo": "./../../images/zhinan/pic.png"
        }];
        Util.common.loadTemplate("#card-list", "#card-list-t", data);
    },
    loadMore: function(){
        param.page++;
        param.start += 6;
        param.category = localStorage.getItem('category');

        var url = Util.common.baseUrl + "serviceGuide/listServiceGuideByPage.do";
        Loader.request(url, param, function(data){
            if(data.success == true) {
                var tpl = $('#zn-list-t').tmpl(data.entities.serviceGuides);
                $("#zn-list").append(tpl);
            }
        });
    }
};