"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
const utils_1 = require("../utils");
exports.rule = {
    meta: {
        messages: {
            standardImport: 'Use a standard "import" statement instead of "{{adhocImport}}".',
        },
    },
    create(context) {
        const services = context.parserServices;
        if (!(0, utils_1.isRequiredParserServices)(services)) {
            return {};
        }
        return {
            'CallExpression[callee.type="Identifier"]': (node) => {
                if (context.getScope().type !== 'module' && context.getScope().type !== 'global') {
                    return;
                }
                const callExpression = node;
                const identifier = callExpression.callee;
                if (isAmdImport(callExpression, identifier, services) ||
                    isCommonJsImport(callExpression, identifier, services)) {
                    context.report({
                        node: identifier,
                        messageId: 'standardImport',
                        data: {
                            adhocImport: identifier.name,
                        },
                    });
                }
            },
        };
    },
};
function isCommonJsImport(callExpression, identifier, services) {
    return (callExpression.arguments.length === 1 &&
        (0, utils_1.isString)(callExpression.arguments[0], services) &&
        identifier.name === 'require');
}
function isAmdImport(callExpression, identifier, services) {
    if (identifier.name !== 'require' && identifier.name !== 'define') {
        return false;
    }
    if (callExpression.arguments.length !== 2 && callExpression.arguments.length !== 3) {
        return false;
    }
    return (0, utils_1.isFunction)(callExpression.arguments[callExpression.arguments.length - 1], services);
}
//# sourceMappingURL=no-require-or-define.js.map