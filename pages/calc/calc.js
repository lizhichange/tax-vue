

Page({
    data: {
        checkboxItems: [
            {
                name: '继续教育', summary: '学历教育',
                value: '0', amount: 400.00,
                // checked: true,
            },
            {
                name: '首套房贷利息', summary: '本人或配偶首套房贷款利息(商业贷款),夫妻择一',
                value: '1', amount: 1000.00
            },
            {
                name: '子女教育', summary: '包含学前教育和学历教育,夫妻择一',
                value: '2', amount: 1000.00
            },
            {
                name: '租房租金', summary: '同城,夫妻择一;不同城,分别抵扣',
                value: '3', amount: 0.00
            },
            {
                name: '赡养老人', summary: '60岁以上父母及祖辈',
                value: '4', amount: 0.00
            }

        ],
        isAgree: false,
        deduction: 0.00
        ,
        list: [
            {
                id: 'feedback',
                name: '操作反馈',
                open: false,
                pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
            }
        ]
    },
    bindtapFix: function () {
        var that = this;
        var data = that.__data__;
        var deduction = JSON.stringify(data.deduction)
        wx.navigateTo({
            url: '../tax/tax?deduction=' + deduction
        });
    },

    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e, e.detail.value);
        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        var totalAmount = 0;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;
            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if (checkboxItems[i].value == values[j]) {
                    checkboxItems[i].checked = true;
                    totalAmount += checkboxItems[i].amount;
                    break;
                }
            }
        }
        console.log(totalAmount);
        this.setData({
            checkboxItems: checkboxItems,
            deduction: totalAmount
        });
    }
});