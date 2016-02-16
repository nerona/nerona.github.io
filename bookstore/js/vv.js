$(function () {
    $("#sendsns").on("click", add_mess);
    $("#lqbtn").on("click", commit);
});

/* 重新获取短信验证码按钮 */
function add_mess() {

    /* 电话号码 */
    var telephone = $("#tel_phone").val().trim();
    var pattern = /1[34578]{1}\d{9}$/; //手机号码匹配正则
    var hb_key=$('#hb_key').val().trim();
   if(!pattern.test(telephone)) {
        $.showError("", "请输入正确的手机号码！", 1500);
        return;
    }
    $("#sendsns").off("click", add_mess);
    $.ajax({
        type: "post",
        url: "/Hbtenbillion/sendMsg",
        data: {
            tel: telephone,
            hb_key:hb_key,
        },
        cache: false,
        timeout: 3000
    }).done(function (msg) {
        if (msg['code'] != 10000) {
            $.showError("", msg['data'], 1500);
            if(msg['data']=='手机号已注册')
            {
                window.location.href='/Hbtenbillion/Registered';
            }
            $("#sendsns").on("click", add_mess);
        } else {
            $.showError("", msg['data'], 1500);
            $("#sendsns").off("click", add_mess);
            /* 倒计时开始 */
            countDown($("#sendsns"), 60);

        }
    }).fail(function () {
        $.showError('', '网络超时，请重新点击', 1500);
        /* 重新获取 开启按钮 */
        $("#sendsns").on("click", add_mess);
    });
}

/* 倒计时 */
function countDown($ele, num) {
    var n = num;
    var time = setInterval(function () {
        n--;
        $ele.css({
            fontSize: "14px",
            // width: "120px",
            textAlign: "center",
            //backgroundColor: '#ccc',
            //color:'#fff'
        }).html(n + "s后重新发送").addClass('gg');
        if (n <= 0) {
            $ele.css({
                fontSize: "14px",
                // width: "100px",
                textAlign: "center",
                //backgroundColor:'#2B59B0)',
                //color:'#fff'
            }).html("重新发送验证码").removeClass('gg');
            /* 重新发送 开启按钮 */
            $ele.on("click", add_mess);
            clearInterval(time);
        }

    }, 1000);
};
//将电话号码提交到后台进行ajax请求
function commit() {
    var tel = $("#tel_phone").val();
    var password = $("#password").val();
    var tel_code = $("#tel_code").val();
     
    var hb_key=$('#hb_key').val();    
    var pattern = /1[34578]{1}\d{9}$/; //手机号码匹配正则
    if (!pattern.test(tel)) {
        $.showError("", "请输入正确的手机号码！", 1500);
    } else if (tel_code.length != 6) {
        $.showError('', '请输入短信验证码', 1500);
    } else if ($('.agree-icon').hasClass("no-icon")) {
        $.showError('', '请确认鲸鱼协议', 1500);
    } else if (!password) {
        $.showError("", "请设置登录密码", 1500);
    } else {
        /* 短信验证码OK 确认协议OK 手机号OK 登录密码OK 就可以AJAX了 */
        var ck_psw = pwdValidate(password);
        switch (ck_psw) {
            case 2:
                $.showError('', '密码格式不正确', 1500);
                break;
            case 3:
                $.showError('', '密码格式不正确', 1500);
                break;
            case 0:
                $.showError('', '密码格式不正确', 1500);
                break;
            case 1:
                /* 密码正确 */

                $.ajax({
                    type: "post",
                    url: "/Hbtenbillion/register",
                    data: {
                        tel: tel,
                        password: password,
                        tel_code: tel_code,
                        hb_key: hb_key
                    },
                    cache: false,
                    beforeSend: function () {
                        $(".reg-active").hide();
                        $('.reg-gray').show();
                        $("#lqbtn").addClass("disable").off("click", commit);
                        $.showError('', '正在处理您的请求，请稍后......', 1000);
                    },
                    success: function (data) {
                        if (data['code'] == 10000) {
                            $("#lqbtn").addClass("disable").off("click", commit);
                            window.location.href = data['data'];
                        } else {
                            $.showError('', data['data'], 1500);
                            $(".reg-active").show();
                            $('.reg-gray').hide();
                             $("#lqbtn").removeClass("disable").on("click", commit);
                        }
                    },
                    error: function (xhr, status, error) {
                        $(".reg-active").show();
                        $('.reg-gray').hide();
                        $('#lqbtn').removeClass("disable").on("click", commit);
                        $.showError('', '请求失败', 1500);
                    }
                });


                break;
            default:
                $.showError('', '密码格式不正确', 1500);
                break;

        }


    }




}




function pwdValidate(pwd) {
    /* 6-16位字符，字母开头，只包含字母数字下划线 */
    var pattern = /^[a-z | A-Z]\w{5,15}/;
    var pattern3 = /^(?=.*[^\d]).{6,16}$/;
    /* 6-16位字符 密码 */
    var pattern2 = /[0-9 | A-Z | a-z]{6,16}/;

    var password = pwd.trim();
    if (password == null || password == "") {
        /* 密码不能为空 */
        return 0;
    } else if (password.length >= 6 && password.length <= 16) {
        if (pattern3.test(password)) {
            /* 密码验证通过 */
            return 1;
        } else {
            /* 密码不合法 */
            return 2;
        }
    } else {
        /* 请输入6~16密码 */
        return 3;
    }
}