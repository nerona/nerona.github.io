var customer = customer || {};
customer.address={
    //初始化加载元素
    init:function(){
        this.loadList();
    },
    //初始化加载地址列表
    loadList:function(){
        var url = Util.common.baseUrl +"/weixin/addr/query.do";
        var param = {"userId ":"241553513600057344"};//"{value1:'a',value2:'b'}"
        if(isdebug){
            //测试数据
            var data = [{"id":"241957715631607808","receiptName":"张大大","mobile":"18950475586","fiexdPhone":"0592-3183811","receiptEmail":"25807211@qq.com","status":0,"provinceCode":"1","provinceName":"福建省","cityCode":"2","cityName":"厦门市","areaCode":"3","areaName":"思明区","detailAddr":"何愁134号","mailbox":"350100"},
                {"id":"241957711425126400","receiptName":"李小小","mobile":"18950475586","fiexdPhone":"0592-3183811","receiptEmail":"25807211@qq.com","status":1,"provinceCode":"1","provinceName":"福建省","cityCode":"2","cityName":"厦门市","areaCode":"3","areaName":"思明区","detailAddr":"何愁134号","mailbox":"350100"},
                {"id":"241957711425126400","receiptName":"大牛","mobile":"18950475586","fiexdPhone":"0592-3183811","receiptEmail":"25807211@qq.com","status":0,"provinceCode":"1","provinceName":"福建省","cityCode":"2","cityName":"厦门市","areaCode":"3","areaName":"思明区","detailAddr":"何愁134号","mailbox":"350100"},
                {"id":"241957711425126400","receiptName":"阿花","mobile":"18950475586","fiexdPhone":"0592-3183811","receiptEmail":"25807211@qq.com","status":0,"provinceCode":"1","provinceName":"福建省","cityCode":"2","cityName":"厦门市","areaCode":"3","areaName":"思明区","detailAddr":"何愁134号","mailbox":"350100"},
                {"id":"241957711425126400","receiptName":"小红","mobile":"18950475586","fiexdPhone":"0592-3183811","receiptEmail":"25807211@qq.com","status":0,"provinceCode":"1","provinceName":"福建省","cityCode":"2","cityName":"厦门市","areaCode":"3","areaName":"思明区","detailAddr":"何愁134号","mailbox":"350100"}];
            var datas ={"datas":data};
            this.loadTemplate("#address_list", "#address_list_t", datas);
        }else{
            this.executeAjax(url ,param ,"#address_list", "#address_list_t");
        }
    },
    //初始化加载编辑地址
    getAddressInfo:function(){
        var url = Util.common.baseUrl +"/weixin/addr/query.do";
        var param = {"userId ":"241553513600057344"};//"{value1:'a',value2:'b'}"
        if(isdebug){
            //测试数据
            var data = {"id":"241957715631607808","receiptName":"张大大","mobile":"18950475586","fiexdPhone":"0592-3183811","receiptEmail":"25807211@qq.com","status":0,"provinceCode":"1","provinceName":"福建省","cityCode":"2","cityName":"厦门市","areaCode":"3","areaName":"思明区","detailAddr":"何愁134号","mailbox":"350100"};
            this.loadTemplate("#addressInfo", "#addressInfo_t", data);
        }else{
            this.executeAjax(url ,param ,"#addressInfo", "#addressInfo_t");
        }
    },
    //添加地址
    addAddress:function(){
        var url = Util.common.baseUrl +"/weixin/addr/save.do";
        var mailbox = $("input[name=mailbox]").val();
        var receiptName = $("input[name=receiptName]").val();
        var mobile = $("input[name=mobile]").val();
        var provinceName = $("input[name=provinceName]").val();
        var cityName = $("input[name=cityName]").val();
        var areaName = $("input[name=areaName]").val();
        var provinceCode = $("input[name=provinceCode]").val();
        var cityCode = $("input[name=cityCode]").val();
        var areaCode = $("input[name=areaCode]").val();
        var detailAddr = $("input[name=detailAddr]").val();

        var param ={"userId":"1","status":"1","mailbox":mailbox,"receiptName":receiptName,"mobile":mobile,"fiexdPhone":"","receiptEmail":"",
            "provinceName":provinceName,"provinceCode":provinceCode,"cityCode":cityCode,"cityName":cityName,"areaName":areaName,"areaCode":areaCode,"detailAddr":detailAddr}
        Util.common.executeAjaxCallback(url ,param,function(data){
            //{"msg":"操作成功","code":"000000"}
            alert(data.msg);
        });
    },
    //删除地址
    delAddress:function(id){
        //测试
        alert("测试删除"+id);
        var url = Util.common.baseUrl +"/weixin/addr/ delete.do";
        var param = {"userId":userId,"ids":id};
        Util.common.executeAjaxCallback(url ,param,function(data){
            //{"msg":"操作成功","code":"000000"}
            alert(data.msg);
        });
    },
    //修改地址
    updatAddress:function(){
        var url = Util.common.baseUrl +"/weixin/addr/update.do";

        var id = $("input[name=id]").val();
        var mailbox = $("input[name=mailbox]").val();
        var receiptName = $("input[name=receiptName]").val();
        var mobile = $("input[name=mobile]").val();
        var provinceName = $("input[name=provinceName]").val();
        var cityName = $("input[name=cityName]").val();
        var areaName = $("input[name=areaName]").val();
        var provinceCode = $("input[name=provinceCode]").val();
        var cityCode = $("input[name=cityCode]").val();
        var areaCode = $("input[name=areaCode]").val();
        var detailAddr = $("input[name=detailAddr]").val();

        var param ={"id":Util.common.getParameter("id"),"userId":"1","status":"1","mailbox":mailbox,"receiptName":receiptName,"mobile":mobile,"fiexdPhone":"","receiptEmail":"",
            "provinceName":provinceName,"provinceCode":provinceCode,"cityCode":cityCode,"cityName":cityName,"areaName":areaName,"areaCode":areaCode,"detailAddr":detailAddr};
        Util.common.executeAjaxCallback(url ,param,function(data){
            //{"msg":"操作成功","code":"000000"}
            alert(data.msg);
        });
    },
    //设置默认地址
    setDefaultAddress:function(obj, id){
        var url = Util.common.baseUrl + "/weixin/addr/update_status.do";
        var param = {"id": id, "userId": "1"};
        Util.common.executeAjaxCallback(url, param, function (data) {
            //{"msg":"操作成功","code":"000000"}
            alert(data.msg);
        });
    },
    saveOrUpate:function(){
        if('edit'==Util.common.getParameter("type")){
            alert("测试编辑"+Util.common.getParameter("id"));
            this.updatAddress();
        }else{
            alert("测试添加");
            this.addAddress();
        }
    },
    executeAjax:function(url ,param ,render ,templateId){
        Util.common.executeAjaxCallback(url ,param,function(data){
            this.loadTemplate(render,templateId,data);
        });
    },
    loadTemplate:function(render ,templateId ,data ){
        $(render).html($(templateId).tmpl(data));
    },
    toAddAddress:function(){
        document.location.href='html/customer/address/edit.html?type=add';
    }
}
