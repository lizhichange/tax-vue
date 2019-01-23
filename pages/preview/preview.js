var util = require('../../utils/util.js');

const app = getApp()


Page({
    data: {
        //税前收入
        preTax: 0.00,
        //专项扣除
        deduction: 0.00,
        //免征额
        exemption: 5000,
        //税率表
        monthlyTaxRate: [
            { "level": 1, "deduction": 0, "rate": 3, "monthly": "0-3000" },
            { "level": 2, "deduction": 10, "rate": 210, "monthly": "3000-12000" },
            { "level": 3, "deduction": 20, "rate": 1410, "monthly": "12000-25000" },
            { "level": 4, "deduction": 25, "rate": 2660, "monthly": "25000-35000" },
            { "level": 5, "deduction": 30, "rate": 4410, "monthly": "35000-55000" },
            { "level": 6, "deduction": 35, "rate": 7160, "monthly": "55000-80000" },
            { "level": 7, "deduction": 45, "rate": 15160, "monthly": "80000-2147483647" }
        ]
    },
    onLoad: function (e) {
        this.setData({
            preTax: util.isEmpty(e) ? 0.00 : e.preTax,
            deduction: util.isEmpty(e) ? 0.00 : e.deduction
        });
        this.calc(e);
    },
    calc: function (e) {
        var that = this;
        var data = that.__data__;
        var amount = data.preTax - data.exemption - data.deduction;
        console.log(amount);
        if (amount) {


        }


    }
});