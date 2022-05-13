"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegExpRule = void 0;
const regexpp = __importStar(require("regexpp"));
const utils_1 = require("../utils");
/**
 * Rule template to create regex rules.
 * @param handlers - the regexpp node handlers
 * @param meta - the (optional) rule metadata
 * @returns the resulting rule module
 */
function createRegExpRule(handlers, metadata = { meta: {} }) {
    return {
        ...metadata,
        create(context) {
            const services = (0, utils_1.isRequiredParserServices)(context.parserServices)
                ? context.parserServices
                : null;
            function checkRegex(node, regExpAST) {
                if (!regExpAST) {
                    return;
                }
                const ctx = Object.create(context);
                ctx.node = node;
                ctx.reportRegExpNode = reportRegExpNode;
                regexpp.visitRegExpAST(regExpAST, handlers(ctx));
            }
            function reportRegExpNode(descriptor) {
                const { node, regexpNode, message, offset = [0, 0] } = descriptor;
                const loc = (0, utils_1.getRegexpLocation)(node, regexpNode, context, offset);
                context.report({ message, loc });
            }
            function checkLiteral(literal) {
                checkRegex(literal, (0, utils_1.getParsedRegex)(literal, context));
            }
            function checkCallExpression(callExpr) {
                let parsedRegex = (0, utils_1.getParsedRegex)(callExpr, context);
                if (!parsedRegex && services && (0, utils_1.isStringRegexMethodCall)(callExpr, services)) {
                    const [implicitRegex] = callExpr.arguments;
                    parsedRegex = (0, utils_1.getParsedRegex)(implicitRegex, context);
                }
                checkRegex(callExpr.arguments[0], parsedRegex);
            }
            return {
                'Literal[regex]': checkLiteral,
                NewExpression: checkCallExpression,
                CallExpression: checkCallExpression,
            };
        },
    };
}
exports.createRegExpRule = createRegExpRule;
//# sourceMappingURL=regex-rule-template.js.map