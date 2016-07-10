$(function(){
    customer.judge.init();
    $(".judge-main-score img").on("click", function(){
        var index = $(this).attr("index");
        localStorage.setItem('score', parseInt(index)+1);
        $(this).parent().find("img").each(function(i){
            if(i<=index){
                $(this).attr("src","images/hdpi/wddd_pj_xx.png");
            }else{
                $(this).attr("src","images/hdpi/wddd_pj.png");
            }
        });
    });
    /*var $input = $('<input type="file" accept="image/!*" name="judge-images" id="selectPic">');
    var upload_img = '';
    $('#add_img').on('click', function(){
        $('.judge-content-dl').append($input);
        setTimeout(function(){
            $('#selectPic').click();
        }, 1);
        $('#selectPic').change(function(){
            var src = window.URL.createObjectURL(document.getElementById('selectPic').files[0]);
            console.log(src);
            var $img = '<img src="' + src + '" style="margin-right: 2%;">';
            $('.images-list').prepend($img);
            $input.remove();
            upload_img += src + ',';
            //upload_img = upload_img.substr(0, upload_img.length - 1);
            localStorage.setItem('upload_img', upload_img);
        });
    });*/
});
var customer = customer || {};
customer.judge = {
    init: function(){
        var data = Util.common.getParameter('goodModel');
        var result = JSON.parse(data);
        for(var i=0;i<result.length;i++) {
            result[i].num = i+1;
        }
        console.log(result);
        customer.judge.loadTemplate('#judge-info', '#good-info-t', result);
    },
    loadTemplate: function (render, templateId, data) {
        $(render).html($(templateId).tmpl(data));
    },
    submit: function(){
        var userid = localStorage.getItem('userid');
        var username = localStorage.getItem('nickname');
        var url = Util.common.baseUrl+ "/weixin/good/addEvaluation.do";
        var model = JSON.parse(Util.common.getParameter('goodModel'));
        for (var i = 0, len = model.length; i < len; i++) {
            var modelJson = {};
            var goodSkuId = model[i].goodSkuId;
            var score = localStorage.getItem('score') || 5;
            var content = $('.judge-content-dl textarea')[i].value;
            
            var logo1 = localStorage.getItem('img_list_'+[i+1]).split(',');

            modelJson.goodSkuid = goodSkuId;
            modelJson.user = userid;
            if($('#nm-judge-radio-' + i).is(':checked')){
                modelJson.username = "匿名";
            } else {
                modelJson.username = username;
            }
            modelJson.content = content;
            modelJson.score = score;
            modelJson.indentId = model[i].indentId;
            var param = {"modelJson": JSON.stringify(modelJson), "logo1": JSON.stringify(logo1)};
            console.log(JSON.stringify(param));
            Util.common.executeAjaxCallback(url, param, function (data) {
                console.log(data);
                if (data.success == true) {
                    Util.msg.show('msgId', "评价成功，跳转中...");
                    setTimeout(function () {
                        document.location.href = 'html/customer/order/index.html';
                    }, 2000);
                }
            });
        }
    }
};
