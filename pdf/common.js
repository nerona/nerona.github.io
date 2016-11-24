(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        if(windowWidth < 750) {
        	html.style.fontSize = windowWidth / 7.5 + 'px';
        } else {
        	html.style.fontSize = '80px';
        }
        
    }, false);
})();


var common = common || {};

common.Util = {
	setWxTitle:function(title){
	   setTimeout(function(){
	       $('head title').html(title);
	   },300);
	   //需要jQuery
	   var $body = $('body');
	   document.title = title;
	   // hack在微信等webview中无法修改document.title的情况
	   var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	   $iframe.on('load',function() {
	       setTimeout(function() {
	           $iframe.off('load').remove();
	       }, 0);
	   }).appendTo($body);
	},
}
/*定义校验工具对象*/
common.validate = {
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    isAndroid: function () {
        return window.navigator.userAgent.match(/Android/i) ? true : false;
    },
    isIos: function () {
        return window.navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    }

};

/*加载中*/
common.loading = {
	show: function(){
		var $load = $('<div class="loading-box"><div class="loading"></div></div>');
		$('body').append($load);
	},
	hide: function(){
		$('.loading-box').remove();
	}
}

/*tab menu*/
common.tab = {
	show: function(){
		var $tab = $('<nav class="tab flex-line"><div class="flex-item flex-item-four flex-home tab-home"><img src="${ctxPath }/m/new/images/shouye_gray.png" alt=""><p>首页</p></div><div class="flex-item flex-item-four flex-fugui tab-fugui"><img src="${ctxPath }/m/new/images/gongxiangfugui_gray.png" alt=""><p>共享富贵</p></div><div class="flex-item flex-item-four flex-e tab-e"><img src="${ctxPath }/m/new/images/e_gray.png" alt=""><p>e琇时代</p></div><div class="flex-item flex-item-four flex-my tab-my"><img src="${ctxPath }/m/new/images/wo_gray.png" alt=""><p>我的</p></div></nav>');
		$('.page-group').append($tab);
	},
	hide: function(){
		$('.tab').remove();
	}
}

/*定义提示框*/
common.tipBox = {
    /*
     *content：提示的文本内容
     */
    show: function (content) {
        var popup = $('<div class="box-mask">' +
        		'<div class="tip-box">' +
        		'<p class="tip-title">提&nbsp;&nbsp;示</p>' +
        		'<div class="flex-line">' +
        		'<div class="tip-icon"><span></span></div>' +
        		'<div class="tip-text">'+ content +'</div>' +
        		'</div>' +
        		'<div class="tip-btns flex-line">' +
        		'<div class="tip-btn tip-btn-cancel">取消</div>' +
        		'<div class="tip-btn tip-btn-active">确定</div>' +
        		'</div></div></div>');
        $('body').append(popup);
        $('.box-mask').show();
    },
    hide: function(){
    	$('.box-mask').remove();
    }
};
/*定义提示框--可定制*/
common.confirmBox = {
    /*
     * title: 标题
     * content: 提示的文本内容
     * btn1: 取消按钮
     * btn2: 确定按钮
     */
    show: function (title, content, btn1, btn2) {
        var popup = $('<div class="box-mask">' +
        		'<div class="tip-box confirm-box">' +
        		'<p class="tip-title">'+ title +'</p>' +
        		'<div class="flex-line">' +
        		'<div class="tip-icon"><span></span></div>' +
        		'<div class="tip-text">'+ content +'</div>' +
        		'</div>' +
        		'<div class="tip-btns flex-line">' +
        		'<div class="tip-btn tip-btn-cancel">'+ btn1 +'</div>' +
        		'<div class="tip-btn tip-btn-active">'+ btn2 +'</div>' +
        		'</div></div></div>');
        $('body').append(popup);
        $('.box-mask').show();
    },
    hide: function(){
    	$('.box-mask').remove();
    }
};

/*定义支付密码提示框*/
common.payBox = {
    /*
     * title: 标题
     * content: 提示的文本内容
     */
    show: function (title, content) {
        var popup = $('<div class="box-mask">' +
            	'<div class="confirm-box">' +
        		'<div class="confirm-title">输入支付密码</div>' +
        		'<div class="confirm-content">' +
        		'<input type="password" id="paypass_bank" placeholder="请输入支付密码">' +
        		'</div>' +
        		'<div class="confirm-btns">' +
        		'<span class="confirm-sure">确&nbsp;定</span>' +
        		'<span class="confirm-cancel">取&nbsp;消</span>' +
        		'</div>' +
        	    '</div>' +
        		'</div>');
        $('body').append(popup);
        $('.box-mask').show();
    },
    hide: function(){
    	$('.box-mask').remove();
    }
};
//toast
common.toast = {
	    /*
	     *描述：自定义提示框，3秒后自动消失
	     *id：必须惟一
	     *content：提示的文本内容
	     *icon（可选）： 提示框的图标，图标为圆
	     */
	    show: function (id, content, icon,times) {
	        var toast = $("<div class='popup-mask'><div class='popup-content'>" + content + "</div></div>");
	        $('body').append(toast);
	        setTimeout(function () {
	            toast.remove();
	        }, times);
	    }
	};


$(function () {
    
	//console.info(document.location.href);

    //wx
    if (common.validate.isWeiXin()) {
    	//$('.bar').hide();
        //$('.bar-nav~.content').css('top', '0');
    }
    //android
    if (common.validate.isAndroid()) {
        //$('.bar').hide();
        //$('.bar-nav~.content').css('top', '0');
    }
    //ios
    if (common.validate.isIos()) {
    	//$('.bar').hide();
    	//$('.bar-nav~.content').css('top', '0');
    }
});