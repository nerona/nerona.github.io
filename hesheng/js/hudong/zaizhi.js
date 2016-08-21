/**
 * Created by dell on 2016/8/21.
 */
var customer = customer || {};

customer.zaizhi = {
    init: function() {
        var data = [{
            "name": "营造花园式之家",
            "id": 1,
            "type": "让党员和居民乐于参加绿化美化活动"
        },{
            "name": "营造激情文化之家",
            "id": 2,
            "type": "让党员和居民乐于参加文化体育活动"
        },{
            "name": "营造互帮友爱之家",
            "id": 3,
            "type": "让党员和居民乐于参加学雷锋志愿服务活动"
        },{
            "name": "营造为名服务之家",
            "id": 4,
            "type": "让党员和居民乐于参加文明创建活动"
        },{
            "name": "营造帮扶解困之家",
            "id": 5,
            "type": "让党员和居民乐于参加慈善驿站活动"
        },{
            "name": "营造快乐成长之家",
            "id": 6,
            "type": "让党员和居民乐于参加关爱未成年人活动"
        },{
            "name": "营造尊老爱幼之家",
            "id": 7,
            "type": "让党员和居民乐于参加道德讲堂活动"
        },{
            "name": "营造五湖四海之家",
            "id": 8,
            "type": "让党员和居民乐于参加外籍志愿服务活动"
        },{
            "name": "营造企业联谊之家",
            "id": 9,
            "type": "让党员和居民乐于参加企业雷锋团活动"
        },{
            "name": "营造党建工作之家",
            "id": 10,
            "type": "让党员和居民乐于参加党员爱心团活动"
        }];

        Util.common.loadTemplate("#zn-list", "#zn-list-t", data);
    },
    initDetail: function(){
        var title = Util.common.getParameter('type');
        $('.zz-title').html(title);
        var data_1 = [{
            "text": "“我是小袋鼠 垃圾不落地 关爱环卫工”袋鼠行动之DIY Tshirt比赛",
            "image": "./../../images/hudong/zaizhi/zz-1-1.jpg"
        },{
            "text": "禾盛社区组织50多名“花痴”志愿者在碧湖嘉园小区开展“更美的社区更好的生活” 为主题炮仗花认养认管活动",
            "image": "./../../images/hudong/zaizhi/zz-1-2.jpg"
        },{
            "text": "禾盛社区组织党员、物业青年等志愿者开展“我爱我家 美化家园”志愿服务活动",
            "image": "./../../images/hudong/zaizhi/zz-1-3.jpg"
        },{
            "text": "这是禾盛社区成立第二支“美丽小区”督导队时的情景",
            "image": "./../../images/hudong/zaizhi/zz-1-4.jpg"
        }];

        var data_2 = [{
            "text": "澳大利亚阳光海岸市青少年乐团欣赏太极拳表演",
            "image": "./../../images/hudong/zaizhi/zz-2-1.jpg"
        },{
            "text": "禾盛社区馨雅艺术团演奏古筝《如来一叶》",
            "image": "./../../images/hudong/zaizhi/zz-2-2.jpg"
        },{
            "text": "联建共建激活基层活力 互帮互助共促社区和谐",
            "image": "./../../images/hudong/zaizhi/zz-2-3.jpg"
        },{
            "text": "太古可口可乐党总支捐献夕阳乐器",
            "image": "./../../images/hudong/zaizhi/zz-2-4.jpg"
        }];

        var data_3 = [{
            "text": "2015年新春慰问物业保安保洁员",
            "image": "./../../images/hudong/zaizhi/zz-3-1.jpg"
        },{
            "text": "厦门政务中心在职党员慰问辖区困难群众",
            "image": "./../../images/hudong/zaizhi/zz-3-2.jpg"
        },{
            "text": "图为“美丽社区共同缔造”小小志愿者义卖家庭用品",
            "image": "./../../images/hudong/zaizhi/zz-3-3.jpg"
        },{
            "text": "图为禾盛社区学雷锋志愿者们在双十中学高考现场为家长送水等服务",
            "image": "./../../images/hudong/zaizhi/zz-3-4.jpg"
        }];

        var data_4 = [{
            "text": "禾山社区卫生服务中心在职党员开展慢性病患者自我管理小组座谈会",
            "image": "./../../images/hudong/zaizhi/zz-4-1.jpg"
        },{
            "text": "禾盛社区开展老年邻里一家亲手工月饼制作活动",
            "image": "./../../images/hudong/zaizhi/zz-4-2.jpg"
        },{
            "text": "禾盛社区联合吉家家世界党支部举办“办公软件应用培训班”",
            "image": "./../../images/hudong/zaizhi/zz-4-3.jpg"
        },{
            "text": "禾盛社区每月定期开展健康服务进社区活动",
            "image": "./../../images/hudong/zaizhi/zz-4-4.jpg"
        }];

        var data_5 = [{
            "text": "“用爱心共同缔造美丽社区”义捐义卖活动在职党员捐款",
            "image": "./../../images/hudong/zaizhi/zz-5-1.jpg"
        },{
            "text": "禾盛社区开展“情系雅安 大爱无疆”募捐活动，在职党员和居民等共筹集善款8407.5元",
            "image": "./../../images/hudong/zaizhi/zz-5-2.jpg"
        },{
            "text": "禾盛社区联合湖里区电子协会共建企业开展“爱心年夜饭”捐赠活动，共筹集善款24800元。",
            "image": "./../../images/hudong/zaizhi/zz-5-3.jpg"
        },{
            "text": "禾盛社区联合吉家家世界党支部等多家单位共同举办爱心义拍义捐活动",
            "image": "./../../images/hudong/zaizhi/zz-5-4.jpg"
        },{
            "text": "禾盛社区在职党员慰问困难居民",
            "image": "./../../images/hudong/zaizhi/zz-5-5.jpg"
        }];

        var data_6 = [{
            "text": "“健康生活 快乐你我”科普趣味运动会-游戏互动",
            "image": "./../../images/hudong/zaizhi/zz-6-1.jpg"
        },{
            "text": "禾盛社区承办湖里区2015年“禾盛杯”车模竞赛",
            "image": "./../../images/hudong/zaizhi/zz-6-2.jpg"
        },{
            "text": "禾盛社区开展“幸福家庭，欢乐六一”文艺汇演活动",
            "image": "./../../images/hudong/zaizhi/zz-6-3.jpg"
        },{
            "text": "禾盛社区乐行童军先锋团",
            "image": "./../../images/hudong/zaizhi/zz-6-4.jpg"
        }];

        var data_7 = [{
            "text": "禾盛社区道德讲堂——亲子国学班开班仪式暨文化讲座",
            "image": "./../../images/hudong/zaizhi/zz-7-1.jpg"
        },{
            "text": "禾盛社区开展“我们的节日——七夕”读书会",
            "image": "./../../images/hudong/zaizhi/zz-7-2.jpg"
        },{
            "text": "禾盛社区开展喜迎十八大经典诵读进社区展演活动",
            "image": "./../../images/hudong/zaizhi/zz-7-3.jpg"
        },{
            "text": "禾盛社区亲子国学班开展“我们的节日清明”诵读国学经典活动",
            "image": "./../../images/hudong/zaizhi/zz-7-4.jpg"
        }];

        var data_8 = [{
            "text": "澳大利亚阳光海岸市青少年乐团莅临禾盛社区文化交流合影",
            "image": "./../../images/hudong/zaizhi/zz-8-1.jpg"
        },{
            "text": "澳大利亚阳光海岸市青少年乐团与厦门市湖里区禾盛社区馨雅艺术团联合开展的国际社区文化交流汇演活动",
            "image": "./../../images/hudong/zaizhi/zz-8-2.jpg"
        },{
            "text": "禾盛社区举办“琴韵涌动乐都汇 美声唱响感恩节”钢琴演奏会，外籍志愿者为辖区居民演奏钢琴",
            "image": "./../../images/hudong/zaizhi/zz-8-3.jpg"
        },{
            "text": "禾盛社区开展“慈善之旅”活动，外籍志愿者慰问困难儿童",
            "image": "./../../images/hudong/zaizhi/zz-8-4.jpg"
        }];

        var data_9 = [{
            "text": "非公企业湖里区电子协会参与共同缔造美丽社区商品义卖",
            "image": "./../../images/hudong/zaizhi/zz-9-1.jpg"
        },{
            "text": "禾盛社区”企业雷锋团“授牌仪式",
            "image": "./../../images/hudong/zaizhi/zz-9-2.jpg"
        },{
            "text": "禾盛社区联建非公企业党支部座谈会",
            "image": "./../../images/hudong/zaizhi/zz-9-3.jpg"
        },{
            "text": "企业雷锋团爱心车队让“爱”动起来",
            "image": "./../../images/hudong/zaizhi/zz-9-4.jpg"
        }];

        var data_10 = [{
            "text": "党员起表率  圆梦微心愿  群众得实惠",
            "image": "./../../images/hudong/zaizhi/zz-10-1.jpg"
        },{
            "text": "禾盛社区“党员爱心团”成立暨爱心基金募捐活动",
            "image": "./../../images/hudong/zaizhi/zz-10-2.jpg"
        },{
            "text": "禾盛社区召开党的群众路线教育实践活动动员部署会",
            "image": "./../../images/hudong/zaizhi/zz-10-3.jpg"
        },{
            "text": "社区“党员爱心团”成员叶永春、孙锦、王美蓉上门关心困难老人活动",
            "image": "./../../images/hudong/zaizhi/zz-10-4.jpg"
        }];

        var id = parseInt(Util.common.getParameter('id'));
        switch(id)
        {
            case 1:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_1);
                break;
            case 2:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_2);
                break;
            case 3:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_3);
                break;
            case 4:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_4);
                break;
            case 5:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_5);
                break;
            case 6:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_6);
                break;
            case 7:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_7);
                break;
            case 8:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_8);
                break;
            case 9:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_9);
                break;
            case 10:
                Util.common.loadTemplate("#zz-detail", "#zz-detail-t", data_10);
                break;
        }
    }
};