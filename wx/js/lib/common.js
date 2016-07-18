(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        html.style.fontSize = windowWidth / 7.5 + 'px';
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
	        var $iframe = $('<iframe src=""></iframe>');
	        $iframe.on('load',function() {
	            setTimeout(function() {
	                $iframe.off('load').remove();
	            }, 0);
	        }).appendTo($body);
	    }
}