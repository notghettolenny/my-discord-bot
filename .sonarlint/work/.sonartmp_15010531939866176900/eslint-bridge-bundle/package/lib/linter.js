"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCognitiveComplexity = exports.getHighlightedSymbols = exports.getRuleConfig = exports.decodeSonarRuntimeIssue = exports.LinterWrapper = exports.COGNITIVE_COMPLEXITY_RULE = exports.SYMBOL_HIGHLIGHTING_RULE = void 0;
/*
 * SonarQube JavaScript Plugin
 * Copyright (C) 2011-2022 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
const eslint_plugin_sonarjs_1 = require("eslint-plugin-sonarjs");
const eslint_plugin_chai_friendly_1 = require("eslint-plugin-chai-friendly");
const no_unused_expressions_decorator_1 = require("./rules/no-unused-expressions-decorator");
const main_1 = require("./rules/main");
const eslint_1 = require("eslint");
const symbol_highlighter_1 = require("./runner/symbol-highlighter");
const eslint_plugin_1 = require("@typescript-eslint/eslint-plugin");
const context_1 = require("./context");
const quickfix_1 = require("./quickfix");
const decorators_1 = require("./rules/decorators");
const COGNITIVE_COMPLEXITY_RULE_ID = 'internal-cognitive-complexity';
exports.SYMBOL_HIGHLIGHTING_RULE = {
    ruleId: symbol_highlighter_1.symbolHighlightingRuleId,
    ruleModule: symbol_highlighter_1.rule,
    ruleConfig: [],
};
exports.COGNITIVE_COMPLEXITY_RULE = {
    ruleId: COGNITIVE_COMPLEXITY_RULE_ID,
    ruleModule: eslint_plugin_sonarjs_1.rules['cognitive-complexity'],
    ruleConfig: ['metric'],
};
class LinterWrapper {
    /**
     * 'customRules' - rules provided by additional rule bundles
     */
    constructor(inputRules, customRules = [], environments = [], globals = []) {
        this.linter = new eslint_1.Linter();
        this.linter.defineRules(eslint_plugin_sonarjs_1.rules);
        this.linter.defineRules(main_1.rules);
        const NO_UNUSED_EXPRESSIONS = 'no-unused-expressions';
        // core implementation of this rule raises FPs on chai framework
        this.linter.defineRule(NO_UNUSED_EXPRESSIONS, (0, no_unused_expressions_decorator_1.decorateJavascriptEslint)(eslint_plugin_chai_friendly_1.rules[NO_UNUSED_EXPRESSIONS]));
        // S1537 and S3723 both depend on the same eslint implementation
        // but the plugin doesn't allow duplicates of the same key.
        this.linter.defineRule('enforce-trailing-comma', this.linter.getRules().get('comma-dangle'));
        // TS implementation of no-throw-literal is not supporting JS code.
        delete eslint_plugin_1.rules['no-throw-literal'];
        Object.keys(eslint_plugin_1.rules).forEach(name => {
            eslint_plugin_1.rules[name] = sanitizeTypeScriptESLintRule(eslint_plugin_1.rules[name]);
        });
        this.linter.defineRules(eslint_plugin_1.rules);
        const noUnusedExpressionsRule = eslint_plugin_1.rules[NO_UNUSED_EXPRESSIONS];
        if (noUnusedExpressionsRule) {
            this.linter.defineRule(NO_UNUSED_EXPRESSIONS, (0, no_unused_expressions_decorator_1.decorateTypescriptEslint)(noUnusedExpressionsRule));
        }
        decorators_1.externalRuleDecorators.forEach(externalRuleDecorator => {
            this.linter.defineRule(externalRuleDecorator.ruleKey, externalRuleDecorator.decorate(this.linter.getRules().get(externalRuleDecorator.ruleKey)));
        });
        customRules.forEach(r => this.linter.defineRule(r.ruleId, r.ruleModule));
        this.linter.defineRule(exports.COGNITIVE_COMPLEXITY_RULE.ruleId, exports.COGNITIVE_COMPLEXITY_RULE.ruleModule);
        this.linter.defineRule(exports.SYMBOL_HIGHLIGHTING_RULE.ruleId, exports.SYMBOL_HIGHLIGHTING_RULE.ruleModule);
        this.rules = this.linter.getRules();
        const inputRulesMain = [], inputRulesTest = [];
        inputRules.forEach(r => {
            if (r.fileTypeTarget.includes('MAIN')) {
                inputRulesMain.push(r);
            }
            if (r.fileTypeTarget.includes('TEST')) {
                inputRulesTest.push(r);
            }
        });
        this.linterConfig = this.createLinterConfig(inputRulesMain, environments, globals);
        this.testLinterConfig = this.createLinterConfig(inputRulesTest, environments, globals);
    }
    createLinterConfig(inputRules, environments, globals) {
        const env = { es6: true };
        const globalsConfig = {};
        for (const key of environments) {
            env[key] = true;
        }
        for (const key of globals) {
            globalsConfig[key] = true;
        }
        const ruleConfig = {
            rules: {},
            parserOptions: { sourceType: 'module', ecmaVersion: 2018 },
            env,
            globals: globalsConfig,
        };
        inputRules.forEach(inputRule => {
            const ruleModule = this.rules.get(inputRule.key);
            ruleConfig.rules[inputRule.key] = ['error', ...getRuleConfig(ruleModule, inputRule)];
        });
        if (!(0, context_1.getContext)().sonarlint) {
            [exports.COGNITIVE_COMPLEXITY_RULE, exports.SYMBOL_HIGHLIGHTING_RULE].forEach(r => (ruleConfig.rules[r.ruleId] = ['error', ...r.ruleConfig]));
        }
        return ruleConfig;
    }
    analyze(sourceCode, filePath, fileType) {
        const config = fileType === 'TEST' ? this.testLinterConfig : this.linterConfig;
        const issues = this.linter
            .verify(sourceCode, { ...config, settings: { fileType } }, {
            filename: filePath,
            allowInlineConfig: false,
        })
            .map(eslintIssue => processLintMessage(sourceCode, eslintIssue))
            .map(issue => {
            if (!issue) {
                return null;
            }
            return decodeSonarRuntimeIssue(this.rules.get(issue.ruleId), issue);
        })
            .filter((issue) => issue !== null)
            .map(normalizeIssueLocation);
        return {
            issues,
            highlightedSymbols: getHighlightedSymbols(issues),
            cognitiveComplexity: getCognitiveComplexity(issues),
        };
    }
}
exports.LinterWrapper = LinterWrapper;
// exported for testing
function decodeSonarRuntimeIssue(ruleModule, issue) {
    if (hasSonarRuntimeOption(ruleModule, issue.ruleId)) {
        try {
            const encodedMessage = JSON.parse(issue.message);
            return { ...issue, ...encodedMessage };
        }
        catch (e) {
            throw new Error(`Failed to parse encoded issue message for rule ${issue.ruleId}:\n"${issue.message}". ${e.message}`);
        }
    }
    return issue;
}
exports.decodeSonarRuntimeIssue = decodeSonarRuntimeIssue;
function sanitizeTypeScriptESLintRule(rule) {
    return {
        ...(!!rule.meta && { meta: rule.meta }),
        create(originalContext) {
            var _a;
            const interceptingContext = {
                id: originalContext.id,
                options: originalContext.options,
                settings: originalContext.settings,
                parserPath: originalContext.parserPath,
                parserOptions: originalContext.parserOptions,
                parserServices: originalContext.parserServices,
                getCwd() {
                    return originalContext.getCwd();
                },
                getPhysicalFilename() {
                    return originalContext.getPhysicalFilename();
                },
                getAncestors() {
                    return originalContext.getAncestors();
                },
                getDeclaredVariables(node) {
                    return originalContext.getDeclaredVariables(node);
                },
                getFilename() {
                    return originalContext.getFilename();
                },
                getScope() {
                    return originalContext.getScope();
                },
                getSourceCode() {
                    return originalContext.getSourceCode();
                },
                markVariableAsUsed(name) {
                    return originalContext.markVariableAsUsed(name);
                },
                report(descriptor) {
                    return originalContext.report(descriptor);
                },
            };
            if (((_a = rule.meta) === null || _a === void 0 ? void 0 : _a.docs) &&
                rule.meta.docs.requiresTypeChecking === true &&
                interceptingContext.parserServices.hasFullTypeInformation !== true) {
                return {};
            }
            return rule.create(interceptingContext);
        },
    };
}
function processLintMessage(source, eslintIssue) {
    // ruleId equals 'null' for parsing error,
    // but it should not happen because we lint ready AST and not file content
    if (!eslintIssue.ruleId) {
        console.error("Illegal 'null' ruleId for eslint issue");
        return null;
    }
    return {
        column: eslintIssue.column,
        line: eslintIssue.line,
        endColumn: eslintIssue.endColumn,
        endLine: eslintIssue.endLine,
        ruleId: eslintIssue.ruleId,
        message: eslintIssue.message,
        quickFixes: (0, quickfix_1.getQuickFixes)(source, eslintIssue),
        secondaryLocations: [],
    };
}
/**
 * 'sonar-runtime' is the option used by eslint-plugin-sonarjs rules to distinguish
 *  when they are executed in a sonar* context or in eslint
 *
 *  'sonar-context' is the option to distinguish rules which require context as part of their options
 *
 * exported for testing
 */
function getRuleConfig(ruleModule, inputRule) {
    const options = [...inputRule.configurations];
    if (hasSonarRuntimeOption(ruleModule, inputRule.key)) {
        options.push('sonar-runtime');
    }
    if (hasSonarContextOption(ruleModule, inputRule.key)) {
        options.push((0, context_1.getContext)());
    }
    return options;
}
exports.getRuleConfig = getRuleConfig;
function hasSonarRuntimeOption(ruleModule, ruleId) {
    const schema = getRuleSchema(ruleModule, ruleId);
    return !!schema && schema.some(option => !!option.enum && option.enum.includes('sonar-runtime'));
}
function hasSonarContextOption(ruleModule, ruleId) {
    const schema = getRuleSchema(ruleModule, ruleId);
    return !!schema && schema.some(option => option.title === 'sonar-context');
}
function getRuleSchema(ruleModule, ruleId) {
    if (!ruleModule) {
        console.log(`DEBUG ruleModule not found for rule ${ruleId}`);
        return undefined;
    }
    if (!ruleModule.meta || !ruleModule.meta.schema) {
        return undefined;
    }
    const { schema } = ruleModule.meta;
    return Array.isArray(schema) ? schema : [schema];
}
function normalizeIssueLocation(issue) {
    issue.column -= 1;
    if (issue.endColumn) {
        issue.endColumn -= 1;
    }
    return issue;
}
// exported for testing
function getHighlightedSymbols(issues) {
    const issue = findAndRemoveFirstIssue(issues, symbol_highlighter_1.symbolHighlightingRuleId);
    if (issue) {
        return JSON.parse(issue.message);
    }
    return undefined;
}
exports.getHighlightedSymbols = getHighlightedSymbols;
// exported for testing
function getCognitiveComplexity(issues) {
    const issue = findAndRemoveFirstIssue(issues, COGNITIVE_COMPLEXITY_RULE_ID);
    if (issue && !isNaN(Number(issue.message))) {
        return Number(issue.message);
    }
    return undefined;
}
exports.getCognitiveComplexity = getCognitiveComplexity;
function findAndRemoveFirstIssue(issues, ruleId) {
    for (const issue of issues) {
        if (issue.ruleId === ruleId) {
            const index = issues.indexOf(issue);
            issues.splice(index, 1);
            return issue;
        }
    }
    return undefined;
}
//# sourceMappingURL=linter.js.map