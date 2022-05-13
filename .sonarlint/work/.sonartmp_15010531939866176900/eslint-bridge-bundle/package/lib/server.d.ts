/// <reference types="node" />
import { Server } from 'http';
import { AnalysisResponse } from './analyzer';
export declare function start(port?: number, host?: string, additionalRuleBundles?: string[]): Promise<Server>;
declare type AnalysisFunction = (input: any) => Promise<AnalysisResponse>;
export declare function startServer(analyzeJS: AnalysisFunction, analyzeTS: AnalysisFunction, analyzeCSS: AnalysisFunction, port?: number, host?: string, additionalRuleBundles?: string[]): Promise<Server>;
export {};
