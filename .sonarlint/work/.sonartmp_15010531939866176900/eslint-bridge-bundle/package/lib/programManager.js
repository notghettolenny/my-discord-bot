"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgram = exports.deleteProgram = exports.getProgramById = void 0;
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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const typescript_1 = __importDefault(require("typescript"));
const programs = new Map();
let programCount = 0;
const parseConfigHost = {
    useCaseSensitiveFileNames: true,
    readDirectory: typescript_1.default.sys.readDirectory,
    fileExists: typescript_1.default.sys.fileExists,
    readFile: typescript_1.default.sys.readFile,
};
function getProgramById(programId) {
    const program = programs.get(programId);
    if (!program) {
        throw Error(`Failed to find program ${programId}`);
    }
    return program;
}
exports.getProgramById = getProgramById;
function deleteProgram(programId) {
    programs.delete(programId);
}
exports.deleteProgram = deleteProgram;
function createProgram(inputTsConfig) {
    let tsConfig = inputTsConfig;
    if (fs_1.default.lstatSync(tsConfig).isDirectory()) {
        tsConfig = path_1.default.join(tsConfig, 'tsconfig.json');
    }
    console.log(`DEBUG creating program from ${tsConfig}`);
    const config = typescript_1.default.readConfigFile(tsConfig, parseConfigHost.readFile);
    if (config.error) {
        console.error(`Failed to parse tsconfig: ${tsConfig} (${diagnosticToString(config.error)})`);
        throw Error(diagnosticToString(config.error));
    }
    const parsedConfigFile = typescript_1.default.parseJsonConfigFileContent(config.config, parseConfigHost, path_1.default.resolve(path_1.default.dirname(tsConfig)), {
        noEmit: true,
    }, tsConfig);
    if (parsedConfigFile.errors.length > 0) {
        const message = parsedConfigFile.errors.map(diagnosticToString).join('; ');
        throw Error(message);
    }
    const programOptions = {
        rootNames: parsedConfigFile.fileNames,
        options: { ...parsedConfigFile.options, allowNonTsExtensions: true },
        projectReferences: parsedConfigFile.projectReferences,
    };
    const program = typescript_1.default.createProgram(programOptions);
    const maybeProjectReferences = program.getProjectReferences();
    const projectReferences = maybeProjectReferences ? maybeProjectReferences.map(p => p.path) : [];
    const files = program.getSourceFiles().map(sourceFile => sourceFile.fileName);
    const programId = nextId();
    programs.set(programId, program);
    console.log(`DEBUG program from ${tsConfig} with id ${programId} is created`);
    return { programId, files, projectReferences };
}
exports.createProgram = createProgram;
function nextId() {
    programCount++;
    return programCount.toString();
}
function diagnosticToString(diagnostic) {
    var _a;
    const text = typeof diagnostic.messageText === 'string'
        ? diagnostic.messageText
        : diagnostic.messageText.messageText;
    if (diagnostic.file) {
        return `${text}  ${(_a = diagnostic.file) === null || _a === void 0 ? void 0 : _a.fileName}:${diagnostic.start}`;
    }
    else {
        return text;
    }
}
//# sourceMappingURL=programManager.js.map