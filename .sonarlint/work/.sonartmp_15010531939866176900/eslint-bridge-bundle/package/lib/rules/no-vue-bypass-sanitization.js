"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
exports.rule = {
    meta: {
        messages: {
            safeVueBypassing: 'Make sure bypassing Vue built-in sanitization is safe here.',
        },
    },
    create(context) {
        const services = context.parserServices;
        function attrsHref(calleeName) {
            // select call expression with given name where second argument is object expression like { attrs: { href: 'bla' } }
            return `CallExpression[callee.name='${calleeName}'] ObjectExpression.arguments:nth-child(2) > Property[key.name='attrs'] > ObjectExpression.value > Property[key.name='href']`;
        }
        const ruleListener = {
            ["JSXAttribute[name.name='domPropsInnerHTML']," +
                "Property[key.name='domProps'] > ObjectExpression.value > Property[key.name='innerHTML']"](node) {
                context.report({ node, messageId: 'safeVueBypassing' });
            },
            [`${attrsHref('createElement')},${attrsHref('h')}`](node) {
                context.report({ node, messageId: 'safeVueBypassing' });
            },
        };
        // @ts-ignore
        if (services.defineTemplateBodyVisitor) {
            // analyze <template> in .vue file
            const templateBodyVisitor = context.parserServices.defineTemplateBodyVisitor({
                ["VAttribute[directive=true][key.name.name='html']," +
                    "VAttribute[directive=true][key.argument.name='href']"](node) {
                    context.report({
                        loc: node.loc,
                        messageId: 'safeVueBypassing',
                    });
                },
            });
            Object.assign(ruleListener, templateBodyVisitor);
        }
        return ruleListener;
    },
};
//# sourceMappingURL=no-vue-bypass-sanitization.js.map