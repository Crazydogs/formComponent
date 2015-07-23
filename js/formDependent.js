/*
 * 检查单个依赖规则
 */
define(function (require, exports, module) {
    var checkDependent = function (dependentData, value) {
        var result = true;
        var reason = null;

        for (key in dependentData && dependentData.rules) {
            if (value[key] !== dependentData.rules[key]) {
                result = false;
                reason = key;
                break;
            }
        }

        return {
            pass: result,
            reason: reason
        }
    };
     return checkDependent;
});

