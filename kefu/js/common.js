/**
 * Created by dell on 2016/7/5.
 */

$(function(){
    $('.pag-item').on('click', function(){
        $(this).parent().find('.pag-active').removeClass('pag-active');
        $(this).addClass('pag-active');
    });
    $('.pag-paper').on('click', function(){
        $(this).parent().find('.pag-active').removeClass('pag-active');
        $(this).addClass('pag-active');
    });
});

var common = common || {};

common.Util = {

};