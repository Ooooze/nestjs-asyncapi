"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FelinesModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const felines_constants_1 = require("./felines.constants");
const felines_controller_1 = require("./felines.controller");
const felines_gateway_1 = require("./felines.gateway");
const felines_service_1 = require("./felines.service");
let FelinesModule = exports.FelinesModule = class FelinesModule {
};
exports.FelinesModule = FelinesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([{ name: felines_constants_1.FELINES_MS, transport: microservices_1.Transport.TCP }]),
        ],
        providers: [felines_service_1.FelinesService, felines_gateway_1.FelinesGateway],
        controllers: [felines_controller_1.FelinesController],
    })
], FelinesModule);
//# sourceMappingURL=felines.module.js.map