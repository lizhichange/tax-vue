var util = require('../../utils/util.js');

const app = getApp()


Page({
    data: {
        //税前收入
        preTax: 0.00,
        //税后收入
        afterTax: 0.00,
        //个人应纳税额
        payable: 0,
        //专项扣除 
        deduction: 0.00,
        //免征额
        exemption: 5000,
        //区域code
        regionCode: "310000",
        //税率
        rate: 0,
        //速算扣除数
        quickDeduction: 0,
        //三险
        socialAmount: 0,
        //公积金
        provident: 0,
        //税率表
        monthlyTaxRate: [
            { "level": 0, "rate": 0, "quickDeduction": 0, "monthly": 0, 'range': "0-0" },
            { "level": 1, "rate": 3, "quickDeduction": 0, "monthly": 1, 'range': "1-3000" },
            { "level": 2, "rate": 10, "quickDeduction": 210, "monthly": 3001, 'range': "3001-12000" },
            { "level": 3, "rate": 20, "quickDeduction": 1410, "monthly": 12001, 'range': "12001-25000" },
            { "level": 4, "rate": 25, "quickDeduction": 2660, "monthly": 25001, 'range': "25001-35000" },
            { "level": 5, "rate": 30, "quickDeduction": 4410, "monthly": 35001, 'range': "35001-55000" },
            { "level": 6, "rate": 35, "quickDeduction": 7160, "monthly": 55001, 'range': "55001-80000" },
            { "level": 7, "rate": 45, "quickDeduction": 15160, "monthly": 80001, 'range': "80001-1200000000" }
        ],
        //五险一金
        insuranceRate: [
            { "regionCode": "110000", "pension": 8, "medical": 2, "unemployment": 0.2, 'provident': 12, 'desc': '北京' },
            { "regionCode": "120000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 11, 'desc': '天津' },
            { "regionCode": "140000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 6, 'desc': '太原' },
            { "regionCode": "150000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 6, 'desc': '呼和浩特' },
            { "regionCode": "130000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 10, 'desc': '石家庄' },


            { "regionCode": "310000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 7, 'desc': '上海' },
            { "regionCode": "320000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 8, 'desc': '南京' },
            { "regionCode": "330000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 12, 'desc': '杭州' },
            { "regionCode": "330000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 8, 'desc': '宁波' },
            { "regionCode": "370000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 7, 'desc': '济南' },
            { "regionCode": "320000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 8, 'desc': '苏州' },
            { "regionCode": "350000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 12, 'desc': '福州' },
            { "regionCode": "350000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 12, 'desc': '厦门' },
            { "regionCode": "340000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 8, 'desc': '合肥' },
            { "regionCode": "370000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 5, 'desc': '青岛' },

            { "regionCode": "420000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 8, 'desc': '武汉' },
            { "regionCode": "360000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 12, 'desc': '南昌' },
            { "regionCode": "430000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 8, 'desc': '长沙' },
            { "regionCode": "410000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 10, 'desc': '郑州' },


            { "regionCode": "440000", "pension": 8, "medical": 2, "unemployment": 0.2, 'provident': 5, 'desc': '广州' },
            { "regionCode": "440000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 5, 'desc': '深圳' },
            { "regionCode": "450000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 12, 'desc': '南宁' },
            { "regionCode": "460000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 10, 'desc': '海口' },
            { "regionCode": "440000", "pension": 8, "medical": 2, "unemployment": 0.2, 'provident': 5, 'desc': '珠海' },
            { "regionCode": "440000", "pension": 8, "medical": 1.5, "unemployment": 0.2, 'provident': 5, 'desc': '佛山' },
            { "regionCode": "440000", "pension": 8, "medical": 0.5, "unemployment": 0.2, 'provident': 5, 'desc': '东莞' },


            { "regionCode": "210000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 12, 'desc': '沈阳' },
            { "regionCode": "210000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 15, 'desc': '大连' },

            { "regionCode": "220000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 7, 'desc': '长春' },
            { "regionCode": "230000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 8, 'desc': '哈尔滨' },


            { "regionCode": "610000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 5, 'desc': '西安' },

            { "regionCode": "640000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 12, 'desc': '银川' },

            { "regionCode": "620000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 7, 'desc': '兰州' },

            { "regionCode": "630000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 6, 'desc': '西宁' },

            { "regionCode": "650000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 10, 'desc': '乌鲁木齐' },

            { "regionCode": "500000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 7, 'desc': '重庆' },
            { "regionCode": "510000", "pension": 8, "medical": 2, "unemployment": 0.4, 'provident': 6, 'desc': '成都' },


            { "regionCode": "530000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 10, 'desc': '昆明' },

            { "regionCode": "520000", "pension": 8, "medical": 2, "unemployment": 0.3, 'provident': 6, 'desc': '贵阳' },



        ]
    },
    onLoad: function (e) {
        this.setData({
            preTax: util.isEmpty(e) ? 0.00 : e.preTax,
            deduction: util.isEmpty(e) ? 0.00 : e.deduction,
            regionCode: util.isEmpty(e) ? 0.00 : e.regionCode
        });
        this.calc(e);
    },
    calc: function (e) {
        var that = this;
        var data = that.__data__;
        var insuranceRate;
        for (var i = data.insuranceRate.length - 1; i >= 0; i--) {
            var regionCode = data.insuranceRate[i].regionCode;
            if (data.regionCode == regionCode) {
                insuranceRate = data.insuranceRate[i];
                break;
            }
        }
        //养老保险金：
        var pension = (data.preTax * insuranceRate.pension) / 100;
        //医疗保险金：	
        var medical = (data.preTax * insuranceRate.medical) / 100;
        //失业保险金：	
        var unemployment = (data.preTax * insuranceRate.unemployment) / 100;
        //社保金额
        var socialAmount = pension + medical + unemployment;
        //	基本住房公积金：
        var provident = (data.preTax * insuranceRate.provident) / 100;
        //税前工资减去 社保减去公积金 -减去免征额-专项扣除
        var amount = data.preTax - socialAmount - provident - data.exemption - data.deduction;
        console.log(
            '养老保险金：',
            pension,
            '医疗保险金：',
            medical,
            '失业保险金：',
            unemployment,
            '基本住房公积金：', provident);

        var item;
        for (var i = data.monthlyTaxRate.length - 1; i >= 0; i--) {
            var monthly = data.monthlyTaxRate[i].monthly;
            if (amount >= monthly) {
                item = data.monthlyTaxRate[i];
                break;
            }
        }
        console.log(amount, item);
        //如果不等于空，找到了对应的比例  
        if (item != null && item != 'undefined') {
            var personalIncomeTax = ((amount * item.rate) / 100 - item.quickDeduction).toFixed(2);
            console.log("纳税额:", personalIncomeTax);
            this.setData({
                rate: item.rate,
                //税后工资
                afterTax: data.preTax - personalIncomeTax - pension - medical - unemployment - provident,
                //个人应纳税额
                payable: personalIncomeTax,
                //速算扣除数
                quickDeduction: item.quickDeduction,
                //社保
                socialAmount: socialAmount,
                //公积金
                provident: provident,
            });
        } else {
            //如果找不到
            //税前工资减去-社保-公积金-减去免征额
            var amount = data.preTax - socialAmount - provident - data.exemption;
            var personalIncomeTax = ((amount * 0) / 100 - 0).toFixed(2);
            console.log("纳税额:", personalIncomeTax);
            this.setData({
                rate: 0,
                //税后工资
                afterTax: data.preTax - personalIncomeTax - pension - medical - unemployment - provident,
                //个人应纳税额
                payable: personalIncomeTax,
                //速算扣除数
                quickDeduction: 0,
                //社保
                socialAmount: socialAmount,
                //公积金
                provident: provident,
            });
        }
    }
});