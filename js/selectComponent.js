define(function (require, exports, module) {
    var componentItem = require('js/formElement.js');

    var componentSelect = function (data, submitKey, onChange) {
        var self = this;
        // 继承自表单元素父类
        componentItem.call(self, data, submitKey);

        self.create = function () {
            var $component = $('<div>');
            var $label = $('<label>').text(self.componentData.label);
            var $select = $('<select>');
            var select = self.componentData.options;
            for (var i = 0; i < select.length; i++) {
                var $option = $('<option>').text(select[i].label);
                $option.attr('value', select[i].value);
                $option.appendTo($select);
            }
            $select.delegate('option', 'click', function (e) {
                e.preventDefault();
                var $target = $(e.target);
                onChange({
                    submitKey: submitKey,
                    value: $target.attr)'value'
                })
            });
            $component.append($label).append($select);

            return $component;
        }
    }

    componentSelect.prototype = new componentItem();
    componentSelect.prototype.constructor = componentSelect;

    return componentSelect;
});
