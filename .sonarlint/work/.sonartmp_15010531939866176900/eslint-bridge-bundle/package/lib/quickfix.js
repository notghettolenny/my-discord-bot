"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageForQuickFix = exports.getQuickFixes = void 0;
const quickFixRules = new Set([
    // eslint core
    'comma-dangle',
    'eol-last',
    'no-extra-semi',
    'no-trailing-spaces',
    'no-unsafe-negation',
    'no-var',
    'object-shorthand',
    'prefer-const',
    'prefer-regex-literals',
    'prefer-template',
    'quotes',
    'radix',
    'semi',
    // decorated eslint core
    'no-dupe-keys',
    'no-duplicate-imports',
    'no-empty',
    'no-empty-function',
    'no-throw-literal',
    'no-unreachable',
    'use-isnan',
    // eslint-plugin-sonarjs
    'no-collection-size-mischeck',
    'no-inverted-boolean-check',
    'no-redundant-jump',
    'non-existent-operator',
    'prefer-immediate-return',
    'prefer-single-boolean-return',
    'prefer-while',
    // @typescript-eslint plugin
    'no-empty-interface',
    'no-explicit-any',
    'no-inferrable-types',
    'no-unnecessary-type-arguments',
    'no-unnecessary-type-assertion',
    'prefer-namespace-keyword',
    'prefer-readonly',
    'no-non-null-assertion',
    // decorated @typescript-eslint plugin
    'prefer-for-of',
    // sonarjs
    'different-types-comparison',
    'inverted-assertion-arguments',
    'no-alphabetical-sort',
    'no-commented-code',
    'no-duplicate-in-composite',
    'no-global-this',
    'no-in-misuse',
    'no-primitive-wrappers',
    'no-redundant-optional',
    'no-redundant-parentheses',
    'no-undefined-argument',
    'no-unthrown-error',
    'no-unused-function-argument',
    'prefer-promise-shorthand',
    'prefer-type-guard',
    'unused-import',
]);
const quickFixMessages = new Map([
    ['comma-dangle', 'Remove this trailing comma'],
    ['eol-last', 'Add a new line at the end of file'],
    ['no-extra-semi', 'Remove extra semicolon'],
    ['no-trailing-spaces', 'Remove trailing space'],
    ['no-var', "Replace 'var' with 'let'"],
    ['object-shorthand', 'Use shorthand property'],
    ['prefer-const', "Replace with 'const'"],
    ['prefer-template', 'Replace with template string literal'],
    ['quotes', 'Fix quotes'],
    ['radix', 'Add 10 as radix'],
    ['semi', 'Add semicolon'],
    ['prefer-immediate-return', 'Return value immediately'],
    ['prefer-while', "Replace with 'while' loop"],
    ['no-empty-interface', 'Replace with type alias'],
    ['no-inferrable-types', 'Remove type declaration'],
    ['no-unnecessary-type-arguments', 'Remove type argument'],
    ['no-unnecessary-type-assertion', 'Remove type assertion'],
    ['prefer-namespace-keyword', "Replace with 'namespace' keyword"],
    ['prefer-readonly', "Add 'readonly'"],
    ['no-non-null-assertion', "Replace with optional chaining '.?'"],
]);
function getQuickFixes(source, eslintIssue) {
    if (!hasQuickFix(eslintIssue)) {
        return [];
    }
    const quickFixes = [];
    if (eslintIssue.fix) {
        quickFixes.push({
            message: getMessageForQuickFix(eslintIssue.ruleId),
            edits: [fixToEdit(source, eslintIssue.fix)],
        });
    }
    if (eslintIssue.suggestions) {
        eslintIssue.suggestions.forEach(suggestion => {
            quickFixes.push({
                message: suggestion.desc,
                edits: [fixToEdit(source, suggestion.fix)],
            });
        });
    }
    return quickFixes;
}
exports.getQuickFixes = getQuickFixes;
function hasQuickFix(issue) {
    if (!issue.fix && (!issue.suggestions || issue.suggestions.length === 0)) {
        return false;
    }
    return !!issue.ruleId && quickFixRules.has(issue.ruleId);
}
function fixToEdit(source, fix) {
    const [start, end] = fix.range;
    const startPos = source.getLocFromIndex(start);
    const endPos = source.getLocFromIndex(end);
    return {
        loc: {
            line: startPos.line,
            column: startPos.column,
            endLine: endPos.line,
            endColumn: endPos.column,
        },
        text: fix.text,
    };
}
// exported for testing
function getMessageForQuickFix(ruleKey) {
    if (!quickFixMessages.has(ruleKey)) {
        throw Error(`Missing message for quick fix '${ruleKey}'`);
    }
    return quickFixMessages.get(ruleKey);
}
exports.getMessageForQuickFix = getMessageForQuickFix;
//# sourceMappingURL=quickfix.js.map