/*
 *  拥有选项的元素子类
 */
define(function (require, exports, module) {
    var ComponentItem = require('js/formElement.js');
    var checkDependent = require('js/formDependent.js');

    var componentOptionElement = function (data, submitKey) {
        if (data) {
            var self = this;

            ComponentItem.call(self, data, submitKey);

            // 重写依赖状态
            self.dependentState = [];
            for (var i = 0; i < self.componentData.options.length; i++) {
                self.dependentState[i] = true;
            }

            // 重写依赖检查方法
            self.checkDependent = function () {
                var dependentRules = self.componentData.dependent;
                if (!dependentRules) {
                    return;
                }
                var newDependentState = [];
                // 针对每个选项校验依赖
                for (var i = 0; i < dependentRules.length; i++) {
                    if (dependentRules[i].rules) {
                        var result = checkDependent(dependentRules[i].rules, self.submitData[self.submitKey]);
                        newDependentState[i] = result.pass;
                    }
                }

                // 检查依赖状态是否发生变化
                var change = false;
                for (var i = 0; i < newDependentState.length; i++) {
                    if (self.dependentState[i] !== newDependentState[i]) {
                        change = true;
                        break;
                    }
                }

                self.isStateChange = change;
            }
        }
    };
    componentOptionElement.prototype = new ComponentItem();
    componentOptionElement.prototype.constructor = componentOptionElement;

    return componentOptionElement;
});
