var util = require('../../utils/util.js');



Page({

    data: {
        //税前收入
        preTax: 0.00
    },
    onLoad: function (e) {
        this.setData({
            preTax: util.isEmpty(e) ? 0.00 : e.preTax
        });
    }
});