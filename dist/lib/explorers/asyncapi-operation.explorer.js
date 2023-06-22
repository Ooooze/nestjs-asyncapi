"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exploreAsyncApiOperationMetadata = void 0;
const asyncapi_constants_1 = require("../asyncapi.constants");
const services_1 = require("../services");
const operationObjectFactory = new services_1.OperationObjectFactory();
const exploreAsyncApiOperationMetadata = (schemas, _instance, _prototype, method) => {
    const metadataOperations = Reflect.getMetadata(asyncapi_constants_1.DECORATORS.AsyncApiOperation, method);
    const metadataSubs = Reflect.getMetadata(asyncapi_constants_1.DECORATORS.AsyncApiSub, method);
    const metadataPubs = Reflect.getMetadata(asyncapi_constants_1.DECORATORS.AsyncApiPub, method);
    const metadataCombined = [];
    if (metadataOperations) {
        metadataCombined.push(...Object.values(metadataOperations));
    }
    if (metadataPubs) {
        metadataCombined.push(...Object.values(metadataPubs));
    }
    if (metadataSubs) {
        metadataCombined.push(...Object.values(metadataSubs));
    }
    return metadataCombined.map((option) => {
        const { channel, type } = option;
        const methodTypeData = Object.assign(Object.assign(Object.assign({}, option), operationObjectFactory.create(option, ['application/json'], schemas)), { channel: undefined, type: undefined });
        return {
            channel,
            [type]: methodTypeData,
        };
    });
};
exports.exploreAsyncApiOperationMetadata = exploreAsyncApiOperationMetadata;
//# sourceMappingURL=asyncapi-operation.explorer.js.map