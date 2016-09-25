/**
 * Created by dell on 2016/6/16.
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        if(windowWidth > 550){
            html.style.fontSize = '80px';
        } else {
            html.style.fontSize = windowWidth / 7.5 + 'px';
        }
    }, false);
})();