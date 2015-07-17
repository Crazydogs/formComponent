define(function (require, exports, module) {
    var ComponentInput = require('js/inputComponent.js');
    var ComponentRadio = require('js/radioComponent.js');
    var ComponentSelect = require('js/selectComponent.js');
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
        }
        // 响应组件的数据修改请求
        function handleChange(data) {
            var itemData = self.itemsData[data.submitKey];
            itemData.value = data.value;
            console.log(itemData.value);
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
        }

        self.render = function () {
            for (var i = 0; i < self.keyList.length; i++) {
                var key = self.keyList[i];
                var itemData = self.itemsData[key];
                if (itemData.factory) {
                    self.$form.append(itemData.factory.create());
                }
            }
            self.$container.html(self.$form);
        };
    }

    return Form;
});
