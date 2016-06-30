/**
 * Created by dell on 2016/6/30.
 */

var customer = customer || {};
customer.guide = {
    initGuide: function(){
        var data = [{
            "id": 1,
            "title": "(新增业务)禾山街道设立、变更社会保障卡交易密码"
        },{
            "id": 2,
            "title": "15禾山街道《就业失业登记证》办事指南"
        },{
            "id": 3,
            "title": "16禾山街道办理符合供养直系亲属领取抚恤金待遇的审批手续"
        },{
            "id": 4,
            "title": "17禾山街道办理继承人领取丧葬费的审批手续"
        },{
            "id": 5,
            "title": "18禾山街道健康综合子账户办事指南"
        },{
            "id": 6,
            "title": "19禾山街道小额担保贴息贷款办事指南"
        },{
            "id": 7,
            "title": "20禾山街道协助异地退休人员及抚恤人员的生存认证"
        },{
            "id": 8,
            "title": "21禾山街道就业困难人员认定办事指南"
        },{
            "id": 9,
            "title": "22禾山街道灵活就业人员认定办事指南"
        },{
            "id": 10,
            "title": "23禾山街道灵活就业人员认定复核办事指南"
        },{
            "id": 11,
            "title": "24禾山街道初、高中毕业生继续学习学费补贴申领表"
        },{
            "id": 12,
            "title": "25禾山街道就业困难人员灵活就业社保补贴办事指南"
        },{
            "id": 13,
            "title": "26禾山街道就业工资性补贴办事指南"
        },{
            "id": 14,
            "title": "27禾山街道职业技能培训补贴办事指南"
        },{
            "id": 15,
            "title": "28禾山街道汽车驾驶培训补贴办事指南"
        },{
            "id": 16,
            "title": "29禾山街道辖区失业人员培训生活补助办事指南"
        },{
            "id": 17,
            "title": "30禾山街道外来农村劳动力职业技能培训误工补贴办事指南"
        },{
            "id": 18,
            "title": "31禾山街道自主创业奖励金申领办事指南"
        },{
            "id": 19,
            "title": "32禾山街道城乡居民养老保险办事指南"
        },{
            "id": 20,
            "title": "33禾山街道基本医保参保人员自付医疗费困难补助办事指南"
        },{
            "id": 21,
            "title": "34禾山街道被征地人员参保补助申领办事指南"
        },{
            "id": 22,
            "title": "35禾山街道未安置就业上山下乡人员参保补贴办事指南"
        }];
        console.log(data);
        Util.common.loadTemplate("#zn-list", "#zn-list-t", data);
    },
    initCard: function(){
        var data = [{
            "title": "个人简介1",
            "content": "1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理",
            "photo": "./../../images/zhinan/pic.png"
        },{
            "title": "个人简介2",
            "content": "1999年创办阿里巴巴，并担任阿里集团CEO、董事局主席",
            "photo": "./../../images/zhinan/pic.png"
        },{
            "title": "个人简介3",
            "content": "1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理",
            "photo": "./../../images/zhinan/pic.png"
        },{
            "title": "个人简介4",
            "content": "1999年创办阿里巴巴，并担任阿里集团CEO、董事局主席",
            "photo": "./../../images/zhinan/pic.png"
        },{
            "title": "个人简介5",
            "content": "1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理",
            "photo": "./../../images/zhinan/pic.png"
        }];
        Util.common.loadTemplate("#card-list", "#card-list-t", data);
    }
};