
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
                value: '1', amount: 1000.00, title: '', desc: ''
            },
            {
                name: '子女教育', summary: '包含学前教育和学历教育,夫妻择一',
                value: '2', amount: 0.00, title: '填写子女数量', desc: '仅含学前教育(3岁以上),学历教育(小学至博士)',
            },
            {
                name: '租房租金', summary: '同城,夫妻择一;不同城,分别抵扣',
                value: '3', amount: 0.00, title: '请选择城市类别',
            },
            {
                name: '赡养老人', summary: '60岁以上父母及祖辈',
                value: '4', amount: 0.00, title: '填写赡养老人支出', desc: '独生子女按照每月2000元标准定额扣除;非独生子女则自行协商平摊扣除金额',
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
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
            deduction: deduction
        });
        wx.navigateBack({
            delta: 1
        });

    },

    checkboxChange: function (e) {
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
        this.setData({
            checkboxItems: checkboxItems,
            deduction: totalAmount
        });
    },

    openConfirm: function (e) {
        let index = e.currentTarget.dataset.index;
        const query = wx.createSelectorQuery();
        let box;
        query.select('#box-' + index + '').boundingClientRect({
            suc: function (rects) {
                box = rects.dataset.check;
            },
            box: box
        }).exec();
        console.log(box);
        if (box) {
            return;
        }
        var checkboxItems = this.data.checkboxItems;
        var item;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (checkboxItems[i].value == index) {
                item = checkboxItems[i];
                break;
            }
        }

        wx.showModal({
            title: item.title,
            content: '',
            input: '输入框默认值',
            confirmText: "主操作",
            cancelText: "辅助操作",
            success: function (res) {

                if (res.confirm) {
                    console.log('')
                } else {
                    console.log('')
                }
            }
        });

    },
});