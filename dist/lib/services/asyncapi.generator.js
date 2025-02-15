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
exports.AsyncapiGenerator = void 0;
const generator_1 = __importDefault(require("@asyncapi/generator"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const os_1 = __importDefault(require("os"));
class AsyncapiGenerator {
    constructor(templateOptions) {
        this.templateOptions = templateOptions;
        this.generator = new generator_1.default('@asyncapi/html-template', os_1.default.tmpdir(), {
            forceWrite: true,
            entrypoint: 'index.html',
            output: 'string',
            templateParams: Object.assign({ singleFile: true }, templateOptions),
        });
    }
    generate(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const yaml = js_yaml_1.default.dump(contract);
            return yield this.generator.generateFromString(yaml, {
                resolve: {
                    file: false,
                },
            });
        });
    }
}
exports.AsyncapiGenerator = AsyncapiGenerator;
//# sourceMappingURL=asyncapi.generator.js.map