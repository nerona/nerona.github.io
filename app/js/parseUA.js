/**
 * Author :  neron
 * time   : 2015/12/17
 * description: ...
 */
(function () {
    function parseUa(ua) {
        var ua_array = ua.split('Mobile'),
            result = ["平台信息:"],
            common = ua_array[0],
            apps = ua_array[1],
            tmp_data = [],
            properkey = "",
            app_reg = /IPadQQ\/[^\s]*|MQQBrowser\/[^\s]*|qqnews\/[^\s]*|QQJSSDK\/[^\s]*|Qzone\/[^\s]*|QZONEJSSDK\/[^\s]*|QQ\/[^\s]*|NetType\/[^\s]*|Pixel\/[^\s]*|MicroMessenger\/[^\s]*|(lol)appcpu\/[^\s]*|[^\s]*(YYB)[^\s]*|QQHD/g,
            plate_reg = /Android\s[^;]+|[a-z]{2}-[a-z]{2}|Build\/[^\)]*|\d_\d_\d|iPad|iPhone|iPod/g,
            /**
             * [app_map description]
             * @type {Object}
             * 需要做解释和检测的，appua信息
             */
            app_map = {
                IPadQQ: "IPadQQ",
                MQQBrowser: "QQ浏览器",
                qqnews: "腾讯新闻",
                QQJSSDK: "QJS",
                Qzone: "Qzone",
                QZONEJSSDK: "QZONEJSSDK",
                QQ: "QQ",
                MicroMessenger: "微信",
                YYB: "应用宝",
                lol: "掌上英雄联盟"
            },
            common_map = {
                Android: "安卓"
            };
        while (tmp_data = plate_reg.exec(common)) {
            result.push(tmp_data[0]);
        }
        result.push("应用信息:");
        while (tmp_data = app_reg.exec(apps)) {
            properkey = tmp_data[1] || tmp_data[0];
            result.push(app_map[properkey] || properkey);
        }
        return result.join(' ');
    }

    var format_str = parseUa('Mozilla/5.0 (Linux; U; Android 5.1.1; zh-cn; SCL-TL00H Build/HonorSCL-TL00H) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/5.4 TBS/025477 Mobile Safari/533.1lolapp/3.9.0.1260 lolappcpu/armeabi-v7a');
    console.log(format_str);
})();