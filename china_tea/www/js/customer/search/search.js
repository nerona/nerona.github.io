$('#goodSearchId').bind('keydown', function (event) {
    if (event.keyCode == "13") {
        goodSearchSaveStroage();
        searchCancelClickEvents(0)
    }
});
//监听搜索框变化事件,以切换搜索与取消显示
$('#goodSearchId').bind('input propertychange', function (event) {
    goodSearchAndCancelShow();
});
//搜索框得到焦点事件，显示历史搜索记录,最多显示10个
function goodSearchFocus() {
    var storage = window.localStorage;
    $("#goodSearchListview li:gt(0)").remove();
    for( var i = storage.length-1; i >= 0&&i> storage.length-10; i--) {
        var key = storage.key(i);
        var value = storage.getItem(key);
        var keystr = "'"+key+"'";
        var list = '<li><span onclick="searchHositoryClick(this)" style="width: 80%;display: inline-block;">'+value
            +'</span><span><a href="#" class="" onclick="goodSearchRemoveStroage('+keystr+',this)"></a></span></li>';
        $("#goodSearchListview").append(list);

    }
    $('#goodSearchListview').listview('refresh');
}
//切换搜索与取消隐藏显示
function goodSearchAndCancelShow() {
    var searchVal = $('#goodSearchId').val();
    if(searchVal != null && searchVal != ''){
        $("#cancelAId").hide();
        $("#searchAId").show();
    }else{
        $("#cancelAId").show();
        $("#searchAId").hide();
    }
};
// 保存搜索记录
function goodSearchSaveStroage() {
    var searchVal = $('#goodSearchId').val();
    if(searchVal != null && searchVal != '') {
        var storage = window.localStorage;
        storage.setItem("search_"+(new Date().getTime()),$('#goodSearchId').val());
    }
};
// 移除单个搜索记录
function goodSearchRemoveStroage(key,obj){
    var storage = window.localStorage;
    storage.removeItem(key);
    $(obj).parent().remove();
}
// 点击取消或搜索事件，取消则返回上首页，搜索则保存搜索记录及显示搜索结果
function searchCancelClickEvents(type){
    if(type == 1){
        document.location.href="html/customer/index.html";
    }else{
        goodSearchSaveStroage();
        document.location.href="html/customer/search/search-result.html?searchText="+$('#goodSearchId').val();
    }
}
function searchHositoryClick(obj){
    $('#goodSearchId').val($(obj).text());
    document.location.href="html/customer/search/search-result.html?searchText="+$('#goodSearchId').val();
}
$('#clearHository').bind('click', function (event) {
    window.localStorage.clear();
});