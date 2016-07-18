<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<c:set var="ctxPath" value="${pageContext.request.contextPath}"
	scope="request" />
	
<jsp:include page="./../common/header.jsp"></jsp:include>
<link rel="stylesheet" href="//g.alicdn.com/msui/sm/0.6.2/css/sm-extend.min.css">
<link rel="stylesheet" href="${ctxPath }/m/new/css/shop/index.css">

<div class="page-group">
    <div class="page page-current">
    	<div class="content page-shop">
		<!-- Slider -->
  		<div class="swiper-container" data-space-between='10'>
    		<div class="swiper-wrapper">
      			<div class="swiper-slide"><img src="${ctxPath }/m/new/images/shop/lunbotu.png" alt=""></div>
      			<div class="swiper-slide"><img src="${ctxPath }/m/new/images/shop/lunbotu.png" alt=""></div>
      			<div class="swiper-slide"><img src="${ctxPath }/m/new/images/shop/lunbotu.png" alt=""></div>
    		</div>
    	<div class="swiper-pagination"></div>
    	</div>
    	<!-- 类别 -->
    	<div class="flex-line classify">
    		<div class="flex-item">
    			<img src="${ctxPath }/m/new/images/shop/hemoyu@2x.png">
    		</div>
    		<div class="flex-item">
    			<img src="${ctxPath }/m/new/images/shop/xiuyingyu-@2x.png">
    		</div>
    		<div class="flex-item">
    			<img src="${ctxPath }/m/new/images/shop/xiangqian@2x.png">
    		</div>
    		<div class="flex-item">
    			<img src="${ctxPath }/m/new/images/shop/shuimo@2x.png">
    		</div>
    		<div class="flex-item">
    			<img src="${ctxPath }/m/new/images/shop/mingjia@2x.png">
    		</div>
    	</div>
    	<!--商品1-->
    	<div class="goods-item">
    		<div class="goods-title">大慈大悲观世音挂件</div>
    		<div class="flex-line">
    			<div class="goods-thumb">
    				<img src="${ctxPath }/m/new/images/shop/1.png">
    			</div>
    			<div class="goods-text">
    				<!--  -->
    				<div class="goods-price">
    					<span class="goods-money">￥ 26800</span>
    					<!-- 已收藏 添加类 goods-like -->
    					<span class="goods-nolike goods-like"></span>
    				</div>
    				<!--  -->
    				<div class="goods-tag" index="1">琇莹玉</div>
    				<div class="goods-tag" index="2">挂件</div>
    				<div class="goods-tag" index="3">名家雕刻</div>
    				<div class="goods-tag" index="4">挂件</div>
    				<div class="goods-tag" index="5">名家雕刻</div>
    				
    			</div>
    		</div>
    	</div>
    	<!--商品2-->
    	<div class="goods-item">
    		<div class="goods-title">大慈大悲观世音挂件</div>
    		<div class="flex-line">
    			<div class="goods-thumb">
    				<img src="${ctxPath }/m/new/images/shop/1.png">
    			</div>
    			<div class="goods-text">
    				<!--  -->
    				<div class="goods-price">
    					<span class="goods-money">￥ 26800</span>
    					<span class="goods-nolike"></span>
    				</div>
    				<!--  -->
    				<div class="goods-tag" index="1">河磨玉</div>
    				<div class="goods-tag" index="2">挂件</div>
    				<div class="goods-tag" index="3">镶嵌珍品</div>    			
    			</div>
    		</div>
    	</div>
    	<!--商品3-->
    	<div class="goods-item">
    		<div class="goods-title">大慈大悲观世音挂件</div>
    		<div class="flex-line">
    			<div class="goods-thumb">
    				<img src="${ctxPath }/m/new/images/shop/1.png">
    			</div>
    			<div class="goods-text">
    				<!--  -->
    				<div class="goods-price">
    					<span class="goods-money">￥ 26800</span>
    					<span class="goods-nolike"></span>
    				</div>
    				<!--  -->
    				<div class="goods-tag" index="1">河磨玉</div>
    				<div class="goods-tag" index="2">挂件</div>
    				
    			</div>
    		</div>
    	</div>
    </div>
    <!---->
    <div class="msg-ring">
    	<img src="${ctxPath }/m/new/images/xiaoxi.png">
    	<span>1</span>
    </div>
    <!---->
    <nav class="tab flex-line">
        <div class="flex-item-three active">
            <img src="${ctxPath }/m/new/images/shouye.png" alt="">
            <p>首页</p>
        </div>
        <div class="flex-item-three">
            <img src="${ctxPath }/m/new/images/gongxiangfugui_gray.png" alt="">
            <p>共享富贵</p>
        </div>
        <div class="flex-item-three">
            <img src="${ctxPath }/m/new/images/wo_gray.png" alt="">
            <p>我的</p>
        </div>
    </nav>
	</div>
</div>

<script type='text/javascript' src='//g.alicdn.com/msui/sm/0.6.2/js/sm-extend.min.js' charset='utf-8'></script>
<script>
	$(function() {
		common.Util.setWxTitle("蟠桃会");
	    $(".swiper-container").swiper({
		  	autoplay: 1500,
		    speed: 2000,
		    spaceBetween: 1,
		    autoplayDisableOnInteraction: false
		});
	    //适配标签间距
	    $('.goods-item').each(function(i){
	    	var index = $(this).find('.goods-tag:last-child').attr('index');
		    if(index == 3 || index == 2){
		    	$(this).find('.goods-tag').css('margin-right', '20%');
		    	$(this).find('.goods-tag:last-child').css('margin-right', '0');
		    } else if(index == 4){
		    	$(this).find('.goods-tag').css('margin-right', '9%');
		    	$(this).find('.goods-tag:last-child').css('margin-right', '0');
		    }
	    });
	    //收藏
	    $('.goods-nolike').on('tap', function(){
	    	if($(this).hasClass('goods-like')) {
	    		//取消收藏
	    		$(this).removeClass('goods-like');
	    		$.toast('取消收藏');
	    	} else {
	    		//收藏
	    		$(this).addClass('goods-like');
	    		$.toast('收藏成功');
	    	}
	    });
	});
</script>

<jsp:include page="./../common/footer.jsp"></jsp:include>