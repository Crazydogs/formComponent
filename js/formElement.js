/**
 *  @file 所有表单元素的父类
 *  @author liuyueming
 *
 *  维持所有组件的通用方法
 *  包括合法校验，依赖校验，状态 diff
 */
define(function (require, exports, module) {
    var validate = require('js/formValidate.js');
    var checkDependent = require('js/formDependent.js');
    var componentItem = function (data, submitKey) {
        if (data) {
            var self = this;

            // 表单当前值
            self.submitData = data.submitData;
            // 元素配置数据
            self.componentData = data.items[submitKey];

            self.validateState = true;          // 合法校验状态
            self.dependentState = true;         // 依赖校验状态
            self.isStateChange = false;         // 状态是否改变标志
        }
    };

    // 数据合法校验
    componentItem.prototype.checkValidate = function () {
        var self = this;
        var newValidateState = true;

        if (!self.componentData.validate) {
            newValidateState = true;
        }
        var result = validate(self.componentData.validate, self.submitData[submitKey]);
        newValidateState = result.pass;

        // 状态变更检查
        if (newValidateState !== self.validateState) {
            self.isStateChange = true;
        }

        self.validateState = newValidateState;
    };
    // 表单元素依赖校验
    componentItem.prototype.checkDependent = function () {
        var self = this;
        var newDependentState = true;

        if (!self.componentData.dependent) {
            newDependentState = true;
        }
        var result = checkDependent(self.componentData.dependent, self.submitData[submitKey]);
        newDependentState = result.pass;

        // 状态变更检查
        if (newValidateState !== self.validateState) {
            self.isStateChange = true;
        }

        self.dependentState = newDependentState;
    };
    return componentItem;
});
