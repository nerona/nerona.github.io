<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${title }</title>
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="email=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
    <link rel="stylesheet" href="${ctxPath }/m/new/css/sm.min.css">
	
	<script type='text/javascript' src='${ctxPath }/m/new/js/lib/zepto.min.js' charset='utf-8'></script>
	<script type='text/javascript' src="${ctxPath }/m/new/js/lib/touch.min.js"></script>
	<script type='text/javascript' src='${ctxPath }/m/new/js/lib/common.js' charset='utf-8'></script>
	<script type='text/javascript' src='${ctxPath }/m/new/js/lib/sm.min.js' charset='utf-8'></script>

	<script>
		//tab link
		$(function(){
			$('.tab .flex-item-three:nth-child(1)').on('tap', function(){
				document.location.href = '/p01/m/new_wx/shop/index.html';
			});
			$('.tab .flex-item-three:nth-child(2)').on('tap', function(){
				document.location.href = '/p01/m/new_wx/pt/index.html';
			});
			$('.tab .flex-item-three:nth-child(3)').on('tap', function(){
				document.location.href = '/p01/m/new_wx/my/index.html';
			});
		});
	</script>
</head>
<body>