define(function (require, exports, module) {
    var ComponentInput = require('./inputComponent.js');
    var ComponentRadio = require('./radioComponent.js');
    var ComponentSelect = require('./selectComponent.js');
    var Form = function (opts) {
        var self = this;

        self.formData = opts.data;                      // 表单数据
        self.keyList = opts.data.items.submitKey;       // 索引列表
        self.itemsData = opts.data.items.items;         // 元素配置
        self.submitData = opts.data.items.submitData;   // 表单当前数值

        self.$container = opts.container;
        self.$form = $('<form>');

        // 广播数据变化
        function dataChanged() {
            for (var i = 0; i < self.keyList.length; i++) {
                var key = self.keyList[i];
                var item = self.itemsData[key];
                var newDom = item.factory.dataChanged && item.factory.dataChanged();
                if (newDom) {
                    item.dom.replaceWith(newDom);
                    item.dom = newDom;
                }
            }
        }
        // 响应组件的数据修改请求
        function handleChange(data) {
            self.submitData[data.submitKey] = data.value;
            dataChanged();
        }

        // 根据表单元素配置数据创建 DOM 元素的构造器
        for (item in self.itemsData) {
            var itemData = self.itemsData[item];
            switch (itemData.type) {
                case 'input':
                    itemData.factory = new ComponentInput(self.formData.items, item, handleChange);
                break;
                case 'radio':
                    itemData.factory = new ComponentRadio(self.formData.items, item, handleChange);
                break;
                case 'selector':
                    itemData.factory = new ComponentSelect(self.formData.items, item, handleChange);
                break;
            }
            itemData.dom = itemData.factory.create();
        }

        self.render = function () {
            for (var i = 0; i < self.keyList.length; i++) {
                var key = self.keyList[i];
                var itemData = self.itemsData[key];
                if (itemData.dom) {
                    self.$form.append(itemData.dom);
                }
            }
            self.$container.html(self.$form);
        };
    }

    return Form;
});
