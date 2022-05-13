import ts from 'typescript';
export declare function getProgramById(programId: string): ts.Program;
export declare function deleteProgram(programId: string): void;
export declare function createProgram(inputTsConfig: string): {
    programId: string;
    files: string[];
    projectReferences: string[];
};
