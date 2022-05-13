"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractReferences = exports.isStringReplaceCall = void 0;
const utils_type_1 = require("./utils-type");
const utils_ast_1 = require("./utils-ast");
function isStringReplaceCall(call, services) {
    return (call.callee.type === 'MemberExpression' &&
        call.callee.property.type === 'Identifier' &&
        !call.callee.computed &&
        ['replace', 'replaceAll'].includes(call.callee.property.name) &&
        call.arguments.length > 1 &&
        (0, utils_type_1.isString)(call.callee.object, services));
}
exports.isStringReplaceCall = isStringReplaceCall;
function extractReferences(node) {
    const references = [];
    if ((0, utils_ast_1.isStringLiteral)(node)) {
        const str = node.value;
        const reg = /\$(\d+)|\$\<([a-zA-Z][a-zA-Z0-9_]*)\>/g;
        let match;
        while ((match = reg.exec(str)) !== null) {
            const [raw, index, name] = match;
            const value = index || name;
            references.push({ raw, value });
        }
    }
    return references;
}
exports.extractReferences = extractReferences;
//# sourceMappingURL=utils-string-replace.js.map