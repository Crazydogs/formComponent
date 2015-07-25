/*
    @file 数值校验模块
    @author liuyueming
 
    根据校验规则校验数据合法性，返回校验结果与不通过原因
    {
        pass: true/false,
        reason: []
    }
 */
define(function (require, exports, module) {
    var validate = function (validateRules, value) {
        var result = [];
        // 必填
        if (validateRules.need) {
            if (value === undefined) {
                result.push('need');
            }
        }

        var length = value ? value.toString().length : 0;
        // 最长长度
        if (validateRules.maxLength) {
            if (length > validateRules.maxLength) {
                result.push('maxLength');
            }
        }
        // 最小长度
        if (validateRules.minLength) {
            if (length < validateRules.minLength) {
                result.push('minLength');
            }
        }
        // 特定类别
        if (validateRules.type) {
            var regexp = null;
            switch (validateRules.type) {
                // 正整数
                case 'int':
                    regexp = /^\d+$/;
                break;
                // 正数
                case 'positiveNumber':
                    regexp = /^\d+(\.\d+)?$/;
                break;
                // 版本号
                case 'version':
                    regexp = /^((\d)+\.)*(\d)+$/;   // 如 1.0.2
                break;
            }

            if (regexp && !regexp.test(value)) {
                result.push('type');
            }
        }

        // 返回
        if (result.length) {
            return {
                pass: false,
                reason: result
            }
        } else {
            return {
                pass: true,
                reason: []
            }
        }
    };

    return validate;
});
