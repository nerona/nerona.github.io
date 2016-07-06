'use strict';

$(function () {
    //初始化加载元素
    customer.user.init();
});

var customer = customer || {};

customer.user = {
    //初始化加载元素
    init: function init() {
        this.loadPage();

        localStorage.setItem('addressPage', 'html/customer/user/user-info.html');
        $('#back').attr('href', 'html/customer/index.html?storeId=' + localStorage.getItem("shopId") + '&type=weixinIndex&userId=' + localStorage.getItem("userid"));
    },
    //初始化加载商品分类
    loadPage: function loadPage() {
        //var userId = "252415569891778560";
        var url = Util.common.baseUrl + "/weixin/weixinClient/loadMyInfo.do?id=" + localStorage.getItem("userid");
        var param = { "userId": localStorage.getItem("userid") };
        //test id
        //var param = {"userId": "252415569891778560"};
        Util.common.executeAjaxCallback(url, param, function (data) {
            console.log(data);

            $('#head-image').attr('src', data.msg.headimgurl || 'images/hdpi/mrtx_80.png');
            $('#type_0').html(data.msg.nickname);
            $('#type_1').html(data.msg.sex == '1' ? '男' : '女');
            $('#type_2').html(data.msg.city);

            localStorage.setItem('nickname', data.msg.nickname);
            /*$('#type_3').html(data.msg.tel);
            $('#type_4').html(data.msg.userName);
            $('#type_5').html(data.msg.birthday);
            $('#type_6').html(data.msg.personSign);*/
            $('#type_3').html(localStorage.getItem('my_mobile'));
            $('#type_4').html(localStorage.getItem('my_wx'));
            $('#type_5').html(localStorage.getItem('my_birthday'));
            $('#type_6').html(localStorage.getItem('my_sign'));
            //customer.user.loadTemplate("#shopping-cart-list", "#shopping_cart_list_t", datas);
        });
    },
    loadTemplate: function loadTemplate(render, templateId, data) {
        $(render).html($(templateId).tmpl(data));
    },
    //搜索框跳转
    searchEven: function searchEven() {
        setTimeout(function () {
            document.location.href = "html/customer/search/search.html";
        }, 300);
    }
};

//# sourceMappingURL=user-info-compiled.js.map