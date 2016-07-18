<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<c:set var="ctxPath" value="${pageContext.request.contextPath}"
	scope="request" />
	
<jsp:include page="./../common/header.jsp"></jsp:include>
<link rel="stylesheet" href="${ctxPath }/m/new/css/shop/index.css">

<div class="page-group">
    <div class="page page-current">
    	<header class="bar bar-nav">
  			<a class="icon icon-back pull-left back"></a>
  			<a class="pull-right icon-cart"></a>
  			<h1 class="title">银行卡</h1>
		</header>
    	<div class="content page-goods-detail">
      		
    	</div>
    </div>
    <nav class="tab flex-line">
        <div class="flex-item-three">
            <img src="${ctxPath }/m/new/images/shouye_gray.png" alt="">
            <p>首页</p>
        </div>
        <div class="flex-item-three active">
            <img src="${ctxPath }/m/new/images/gongxiangfugui.png" alt="">
            <p>共享富贵</p>
        </div>
        <div class="flex-item-three">
            <img src="${ctxPath }/m/new/images/wo_gray.png" alt="">
            <p>我的</p>
        </div>
    </nav>
</div>

<script>
	$(function(){
		common.Util.setWxTitle("商品详情");
	});
		
</script>
<jsp:include page="./../common/footer.jsp"></jsp:include>