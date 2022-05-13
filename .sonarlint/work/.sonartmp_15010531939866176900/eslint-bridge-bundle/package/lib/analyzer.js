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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCustomRuleBundle = exports.initLinter = exports.analyzeCss = exports.analyzeTypeScript = exports.analyzeJavaScript = exports.EMPTY_RESPONSE = void 0;
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
const parser_1 = require("./parser");
const highlighter_1 = __importDefault(require("./runner/highlighter"));
const metrics_1 = __importStar(require("./runner/metrics"));
const cpd_1 = __importDefault(require("./runner/cpd"));
const eslint_1 = require("eslint");
const linter_1 = require("./linter");
const context_1 = require("./context");
const process_1 = require("process");
const stylelint = __importStar(require("stylelint"));
exports.EMPTY_RESPONSE = {
    issues: [],
    highlights: [],
    highlightedSymbols: [],
    metrics: metrics_1.EMPTY_METRICS,
    cpdTokens: [],
};
function analyzeJavaScript(input) {
    return Promise.resolve(analyze(input, 'js'));
}
exports.analyzeJavaScript = analyzeJavaScript;
function analyzeTypeScript(input) {
    return Promise.resolve(analyze(input, 'ts'));
}
exports.analyzeTypeScript = analyzeTypeScript;
function analyzeCss(input) {
    const { filePath, fileContent, stylelintConfig } = input;
    const code = typeof fileContent == 'string' ? fileContent : (0, parser_1.getFileContent)(filePath);
    const options = {
        code,
        codeFilename: filePath,
        configFile: stylelintConfig,
    };
    return stylelint
        .lint(options)
        .then(result => ({ issues: fromStylelintToSonarIssues(result.results, filePath) }));
}
exports.analyzeCss = analyzeCss;
function fromStylelintToSonarIssues(results, filePath) {
    const issues = [];
    // we should have only one element in 'results' as we are analyzing only 1 file
    results.forEach(result => {
        // to avoid reporting on "fake" source like <input ccs 1>
        if (result.source !== filePath) {
            console.log(`DEBUG For file [${filePath}] received issues with [${result.source}] as a source. They will not be reported.`);
            return;
        }
        result.warnings.forEach(warning => issues.push({
            line: warning.line,
            column: warning.column,
            message: warning.text,
            ruleId: warning.rule,
            secondaryLocations: [],
        }));
    });
    return issues;
}
let linter;
const customRules = [];
function initLinter(rules, environments = [], globals = []) {
    console.log(`DEBUG initializing linter with ${rules.map(r => r.key)}`);
    linter = new linter_1.LinterWrapper(rules, customRules, environments, globals);
}
exports.initLinter = initLinter;
function loadCustomRuleBundle(bundlePath) {
    const bundle = require(bundlePath);
    customRules.push(...bundle.rules);
    return bundle.rules.map((r) => r.ruleId);
}
exports.loadCustomRuleBundle = loadCustomRuleBundle;
function analyze(input, language) {
    if (!linter) {
        throw new Error('Linter is undefined. Did you call /init-linter?');
    }
    const { result, duration: parseTime } = measureDuration(() => (0, parser_1.buildSourceCode)(input, language));
    if (result instanceof eslint_1.SourceCode) {
        const { result: response, duration: analysisTime } = measureDuration(() => analyzeFile(result, input));
        return { ...response, perf: { parseTime, analysisTime } };
    }
    else {
        return {
            ...exports.EMPTY_RESPONSE,
            parsingError: result,
        };
    }
}
function measureDuration(f) {
    const start = process_1.hrtime.bigint();
    const result = f();
    const duration = Math.round(Number(process_1.hrtime.bigint() - start) / 1000);
    return { result, duration };
}
function analyzeFile(sourceCode, input) {
    try {
        const { issues, highlightedSymbols, cognitiveComplexity } = linter.analyze(sourceCode, input.filePath, input.fileType);
        if ((0, context_1.getContext)().sonarlint) {
            return { issues, metrics: (0, metrics_1.getNosonarMetric)(sourceCode) };
        }
        else if (input.fileType === 'MAIN') {
            return {
                issues,
                highlightedSymbols,
                highlights: (0, highlighter_1.default)(sourceCode).highlights,
                metrics: (0, metrics_1.default)(sourceCode, !!input.ignoreHeaderComments, cognitiveComplexity),
                cpdTokens: (0, cpd_1.default)(sourceCode).cpdTokens,
            };
        }
        else {
            // for test file
            return {
                issues,
                highlightedSymbols,
                highlights: (0, highlighter_1.default)(sourceCode).highlights,
                metrics: (0, metrics_1.getNosonarMetric)(sourceCode),
            };
        }
    }
    catch (e) {
        // turns exceptions from TypeScript compiler into "parsing" errors
        if (e.stack.indexOf('typescript.js:') > -1) {
            const parsingError = { message: e.message, code: parser_1.ParseExceptionCode.FailingTypeScript };
            return { issues: [], parsingError };
        }
        else {
            throw e;
        }
    }
}
//# sourceMappingURL=analyzer.js.map