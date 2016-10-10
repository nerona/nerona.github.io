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
    customer.safety.loadMore();
}
var Loader = {
    isLoading: false,
    request: function (url, data, cb) {
        var loader = this;
        if (loader.isLoading) {
            return;
        }
        loader.isLoading = true;
        common.Util.executeGetAjaxCallback(url, data, function () {
            loader.isLoading = false;
            cb.apply(null, arguments);
        });
    }
};

var customer = customer || {};

var url = common.Util.baseUrl + "safeProduction/listByPage.do";
var param = {
    "page": 1,
    "limit": 8,
    "start": 0
};

customer.safety = {
    init: function() {
        common.Util.executeGetAjaxCallback(url, param, function (data) {
            if(data.success == true) {
                var result = data.entities.safeProductions;
                console.log(result);
                common.Util.loadTemplate('#list', '#list-t', result);
            }
        })
    },
    loadMore: function () {
        param.page++;
        param.start += 8;

        Loader.request(url, param, function (data) {
            if (data.success == true) {
                var result = data.entities.safeProductions;
                if(result != '') {
                    var tpl = $("#list-t").tmpl(result);
                    $("#list").append(tpl);
                } else {
                    $('.no-more').show();
                    setTimeout(function(){
                        $('.no-more').hide();
                    }, 1000);
                }
            }
            myScroll.refresh();		//调用刷新页面myScroll.refresh();
        });
    }
};
