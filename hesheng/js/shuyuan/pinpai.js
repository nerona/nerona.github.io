/**
 * Created by dell on 2016/7/8.
 */
var customer = customer || {};

customer.pinpai = {
    initList: function(){
        var data = [{
            "id": 1,
            "type": "国学班",
            "photo": "./../../images/shuyuan/pinpai3.png"
        }, {
            "id": 2,
            "type": "乐行先锋团",
            "photo": "./../../images/shuyuan/pinpai1.png"
        }, {
            "id": 3,
            "type": "自然体验营",
            "photo": "./../../images/shuyuan/pinpai5.png"
        }, {
            "id": 4,
            "type": "企业雷锋团",
            "photo": "./../../images/shuyuan/pinpai2.png"
        }, {
            "id": 5,
            "type": "馨雅艺术团",
            "photo": "./../../images/shuyuan/pinpai4.png"
        }];
        
        Util.common.loadTemplate('#pp-list', "#pp-list-t", data);
    },
    initDetail: function(){
        var data_guoxue = [{
            "id": 1,
            "title": "禾盛社区亲子国学班--记国学班经典学习二三事",
            "img1": "./../../images/shuyuan/pinpai/guoxue/pp-1-1.png",
            "text1": "2012年8月，在台湾士林社区大学老师的帮助，禾盛社区的支持，晖红等老师的组织下，我们的亲子国学班开班到现在已经两年多了。在这两年多的亲子共读中，我们有欢笑，有泪水，有挫折，有感悟。我们也因为场地条件关系，教室换了好几个地方，但这并没有阻止我们对国学经典的热爱，对坚持学习亲子国学经典的脚步，在学习经典的路上我们依然风雨无阻。",
            "img2": "./../../images/shuyuan/pinpai/guoxue/pp-1-2.png",
            "text2": "这两年多以来，让我感触最深的：一是亲子共读经典让我和孩子每天有共享美好亲子时光的机会。在上课时，他和我一起认真诵读，争取当课堂上的诵读之星；在家中，那是我们临睡前最温馨时刻，我们母子人手一本《学庸论语》，或高声朗诵，或快或慢，或摇头晃脑学古人诵读，或会心相视一笑，那种美好只有我们能体会。二是孩子在国学班中能深深感受老师们对他们浓浓的关爱与肯定。嘉翔是个活泼好动的孩子。在学校因为调皮没少受老师批评，常有挫败感。但在国学班的两年多时间，我听到的只有老师的鼓励与欣赏，同学的加油声。这里的孩子在老师眼中都是优秀的，孩子的优点被无限放大，缺点被有意忽略了。所以我们的亲子国学班更像个温暖的大家庭。",
            "img3": "./../../images/shuyuan/pinpai/guoxue/pp-1-3.png",
            "text3": "今后，我和孩子依然会一如既往的在这温暖的国学班中坚持经典的学习，继续学习古圣先贤的智慧。",
            "name": "禾盛社区国学班家长 何晖红",
            "time": "2014年12月24日"
        },{
            "id": 2,
            "title": "禾盛社区亲子国学班--我是小状元",
            "img1": "./../../images/shuyuan/pinpai/guoxue/pp-2-1.png",
            "text1": "从古至今，“状元”一直是人们都想当的，我也是。就在这个阳光明媚的日子，我如愿以偿了！“叮，叮，叮”清脆的闹钟声响起，我睁开了朦胧的双眼。今天是令我紧张，令我兴奋的日子——因为我要去人民会堂参加厦门市海峡两岸孝亲节经典会考活动。",
            "img2": "./../../images/shuyuan/pinpai/guoxue/pp-2-2.png",
            "text2": "紧 张 <br> 毕竟是第一次参与难免会有些紧张。到了那里原本悠闲自在的心情立刻变得忐忑不安起来，脑子“嗡”的一下变得一片空白，怎么办呢？这时我看见许多比我小的同学都很淡定的给考官背诵并且过关。就深呼吸让自己心情慢慢平静下来，嗯，我可不能输给他们啊！于是我鼓足勇气把书递给考官，此时此刻心跳的更加快了…… <br> 兴 奋 <br> 我暗暗对自己说：“紫祎，你真行的！”果然我通畅无阻的背诵过关，考官也竖着大拇指说：“小朋友你太棒了，背得又快又标准。”我蹦蹦跳跳地去领取学习护照，并戴上了期盼已久的状元帽。 当我戴上状元帽的那一刻顿时觉得自己真了不起！有一种说不出来的喜悦。<br> 开 心 <br> 我不仅戴上了状元帽还观赏了一场精彩的表演。其中感受很深的一个节目《父母的爱》，它告诉我们父母给了我们无微不至的爱，不管风吹雨打他们都会用自己庞大的身躯来保护我们，我们长大后也要感恩父母为我们所付出的爱……",
            "img3": "./../../images/shuyuan/pinpai/guoxue/pp-2-3.png",
            "text3": "过五关斩六将，我这个状元帽得来可不轻松哦，平时的付出终于有了回报，一分耕耘，一分收获。以后我会加倍努力，再接再厉，明年争取过状元桥！",
            "name": "禾盛社区亲子国学班学员 刘紫祎",
            "time": ""
        }];
        var data_xianfeng = [{
            "id": 1,
            "title": "禾盛社区“乐行先锋团”",
            "img1": "./../../images/shuyuan/pinpai/xianfeng/pp-1-1.jpg",
            "text1": "禾盛社区“乐行先锋团”是厦门市首个社区少先队组织，也是湖里区民政局、湖里团区委为推动青少年工作更接地气、打通服务青少年'最后一公里'迈出的重要一步。实现少先队社会化的有效形式与重要载体，是少先队组织引导、教育和保护少年儿童，促进少年儿童健康成长的重要阵地。",
            "img2": "./../../images/shuyuan/pinpai/xianfeng/pp-1-2.jpg",
            "text2": "",
            "img3": "./../../images/shuyuan/pinpai/xianfeng/pp-1-3.jpg",
            "text3": "",
            "name": "",
            "time": ""
        },{
            "id": 2,
            "title": "",
            "img1": "./../../images/shuyuan/pinpai/xianfeng/pp-1-4.jpg",
            "text1": "项目自2015年3月启动以来，禾盛社区“乐行先锋团”共发展领袖团员12名，开展了44个社区活动，开展三个成长教育小组，发展5个个案，其中大型特色活动包括：五四青年节趣味运动会，“未来小战士”科技夏令营活动，七夕“魅力夏妆，舞出色彩”假面化妆舞会，“秋日蟹逅，宝贝牵手”亲子互动体验活动，“助益清源”义卖义捐系列活动等多项特色活动。",
            "img2": "./../../images/shuyuan/pinpai/xianfeng/pp-1-5.jpg",
            "text2": "“乐行先锋团”扎实的服务和创新的品牌，极大的提升了青少年团员的执行力、实践意识、相互支援协力的氛围，这种氛围也感染给社区居民，产生社区发展非常重要的归属感，这样的明显互动，发展出社区真正的认同，形成社区成员间相互关爱的力量。",
            "img3": "./../../images/shuyuan/pinpai/xianfeng/pp-1-6.jpg",
            "text3": "",
            "name": "",
            "time": ""
        }];
        var data_qiye = [{
            "id": 1,
            "title": "禾盛社区企业雷锋团简介",
            "img1": "./../../images/shuyuan/pinpai/qiye/pp-1-1.jpg",
            "text1": "禾盛社区进一步扩大志愿服务的覆盖面与参与面，整合辖区企业的优势资源，立足“服务于社会”，成立禾盛社区“企业雷锋团”。根据社区企业分布和职工群体结构特点，因地制宜发挥在“企业雷锋团”的主力军作用，开展针对性强、特色鲜明的服务项目。",
            "img2": "./../../images/shuyuan/pinpai/qiye/pp-1-2.jpg",
            "text2": "",
            "img3": "./../../images/shuyuan/pinpai/qiye/pp-1-3.jpg",
            "text3": "",
            "name": "",
            "time": ""
        },{
            "id": 2,
            "title": "",
            "img1": "./../../images/shuyuan/pinpai/qiye/pp-1-4.jpg",
            "text1": "现如今禾盛企业雷锋团从刚成立的10家企业已经发展到了有湖里区电子协会、吉家家世界、太古可口可乐、安兜医院、英孚教育、华茂光学等134家企业。主要致力于家装检修、环境保护、健康义诊、爱心理发、亲子教育、交通疏导、便民服务等纯公益社会服务。",
            "img2": "./../../images/shuyuan/pinpai/qiye/pp-1-5.jpg",
            "text2": "",
            "img3": "./../../images/shuyuan/pinpai/qiye/pp-1-6.jpg",
            "text3": "",
            "name": "",
            "time": ""
        },{
            "id": 3,
            "title": "",
            "img1": "./../../images/shuyuan/pinpai/qiye/pp-1-7.jpg",
            "text1": "禾盛企业雷锋团一直都秉承着用自己有限的力量提供高质量的服务，它的茁壮成长更表明了其平台的影响力，让需要的人感受到无限温暖的宗旨，哪里需要，企业雷锋团便出现在哪里。爱的奉献在禾盛社区成为新常态，快乐理念在越来越多禾盛人的心中植入。",
            "img2": "./../../images/shuyuan/pinpai/qiye/pp-1-8.JPG",
            "text2": "",
            "img3": "./../../images/shuyuan/pinpai/qiye/pp-1-9.jpg",
            "text3": "",
            "name": "",
            "time": ""
        }];
        var data_xinya = [{
            "id": 1,
            "title": "禾盛社区馨雅艺术团",
            "img1": "./../../images/shuyuan/pinpai/xinya/pp-1-1.jpg",
            "text1": "禾盛社区馨雅艺术团于2013年1月正式成立，是湖里区第一支社区艺术团。艺术团不定期组织文艺汇演活动，挖掘丰富的文艺人才，组建多支文体队伍，开展文体活动和举办葫芦丝、书画、古筝等多种免费普及培训班，采取“走出去，请进来”的发展模式，丰富活跃社区群众文化生活。",
            "img2": "./../../images/shuyuan/pinpai/xinya/pp-1-2.jpg",
            "text2": "",
            "img3": "./../../images/shuyuan/pinpai/xinya/pp-1-3.jpg",
            "text3": "2015年结合社区实际情况，开展了丰富多彩的各类文体活动，全年社区共开展和组织各类文体活动70多场，其中主（承）办50多场，承办区、街活动21场，对外文化交流活动三场（澳大利亚2场、尼泊尔一场 ）营造健康向上的社区文化氛围，培育组建了社区文体队伍10多支，包括社区舞蹈队、声乐队、健身太极拳、太极扇等队伍，文化志愿者达到近100人。",
            "name": "",
            "time": ""
        },{
            "id": 2,
            "title": "",
            "img1": "./../../images/shuyuan/pinpai/xinya/pp-1-4.jpg",
            "text1": "依托强大的人才队伍，社区在今年的“禾山欢乐季”系列活动中收获颇多，共获得一等奖3个，二等奖3个，三等奖6个，优秀奖20多个，并获得本年度“禾山欢乐季”优秀组织奖；在参加湖里区文化艺术节活动中，社区艺术团选送的《小路二重唱》获得二等奖、《蝶恋》获得一等奖的好成绩，这些队伍的建立，繁荣了社区居民的文化生活，提高了社区文明程度，增强了居民对社区的认同感、归属感，凝聚了社区民心。",
            "img2": "./../../images/shuyuan/pinpai/xinya/pp-1-5.jpg",
            "text2": "",
            "img3": "./../../images/shuyuan/pinpai/xinya/pp-1-6.jpg",
            "text3": "",
            "name": "",
            "time": ""
        },{
            "id": 3,
            "title": "",
            "img1": "./../../images/shuyuan/pinpai/xinya/pp-1-7.jpg",
            "text1": "2015年11月，禾盛社区馨雅艺术团申报的《挖掘培养群众“艺术家”，社区文化交流走向世界》荣获福建省社会组织工作改革创新案例“优秀奖”。",
            "img2": "./../../images/shuyuan/pinpai/xinya/pp-1-8.jpg",
            "text2": "",
            "img3": "./../../images/shuyuan/pinpai/xinya/pp-1-1.jpg",
            "text3": "",
            "name": "",
            "time": ""
        }];
        var data_ziran = [{
            "id": 1,
            "title": "禾盛社区自然体验营",
            "img1": "",
            "text1": " 生活不止是苟且，诗也不仅仅在远方。也许你不需要折腾那么远，你身边的事物也能够给你全新的体验和感动。比如，你身边的社区和无限可能的自然体验。",
            "img2": "./../../images/shuyuan/pinpai/ziran/ziran-1.jpg",
            "text2": "禾盛社区打造水晶森林自然生态园，力求发挥禾盛社区生态优势，将自然科普教育落实到社区居民当中。不仅丰富了学员的文化娱乐生活同时为社区居民打开了一道窗，通过自然体验项目让学员接触大自然认识自然。硬件上，自然体验营落实了教室、望远镜、小区植物挂牌等基础设备。在软件上，通过和厦门小小鸥、厦门快乐社区服务中心、中国青年观鸟联合会、露丰堂（中医）等单位合作，保证了课程内容丰富多彩。既有由中医、观鸟、植物、天文、农耕、茶文化等为导入的主题式体验活动，也有会员制、任务式的长期自主体验活动。接下来，禾盛社区还将开展“激光对抗电子竞技活动”，让大家一边玩，一边通过作战感受到团队精神和互助友爱，欢迎大家来参加。",
            "img3": "./../../images/shuyuan/pinpai/ziran/ziran-2.jpg",
            "text3": "禾盛社区书院自然体验营的初衷从来都不是让居民多认识一种鸟或者一棵树，更多的是期望为社区居民提供一个有意义的精神文化活动平台。",
            "name": "",
            "time": ""
        }];
        var type = Util.common.getParameter('id');
        if(type == 1) {
            Util.common.loadTemplate("#pp-detail", "#pp-detail-t", data_guoxue);
            $('.pp-item').css("padding-bottom", "12%");
        } else if(type == 2) {
            Util.common.loadTemplate("#pp-detail", "#pp-detail-t", data_xianfeng);
        } else if(type == 3) {
            Util.common.loadTemplate("#pp-detail", "#pp-detail-t", data_ziran);
            $('.pp-item .pp-icon:nth-of-type(1)').remove();
            $('.pp-item .detail-desc:nth-of-type(1)').css("margin-top", "4%");
        } else if(type == 4) {
            Util.common.loadTemplate("#pp-detail", "#pp-detail-t", data_qiye);
        } else if(type == 5) {
            Util.common.loadTemplate("#pp-detail", "#pp-detail-t", data_xinya);
        }
    }
};