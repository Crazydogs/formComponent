define(function (require, exports, module) {
    var componentItem = require('js/formElement.js');

    var componentInput = function (data, submitKey, onChange) {
        var self = this;
        // 继承自表单元素父类
        componentItem.call(self, data, submitKey);

        self.create = function () {
            var $component = $('<div>');
            var $label = $('<label>').text(self.componentData.label);
            var $input = $('<input>').val(self.submitData[submitKey]);
            $input.change(function (e) {
                var $target = $(e.target);
                onChange({
                    submitKey: submitKey,
                    value: $target.val()
                });
            });

            $component.append($label).append($input);
            return $component;
        }
    }

    componentInput.prototype = new componentItem();
    componentInput.prototype.constructor = componentInput;

    return componentInput;
});
