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

        regionCode: "310000",

        quickDeduction: 0,
        //税率表
        monthlyTaxRate: [
            { "level": 1, "rate": 3, "quickDeduction": 0, "monthly": 0, 'range': "0-3000" },
            { "level": 2, "rate": 10, "quickDeduction": 210, "monthly": 3001, 'range': "3001-12000" },
            { "level": 3, "rate": 20, "quickDeduction": 1410, "monthly": 12001, 'range': "12001-25000" },
            { "level": 4, "rate": 25, "quickDeduction": 2660, "monthly": 25001, 'range': "25001-35000" },
            { "level": 5, "rate": 30, "quickDeduction": 4410, "monthly": 35001, 'range': "35001-55000" },
            { "level": 6, "rate": 35, "quickDeduction": 7160, "monthly": 55001, 'range': "55001-80000" },
            { "level": 7, "rate": 45, "quickDeduction": 15160, "monthly": 80001, 'range': "80001-1200000000" }
        ],
        //五险一金
        insuranceRate: [
            { "regionCode": "310000", "pension": 8, "medical": 2, "unemployment": 0.5, 'provident': 7, 'desc': '上海' },
            { "regionCode": "110000", "pension": 8, "medical": 2, "unemployment": 0.2, 'provident': 12, 'desc': '北京' },
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

        // 医疗保险金：	
        var medical = (data.preTax * insuranceRate.medical) / 100;
        //失业保险金：	
        var unemployment = (data.preTax * insuranceRate.unemployment) / 100;

        //	基本住房公积金：
        var provident = (data.preTax * insuranceRate.provident) / 100;

        var amount = data.preTax - pension - medical - unemployment - provident - data.exemption - data.deduction;

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
        if (item != null && item != 'undefined') {
            var personalIncomeTax = (amount * item.rate) / 100 - item.quickDeduction;
            console.log("纳税额:", personalIncomeTax);
            this.setData({
                afterTax: data.preTax - personalIncomeTax - pension - medical - unemployment - provident,
                payable: personalIncomeTax,
                quickDeduction: item.quickDeduction
            });
        } else {

        }
    }
});