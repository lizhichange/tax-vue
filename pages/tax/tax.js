var base64 = require("../../dist/example/images/base64");
var util = require('../../utils/util.js');

//http://api.map.baidu.com/geocoder?location=40.047669,116.313082&output=json
Page({
    data: {
        array: [
            { code: 0.12, desc: '12%' },
            { code: 0.11, desc: '11%' },
            { code: 0.10, desc: '10%' },
            { code: 0.09, desc: '9%' },
            { code: 0.08, desc: '8%' },
            { code: 0.07, desc: '7%' },
            { code: 0.06, desc: '6%' },
            { code: 0.05, desc: '5%' }
        ],
        index: 0,
        region: ["上海市", "上海市"],
        //专项扣除
        deduction: 0.00,
        //税前收入
        preTax: 0.00
    },

    onLoad: function (options) {
        this.setData({
            icon20: base64.icon20,
            icon60: base64.icon60,
            //专项扣除
            deduction: util.isEmpty(options) ? 0.00 : JSON.parse(options.deduction)
        });
        //获取用户经纬度
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                console.log(res);
                const latitude = res.latitude;
                const longitude = res.longitude;
                const speed = res.speed;
                const accuracy = res.accuracy;
                wx.showToast({
                    title: '加载中',
                    icon: 'loading'
                });
                var myLocation = latitude + "," + longitude;
                wx.request({
                    url: 'https://api.map.baidu.com/geocoder?location=' + myLocation + '&output=json', // 仅为示例，并非真实的接口地址
                    data: {
                        x: '',
                        y: ''
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                        wx.hideToast();
                        if (res.data) {
                            var status = res.data.status;
                            if (status === 'OK') {
                                var result = res.data.result;
                                var city = result.addressComponent.city;
                                var province = result.addressComponent.province;
                                that.setData({
                                    region: [province, city]
                                });
                            }
                        }
                    }
                });

            }
        });
    },
    bindPreTaxInput: function (e) {
        this.setData({
            preTax: e.detail.value
        })
    },
    bindDeductionInput: function (e) {

        this.setData({
            deduction: e.detail.value
        })
    },

    bindViewTap: function () {
        wx.navigateTo({
            url: '../calc/calc'
        });
    },
    //选择公积金比例
    bindPickerChange: function (e) {
        console.log('公积金比例,picker发送选择改变，携带下标为:', e.detail.value);
        this.setData({
            index: e.detail.value
        })
    },
    //计算跳转结果页面
    previewTips: function (e) {

        var that = this;
        var data = that.__data__;
        console.log(data.preTax);
        if (data.preTax < 1) {
            wx.showToast({
                title: '请输入工资',
                icon: 'success',
                duration: 2000
            });
            return false
        }

        var index = data.index;
        var code;
        for (var i = 0, lenI = data.array.length; i < lenI; ++i) {
            if (i == index) {
                code = data.array[i].code
                break;
            }
        }
        console.log('公积金选择比例:', code)
        wx.navigateTo({
            url: '../preview/preview?preTax=' + data.preTax + '&deduction=' + data.deduction + '&proportion=' + code
        });
    },
    // 选择省市区函数
    changeRegin(e) {
        console.log('code', e.detail.code);
        this.setData({ region: e.detail.value });
    },

    open: function () {
        wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success: function (res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                }
            }
        });
    },
});