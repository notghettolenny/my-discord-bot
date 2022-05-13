"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.start = void 0;
const express_1 = __importDefault(require("express"));
const analyzer_1 = require("./analyzer");
const parser_1 = require("./parser");
const tsconfig_1 = require("./tsconfig");
const programManager_1 = require("./programManager");
const MAX_REQUEST_SIZE = '50mb';
function start(port = 0, host = '127.0.0.1', additionalRuleBundles = []) {
    return startServer(analyzer_1.analyzeJavaScript, analyzer_1.analyzeTypeScript, analyzer_1.analyzeCss, port, host, additionalRuleBundles);
}
exports.start = start;
// exported for test
function startServer(analyzeJS, analyzeTS, analyzeCSS, port = 0, host = '127.0.0.1', additionalRuleBundles = []) {
    loadAdditionalRuleBundles(additionalRuleBundles);
    return new Promise(resolve => {
        console.log('DEBUG starting eslint-bridge server at port', port);
        let server;
        const app = (0, express_1.default)();
        // for parsing application/json requests
        app.use(express_1.default.json({ limit: MAX_REQUEST_SIZE }));
        app.post('/init-linter', (req, res) => {
            (0, analyzer_1.initLinter)(req.body.rules, req.body.environments, req.body.globals);
            res.send('OK!');
        });
        app.post('/analyze-js', analyze(analyzeJS));
        app.post('/analyze-ts', analyze(analyzeTS));
        app.post('/analyze-css', analyze(analyzeCSS));
        app.post('/create-program', (req, res) => {
            try {
                const { tsConfig } = req.body;
                res.json((0, programManager_1.createProgram)(tsConfig));
            }
            catch (e) {
                console.error(e.stack);
                res.json({ error: e.message });
            }
        });
        app.post('/analyze-with-program', analyze(analyzeTS));
        app.post('/delete-program', (req, res) => {
            const { programId } = req.body;
            (0, programManager_1.deleteProgram)(programId);
            res.send('OK!');
        });
        app.post('/new-tsconfig', (_request, response) => {
            (0, parser_1.unloadTypeScriptEslint)();
            response.send('OK!');
        });
        app.post('/tsconfig-files', (request, response) => {
            try {
                const tsconfig = request.body.tsconfig;
                response.json((0, tsconfig_1.getFilesForTsConfig)(tsconfig));
            }
            catch (e) {
                console.error(e.stack);
                response.json({ error: e.message });
            }
        });
        app.get('/status', (_, resp) => resp.send('OK!'));
        app.post('/close', (_req, resp) => {
            console.log('DEBUG eslint-bridge server will shutdown');
            resp.end(() => {
                server.close();
            });
        });
        server = app.listen(port, host, () => {
            console.log('DEBUG eslint-bridge server is running at port', server.address().port);
            resolve(server);
        });
    });
}
exports.startServer = startServer;
function analyze(analysisFunction) {
    return async (request, response) => {
        try {
            const analysisResult = await analysisFunction(request.body);
            response.json(analysisResult);
        }
        catch (e) {
            console.error(e.stack);
            response.json({
                ...analyzer_1.EMPTY_RESPONSE,
                parsingError: {
                    message: e.message,
                    code: parser_1.ParseExceptionCode.GeneralError,
                },
            });
        }
    };
}
function loadAdditionalRuleBundles(additionalRuleBundles) {
    for (const bundle of additionalRuleBundles) {
        const ruleIds = (0, analyzer_1.loadCustomRuleBundle)(bundle);
        console.log(`DEBUG Loaded rules ${ruleIds} from ${bundle}`);
    }
}
//# sourceMappingURL=server.js.map