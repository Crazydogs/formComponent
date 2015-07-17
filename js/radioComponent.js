define(function (require, exports, module) {
    var componentItem = require('js/formElement.js');

    var componentRadio = function (data, submitKey, onChange) {
        var self = this;
        // 继承自表单元素父类
        componentItem.call(self, data, submitKey);

        self.create = function () {
            // dom 构造
            var $component = $('<div>');
            var $label = $('<label>').text(self.componentData.label);
            $component.append($label);
            var radios = self.componentData.options;
            var $radios = $('<div>');
            $component.append($radios);
            for (var i = 0; i < radios.length; i++) {
                var $option = $('<div>');
                var $radioLabel = $('<span>').text(radios[i].label);
                var $input = $('<input type="radio">').attr({
                    value: radios[i].value,
                    name: submitKey
                });
                if (self.submitData[submitKey] !== undefined && self.submitData[submitKey] === radios[i].value) {
                    $input.attr('checked', 'checked');
                }
                $option.append($radioLabel).append($input);
                $radios.append($option);
            }

            // 事件绑定
            $component.delegate('input', 'click', function (e) {
                e.preventDefault();
                var $target = $(e.target);
                onChange({
                    submitKey: submitKey,
                    value: $target.attr('value')
                });
            });

            return $component;
        };
    };

    componentRadio.prototype = new componentItem();
    componentRadio.prototype.constructor = componentRadio;

    return componentRadio;
});
