define(function (require, exports, module) {
    var componentItem = require('js/formElement.js');

    var componentInput = function (data, submitKey, onChange) {
        var self = this;
        // 继承自表单元素父类
        componentItem.call(self, data, submitKey);

        self.checkValidate();
        self.checkDependent();

        // 根据表单数据和组件状态渲染 dom 结构
        self.create = function () {
            var $component = $('<div>');
            var $label = $('<label>')
                .text(self.componentData.label)
                .addClass('form-component-item-label');
            var $input = $('<input>')
                .val(self.submitData[submitKey])
                .addClass('form-component-item-controls');
            $input.change(function (e) {
                var $target = $(e.target);
                onChange({
                    submitKey: submitKey,
                    value: $target.val()
                });
            });

            $component.append($label).append($input);
            self.setStyle($component);
            self.isStateChange = false;
            return $component;
        };

        self.setStyle = function ($component) {
            $component.addClass('form-component-item');
            if (!self.validateState) {
                $component.addClass('form-component-item-warning');
            }
            if (!self.dependentState) {
                switch (self.componentData.dependent.fail) {
                    case 'hide':
                        $component.addClass('form-component-item-hide');
                    break;
                    case 'disable':
                        $component.addClass('form-component-item-disable');
                        $component.find('input').attr('disabled', 'disabled');
                    break;
                }
            }
        };
    }

    componentInput.prototype = new componentItem();
    componentInput.prototype.constructor = componentInput;

    return componentInput;
});
