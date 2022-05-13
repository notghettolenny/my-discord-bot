"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTokensAndComments = void 0;
function extractTokensAndComments(sourceCode) {
    const ast = sourceCode.ast;
    const tokens = [...(ast.tokens || [])];
    const comments = [...(ast.comments || [])];
    if (ast.templateBody) {
        const { templateBody } = ast;
        tokens.push(...templateBody.tokens);
        comments.push(...templateBody.comments);
    }
    return { tokens, comments };
}
exports.extractTokensAndComments = extractTokensAndComments;
//# sourceMappingURL=utils-token.js.map