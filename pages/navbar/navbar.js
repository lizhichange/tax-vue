var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["工资薪金", "年终奖"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        grids: [
            { "name": "首套房贷" },
            { "name": "子女教育" },
            { "name": "赡养老人" },
            { "name": "房租支出" },
            { "name": "大病医疗" },
            { "name": "继续教育" }


        ]
    },



    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },

    openConfirm: function () {
        wx.showModal({
            title: '弹窗标题',
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            confirmText: "主操作",
            cancelText: "辅助操作",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击主操作')
                } else {
                    console.log('用户点击辅助操作')
                }
            }
        });
    },
    openAlert: function () {
        wx.showModal({
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        });
    }
});