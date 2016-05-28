$(function(){
    $(".judge-main-score img").on("click", function(){
        var index = $(this).attr("index");
        $(".judge-main-score img").each(function(i){
            if(i<=index){
                $(this).attr("src","images/hdpi/wddd_pj_xx.png");
            }else{
                $(this).attr("src","images/hdpi/wddd_pj.png");
            }
        });
    });

});