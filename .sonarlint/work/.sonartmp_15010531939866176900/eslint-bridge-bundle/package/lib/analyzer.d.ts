import { ParseExceptionCode } from './parser';
import { Highlight } from './runner/highlighter';
import { Metrics } from './runner/metrics';
import { CpdToken } from './runner/cpd';
import { HighlightedSymbol } from './runner/symbol-highlighter';
import { QuickFix } from './quickfix';
export declare const EMPTY_RESPONSE: AnalysisResponse;
export interface AnalysisInput {
    filePath: string;
    fileContent: string | undefined;
}
export interface CssAnalysisInput extends AnalysisInput {
    stylelintConfig: string;
}
export interface TsConfigBasedAnalysisInput extends AnalysisInput {
    fileType: FileType;
    ignoreHeaderComments?: boolean;
    tsConfigs: string[];
}
export interface ProgramBasedAnalysisInput extends AnalysisInput {
    programId: string;
    fileType: FileType;
    ignoreHeaderComments?: boolean;
}
export declare type JsTsAnalysisInput = TsConfigBasedAnalysisInput | ProgramBasedAnalysisInput;
export interface Rule {
    key: string;
    configurations: any[];
    fileTypeTarget: FileType[];
}
export declare type FileType = 'MAIN' | 'TEST';
export interface AnalysisResponse {
    parsingError?: ParsingError;
    issues: Issue[];
    highlights?: Highlight[];
    highlightedSymbols?: HighlightedSymbol[];
    metrics?: Metrics;
    cpdTokens?: CpdToken[];
    perf?: Perf;
}
export interface ParsingError {
    line?: number;
    message: string;
    code: ParseExceptionCode;
}
export interface Issue {
    column: number;
    line: number;
    endColumn?: number;
    endLine?: number;
    ruleId: string;
    message: string;
    cost?: number;
    secondaryLocations: IssueLocation[];
    quickFixes?: QuickFix[];
}
export interface IssueLocation {
    column: number;
    line: number;
    endColumn: number;
    endLine: number;
    message?: string;
}
export interface Perf {
    parseTime: number;
    analysisTime: number;
}
export declare function analyzeJavaScript(input: TsConfigBasedAnalysisInput): Promise<AnalysisResponse>;
export declare function analyzeTypeScript(input: TsConfigBasedAnalysisInput): Promise<AnalysisResponse>;
export declare function analyzeCss(input: CssAnalysisInput): Promise<AnalysisResponse>;
export declare function initLinter(rules: Rule[], environments?: string[], globals?: string[]): void;
export declare function loadCustomRuleBundle(bundlePath: string): string[];
