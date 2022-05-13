import { Linter, Rule as ESLintRule, SourceCode } from 'eslint';
import { FileType, Issue, Rule } from './analyzer';
export declare const SYMBOL_HIGHLIGHTING_RULE: AdditionalRule;
export declare const COGNITIVE_COMPLEXITY_RULE: AdditionalRule;
export interface AdditionalRule {
    ruleId: string;
    ruleModule: ESLintRule.RuleModule;
    ruleConfig: any[];
    activateAutomatically?: boolean;
}
export declare class LinterWrapper {
    linter: Linter;
    linterConfig: Linter.Config;
    testLinterConfig: Linter.Config;
    rules: Map<string, ESLintRule.RuleModule>;
    /**
     * 'customRules' - rules provided by additional rule bundles
     */
    constructor(inputRules: Rule[], customRules?: AdditionalRule[], environments?: string[], globals?: string[]);
    createLinterConfig(inputRules: Rule[], environments: string[], globals: string[]): Linter.Config<Linter.RulesRecord>;
    analyze(sourceCode: SourceCode, filePath: string, fileType?: FileType): {
        issues: Issue[];
        highlightedSymbols: any;
        cognitiveComplexity: number | undefined;
    };
}
export declare function decodeSonarRuntimeIssue(ruleModule: ESLintRule.RuleModule | undefined, issue: Issue): Issue | null;
/**
 * 'sonar-runtime' is the option used by eslint-plugin-sonarjs rules to distinguish
 *  when they are executed in a sonar* context or in eslint
 *
 *  'sonar-context' is the option to distinguish rules which require context as part of their options
 *
 * exported for testing
 */
export declare function getRuleConfig(ruleModule: ESLintRule.RuleModule | undefined, inputRule: Rule): any[];
export declare function getHighlightedSymbols(issues: Issue[]): any;
export declare function getCognitiveComplexity(issues: Issue[]): number | undefined;
