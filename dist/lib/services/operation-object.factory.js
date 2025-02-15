"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationObjectFactory = void 0;
const model_properties_accessor_1 = require("@nestjs/swagger/dist/services/model-properties-accessor");
const schema_object_factory_1 = require("@nestjs/swagger/dist/services/schema-object-factory");
const swagger_types_mapper_1 = require("@nestjs/swagger/dist/services/swagger-types-mapper");
const utils_1 = require("@nestjs/swagger/dist/utils");
class OperationObjectFactory {
    constructor() {
        this.modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
        this.swaggerTypesMapper = new swagger_types_mapper_1.SwaggerTypesMapper();
        this.schemaObjectFactory = new schema_object_factory_1.SchemaObjectFactory(this.modelPropertiesAccessor, this.swaggerTypesMapper);
    }
    create(operation, produces, schemas) {
        const { message } = operation;
        if (!message) {
            console.log(operation);
        }
        const { oneOf } = message;
        if (oneOf) {
            return Object.assign(Object.assign({}, operation), { message: {
                    oneOf: oneOf.map((i) => (Object.assign(Object.assign({}, i), { payload: {
                            $ref: (0, utils_1.getSchemaPath)(this.getDtoName(i, schemas)),
                        } }))),
                } });
        }
        return Object.assign(Object.assign({}, operation), { message: Object.assign(Object.assign({}, operation.message), { payload: {
                    $ref: (0, utils_1.getSchemaPath)(this.getDtoName(message, schemas)),
                } }) });
    }
    getDtoName(message, schemas) {
        const messagePayloadType = message.payload.type;
        return this.schemaObjectFactory.exploreModelSchema(messagePayloadType, schemas);
    }
}
exports.OperationObjectFactory = OperationObjectFactory;
//# sourceMappingURL=operation-object.factory.js.map