const {
    $Message
} = require('../../dist/base/index');

Page({
    data: {
        checkboxItems: [{
                name: '继续教育',
                summary: '学历教育',
                value: '0',
                amount: 400.00,
            },
            {
                name: '首套房贷利息',
                summary: '本人或配偶首套房贷款利息(商业贷款),夫妻择一',
                value: '1',
                amount: 1000.00,
                title: '',
                desc: ''
            },
            {
                name: '子女教育',
                summary: '包含学前教育和学历教育,夫妻择一',
                value: '2',
                amount: 0.00,
                title: '填写子女数量',
                desc: '仅含学前教育(3岁以上),学历教育(小学至博士)',
            },
            {
                name: '租房租金',
                summary: '同城,夫妻择一;不同城,分别抵扣',
                value: '3',
                amount: 0.00,
                title: '请选择城市类别',
            },
            {
                name: '赡养老人',
                summary: '60岁以上父母及祖辈',
                value: '4',
                amount: 0.00,
                title: '填写赡养老人支出',
                desc: '独生子女按照每月2000元标准定额扣除;非独生子女则自行协商平摊扣除金额',
            }

        ],
        isAgree: false,
        deduction: 0.00,
        elderly: 0,

        fruit: [{
            id: 1,
            name: '省会、直辖市、计划单列市',
            amount: 1500
        }, {
            id: 2,
            name: '人口大于100万城市',
            amount: 1100
        }, {
            id: 3,
            name: '人口小于100万城市',
            amount: 800
        }],
        current: '',
        position: 'left',
        checked: false,
        switch3: true,
        onChange(event) {
            const detail = event.detail;
            this.setData({
                'switch3': detail.value
            })
        },
        disabled: false,
        title2: '填写子女数量',
        title3: '请选择城市类别',
        title4: '填写赡养老人支出',
        visible2: false,
        input2: '',
        visible3: false,
        input3: '',
        visible4: false,
        input4: '',

    },
    bindtapFix: function () {
        var that = this;
        var data = that.__data__;
        var deduction = JSON.stringify(data.deduction)
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面
        //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
            deduction: deduction
        });
        wx.navigateBack({
            delta: 1
        });
    },
    //赡养老人
    getElderly: function (e) {
        var amount = 'checkboxItems[' + 4 + '].amount';
        var val = parseInt(e.detail.value);
        this.setData({
            [amount]: val
        });
    },


    //子女教育
    getEducation: function (e) {
        var amount = 'checkboxItems[' + 2 + '].amount';
        var val = 1000 * parseInt(e.detail.value);
        this.setData({
            [amount]: val
        });
    },
    //事件
    checkboxChange: function (e) {
        var checkboxItems = this.data.checkboxItems;
        var values = e.detail.value;

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
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (checkboxItems[i].checked == false && (i == 2 || i == 3 | i == 4)) {
                checkboxItems[i].amount = 0;

            }
        }
        this.setData({
            checkboxItems: checkboxItems,
            deduction: totalAmount
        });
    },

    openConfirm: function (e) {
        let index = e.currentTarget.dataset.index;
        let check = e.currentTarget.dataset.check;
        if (check) {
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
    },

    //模式窗体,子女教育
    handleOpen2(e) {
        let check = e.currentTarget.dataset.check;
        if (check) {
            return;
        }
        this.setData({
            visible2: true
        });
    },

    handleOk2(e) {
        var checkboxItems = this.data.checkboxItems;
        var totalAmount = 0;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (i == 2) {
                checkboxItems[i].checked = true;
                break;
            }
        }
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (checkboxItems[i].checked) {
                totalAmount += checkboxItems[i].amount;
            }
        }
        this.setData({
            checkboxItems: checkboxItems,
            visible2: false,
            deduction: totalAmount,
            input2: ''
        });
    },

    handleClose2() {
        var checkboxItems = this.data.checkboxItems;
        var totalAmount = 0;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (i == 2) {
                checkboxItems[i].checked = false;
                checkboxItems[i].amount = 0;
                break;
            } else {
                totalAmount += checkboxItems[i].amount;
            }
        }

        this.setData({
            visible2: false,
            checkboxItems: checkboxItems,
            input2: '',
        });


    },



    handleOpen3(e) {
        let check = e.currentTarget.dataset.check;
        if (check) {
            return;
        }
        this.setData({
            visible3: true,
            current: '',
        });
    },

    handleClose3() {
        var checkboxItems = this.data.checkboxItems;
        var totalAmount = 0;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (i == 3) {
                checkboxItems[i].checked = false;
                checkboxItems[i].amount = 0;
                break;
            } else {
                totalAmount += checkboxItems[i].amount;
            }
        }
        this.setData({
            visible3: false,
            checkboxItems: checkboxItems,
            current: '',
        });
    },


    handleOk3() {

        var checkboxItems = this.data.checkboxItems;
        var totalAmount = 0;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (i == 3) {
                checkboxItems[i].checked = true;
                break;
            }
        }
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (checkboxItems[i].checked) {
                totalAmount += checkboxItems[i].amount;
            }
        }

        this.setData({
            checkboxItems: checkboxItems,
            visible3: false,
            deduction: totalAmount,

        });

    },
    //下拉确认
    handleFruitChange({
        detail = {}
    }) {
        var fruit = this.data.fruit;
        var item;
        for (var i = 0, lenI = fruit.length; i < lenI; ++i) {
            if (fruit[i].name === detail.value) {
                item = fruit[i];
                break;
            }
        }
        var amount = 'checkboxItems[' + 3 + '].amount';
        this.setData({
            current: detail.value,
            [amount]: item.amount
        });
    },


    //打开模式窗体 
    handleOpen4(e) {
        let check = e.currentTarget.dataset.check;
        if (check) {
            return;
        }
        this.setData({
            visible4: true,
            input4: ''

        });
    },
    //确认数据
    handleOk4(e) {
        var checkboxItems = this.data.checkboxItems;
        var totalAmount = 0;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (i == 4) {
                checkboxItems[i].checked = true;
                break;
            }
        }
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (checkboxItems[i].checked) {
                totalAmount += checkboxItems[i].amount;
            }
        }
        this.setData({
            checkboxItems: checkboxItems,
            visible4: false,
            deduction: totalAmount,
            input4: ''
        });
    },
    //取消数据
    handleClose4() {

        var checkboxItems = this.data.checkboxItems;
        var totalAmount = 0;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            if (i == 4) {
                checkboxItems[i].checked = false;
                checkboxItems[i].amount = 0;
                break;
            } else {
                totalAmount += checkboxItems[i].amount;
            }
        }

        this.setData({
            visible4: false,
            checkboxItems: checkboxItems,
            input4: '',
        });

    },



});