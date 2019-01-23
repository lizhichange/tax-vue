var util = require('../../utils/util.js');

const app = getApp()


Page({
    data: {
        //税前收入
        preTax: 0.00,
        //税后收入
        afterTax: 0.00,
        //专项扣除
        deduction: 0.00,
        //免征额
        exemption: 5000,
        //税率表
        monthlyTaxRate: [
            { "level": 1, "rate": 3, "quickDeduction": 0, "monthly": 0, range: "0-3000" },
            { "level": 2, "rate": 10, "quickDeduction": 210, "monthly": 3001, range: "3001-12000" },
            { "level": 3, "rate": 20, "quickDeduction": 1410, "monthly": 12001, range: "12001-25000" },
            { "level": 4, "rate": 25, "quickDeduction": 2660, "monthly": 25001, range: "25001-35000" },
            { "level": 5, "rate": 30, "quickDeduction": 4410, "monthly": 35001, range: "35001-55000" },
            { "level": 6, "rate": 35, "quickDeduction": 7160, "monthly": 55001, range: "55001-80000" },
            { "level": 7, "rate": 45, "quickDeduction": 15160, "monthly": 80001, range: "80001-1200000000" }
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
            var preTax = (amount * item.rate) / 100 - item.quickDeduction;
            console.log("纳税额:", preTax);
            this.setData({
                afterTax: data.preTax - preTax
            });
        } else {

        }
    }
});