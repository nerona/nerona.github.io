"use strict";

$(function () {

    if (!Util.string.isEmpty(Util.common.getParameter("id"))) {
        $("#my-header h2").html("修改银行卡");
        business.bank.loadBank();
    }
});
var business = business || {};
business.bank = {
    submitBtn: function submitBtn() {

        var bankInfo = {};
        //name	姓名
        bankInfo.name = $("input[name=name]").val();
        //bankCard	银行卡号
        bankInfo.bankCard = $("input[name=bankCard]").val();
        //bankName	开户银行
        bankInfo.bankName = $("input[name=bankName]").val();
        //card	身份证号码
        bankInfo.card = $("input[name=card]").val();
        //mobile	手机号码
        bankInfo.mobile = $("input[name=mobile]").val();
        //shopId	店铺Id
        bankInfo.shopId = Util.common.getParameter("shopId");

        var param = { "param": JSON.stringify(bankInfo) };
        var url = Util.common.baseUrl + "/mobile/user/saveBankMsg.do";
        Util.common.executeAjaxCallback(url, param, function (data) {
            //{"msg":"操作成功","code":"0"}
            Util.msg.show("msgId", data.msg);
            if (data.code == 0) {
                history.back();
            }
        });
    },
    loadBank: function loadBank() {
        var url = Util.common.baseUrl + "/mobile/user/getBankCardList.do";
        var param = { "shopId": Util.common.getParameter("shopId"), "pageSize": "20", "pageNum": 1 };
        Util.common.executeAjaxCallback(url, param, function (data) {
            if (data.length > 0) {
                //id
                $("input[name=id]").val(data[0].id);
                //name	姓名
                $("input[name=name]").val(data[0].name);
                //bankCard	银行卡号
                $("input[name=bankCard]").val(data[0].bankCard);
                //bankName	开户银行
                $("input[name=bankName]").val(data[0].bankName);
                //card	身份证号码
                $("input[name=card]").val(data[0].card);
                //mobile	手机号码
                $("input[name=mobile]").val(data[0].mobile);
            }
        });
    }
};

//# sourceMappingURL=add-bank-card-compiled.js.map