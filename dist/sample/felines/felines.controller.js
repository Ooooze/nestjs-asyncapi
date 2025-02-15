"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var FelinesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FelinesController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const dto_1 = require("./dto");
const _lib_1 = require("#lib");
const class_1 = require("#sample/felines/class");
const journaling_data_dto_1 = require("#sample/felines/dto/journaling-data.dto");
const felines_constants_1 = require("#sample/felines/felines.constants");
const felines_service_1 = require("#sample/felines/felines.service");
const rto_1 = require("#sample/felines/rto");
const EventPatternsMS = {
    createFeline: 'ms/create/feline',
    journal: 'ms/journal',
};
let FelinesController = exports.FelinesController = FelinesController_1 = class FelinesController {
    constructor(client, felinesService) {
        this.client = client;
        this.felinesService = felinesService;
        this.logger = new common_1.Logger(FelinesController_1.name);
    }
    journal(dataForJournaling) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataForJournalingString = JSON.stringify(dataForJournaling, null, 4);
            this.logger.log(`journaling:\n${dataForJournalingString}`);
        });
    }
    createFeline(createFelineDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const feline = yield this.felinesService.create(createFelineDto);
            this.logger.debug(`feline created:\n${JSON.stringify(feline)}`);
            this.publishCreatedFeline(feline);
        });
    }
    publishCreatedFeline(feline) {
        const felineRto = new rto_1.FelineRto(feline);
        return this.client.emit(EventPatternsMS.journal, felineRto);
    }
    do() {
        return __awaiter(this, void 0, void 0, function* () {
            const cat = new class_1.Cat({
                id: 123,
                name: 'demo',
            });
            yield this.createFeline(new rto_1.FelineRto({ payload: cat }));
        });
    }
};
__decorate([
    (0, _lib_1.AsyncApiSub)({
        channel: EventPatternsMS.journal,
        message: {
            payload: journaling_data_dto_1.JournalingDataDto,
        },
    }),
    (0, microservices_1.EventPattern)(EventPatternsMS.journal),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [journaling_data_dto_1.JournalingDataDto]),
    __metadata("design:returntype", Promise)
], FelinesController.prototype, "journal", null);
__decorate([
    (0, _lib_1.AsyncApiPub)({
        channel: EventPatternsMS.createFeline,
        message: {
            payload: dto_1.CreateFelineDto,
        },
    }),
    (0, _lib_1.AsyncApiSub)({
        channel: EventPatternsMS.createFeline,
        message: {
            payload: rto_1.FelineRto,
        },
    }),
    (0, microservices_1.EventPattern)(EventPatternsMS.createFeline),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateFelineDto]),
    __metadata("design:returntype", Promise)
], FelinesController.prototype, "createFeline", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FelinesController.prototype, "do", null);
exports.FelinesController = FelinesController = FelinesController_1 = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(felines_constants_1.FELINES_MS)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        felines_service_1.FelinesService])
], FelinesController);
//# sourceMappingURL=felines.controller.js.map