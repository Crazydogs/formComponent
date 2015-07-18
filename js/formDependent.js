define(function (require, exports, module) {
    var checkDependent = function (dependentRules, value) {
        var result = true;
        var reason = null;

        for (key in dependentRules) {
            if (value[key] !== dependentRules[key]) {
                result = false;
                reason = key;
                break;
            }
        }

        return {
            pass: result,
            reason: reason
        }
    }
});

