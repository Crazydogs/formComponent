/**
 *  @file 所有表单元素的父类
 *  @author liuyueming
 *
 *  维持所有组件的通用方法
 *  包括合法校验，依赖校验，状态 diff，表单数据变化的响应
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

        if (submitKey) {
            self.submitKey = submitKey;
        }
    };

    // 数据合法校验
    componentItem.prototype.checkValidate = function () {
        var self = this;
        var newValidateState = true;

        if (!self.componentData.validate) {
            newValidateState = true;
        } else {
            var result = validate(self.componentData.validate, self.submitData[self.submitKey]);
            newValidateState = result.pass;
        }

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
        } else {
            var result = checkDependent(self.componentData.dependent, self.submitData[self.submitKey]);
            newDependentState = result.pass;
        }

        // 状态变更检查
        if (newDependentState !== self.dependentState) {
            self.isStateChange = true;
        }

        self.dependentState = newDependentState;
    };
    // 响应表单的数据变化
    componentItem.prototype.dataChanged = function () {
        var self = this;
        self.checkValidate();
        self.checkDependent();

        if (self.isStateChange) {
            return self.create();
        } else {
            return false;
        }
    };
    return componentItem;
});
