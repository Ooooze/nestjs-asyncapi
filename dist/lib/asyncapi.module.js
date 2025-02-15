"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncApiModule = void 0;
const common_1 = require("@nestjs/common");
const validate_path_util_1 = require("@nestjs/swagger/dist/utils/validate-path.util");
const js_yaml_1 = __importDefault(require("js-yaml"));
const services_1 = require("./services");
class AsyncApiModule {
    static createDocument(app, config, options = {}) {
        const asyncapiScanner = new services_1.AsyncapiScanner();
        const document = asyncapiScanner.scanApplication(app, options);
        document.components = Object.assign(Object.assign({}, (config.components || {})), document.components);
        return Object.assign(Object.assign({ asyncapi: '2.5.0' }, config), document);
    }
    static composeHtml(contract, templateOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const generator = new services_1.AsyncapiGenerator(templateOptions);
            return yield generator.generate(contract).catch((err) => {
                this.logger.error(err);
                throw err;
            });
        });
    }
    static setup(path, app, document, templateOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const httpAdapter = app.getHttpAdapter();
            const finalPath = (0, validate_path_util_1.validatePath)(path);
            const html = yield this.composeHtml(document, templateOptions);
            const yamlDocument = js_yaml_1.default.dump(document);
            const jsonDocument = JSON.stringify(document);
            httpAdapter.get(finalPath, (req, res) => {
                res.type('text/html');
                res.send(html);
            });
            httpAdapter.get(finalPath + '-json', (req, res) => {
                res.type('application/json');
                res.send(jsonDocument);
            });
            httpAdapter.get(finalPath + '-yaml', (req, res) => {
                res.type('text/yaml');
                res.send(yamlDocument);
            });
        });
    }
}
exports.AsyncApiModule = AsyncApiModule;
AsyncApiModule.logger = new common_1.Logger(AsyncApiModule.name);
//# sourceMappingURL=asyncapi.module.js.map