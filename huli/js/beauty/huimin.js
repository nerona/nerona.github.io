$(function(){
    "use strict";
    customer.huimin.init();
});

var customer = customer || {};

customer.huimin = {
    init: function() {
        "use strict";
        var url = common.Util.baseUrl + "benefitingThePeople/nonPublicParty/listByPage.do";
        var param = {
            "page": 1,
            "limit": 12,
            "start": 0
        };

        common.Util.executeGetAjaxCallback(url, param, function (data) {
            console.log(data);
        })
    }
};
