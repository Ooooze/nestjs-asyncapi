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
var FelinesGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FelinesGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const socket_io_client_1 = require("socket.io-client");
const felines_service_1 = require(".//felines.service");
const dto_1 = require("./dto");
const rto_1 = require("./rto");
const _lib_1 = require("#lib");
const EventPatternsWS = {
    createFeline: 'ws/create/feline',
};
let FelinesGateway = exports.FelinesGateway = FelinesGateway_1 = class FelinesGateway {
    constructor(felinesService) {
        this.felinesService = felinesService;
        this.logger = new common_1.Logger(FelinesGateway_1.name);
    }
    afterInit(nsp) {
        this.logger.log(`Gateway server init: ${nsp === null || nsp === void 0 ? void 0 : nsp.name}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    createFeline(client, createFelineDto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`data from client ${client.id} : ${JSON.stringify(createFelineDto)}`);
            const feline = yield this.felinesService.create(createFelineDto);
            yield this.emitCreatedFeline(new rto_1.FelineRto(feline));
        });
    }
    emitCreatedFeline(felineRto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.emit(EventPatternsWS.createFeline, felineRto);
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], FelinesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(EventPatternsWS.createFeline),
    (0, _lib_1.AsyncApiPub)({
        channel: EventPatternsWS.createFeline,
        message: {
            payload: dto_1.CreateFelineDto,
        },
    }),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_client_1.Socket,
        dto_1.CreateFelineDto]),
    __metadata("design:returntype", Promise)
], FelinesGateway.prototype, "createFeline", null);
__decorate([
    (0, _lib_1.AsyncApiSub)({
        channel: EventPatternsWS.createFeline,
        message: [
            {
                name: 'oneOf demo #1',
                payload: rto_1.FelineRto,
            },
            {
                name: 'oneOf demo #2',
                payload: rto_1.FelineExtendedRto,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rto_1.FelineRto]),
    __metadata("design:returntype", Promise)
], FelinesGateway.prototype, "emitCreatedFeline", null);
exports.FelinesGateway = FelinesGateway = FelinesGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ transports: ['websocket'], namespace: 'ws' }),
    __metadata("design:paramtypes", [felines_service_1.FelinesService])
], FelinesGateway);
//# sourceMappingURL=felines.gateway.js.map