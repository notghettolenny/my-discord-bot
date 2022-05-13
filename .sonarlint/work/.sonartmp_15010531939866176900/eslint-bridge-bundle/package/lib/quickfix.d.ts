import { Linter, SourceCode } from 'eslint';
import { IssueLocation } from './analyzer';
export interface QuickFix {
    message: string;
    edits: QuickFixEdit[];
}
interface QuickFixEdit {
    loc: IssueLocation;
    text: string;
}
export declare function getQuickFixes(source: SourceCode, eslintIssue: Linter.LintMessage): QuickFix[];
export declare function getMessageForQuickFix(ruleKey: string): string;
export {};
