"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncapiScanner = void 0;
const constants_1 = require("@nestjs/common/constants");
const model_properties_accessor_1 = require("@nestjs/swagger/dist/services/model-properties-accessor");
const schema_object_factory_1 = require("@nestjs/swagger/dist/services/schema-object-factory");
const swagger_types_mapper_1 = require("@nestjs/swagger/dist/services/swagger-types-mapper");
const strip_last_slash_util_1 = require("@nestjs/swagger/dist/utils/strip-last-slash.util");
const lodash_1 = require("lodash");
const asyncapi_explorer_1 = require("./asyncapi.explorer");
const asyncapi_transformer_1 = require("./asyncapi.transformer");
class AsyncapiScanner {
    constructor() {
        this.transformer = new asyncapi_transformer_1.AsyncapiTransformer();
        this.explorer = new asyncapi_explorer_1.AsyncApiExplorer();
        this.modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
        this.swaggerTypesMapper = new swagger_types_mapper_1.SwaggerTypesMapper();
        this.schemaObjectFactory = new schema_object_factory_1.SchemaObjectFactory(this.modelPropertiesAccessor, this.swaggerTypesMapper);
    }
    scanApplication(app, options) {
        const { deepScanRoutes, include: includedModules = [], extraModels = [], ignoreGlobalPrefix = false, operationIdFactory, } = options;
        const container = app.container;
        const modules = this.getModules(container.getModules(), includedModules);
        const globalPrefix = !ignoreGlobalPrefix
            ? (0, strip_last_slash_util_1.stripLastSlash)(this.getGlobalPrefix(app))
            : '';
        const denormalizedChannels = modules.reduce((channels, { providers, metatype, imports, controllers }) => {
            let allComponents = new Map([...Array.from(providers), ...Array.from(controllers)]);
            if (deepScanRoutes) {
                const isGlobal = (module) => !container.isGlobalModule(module);
                Array.from(imports.values())
                    .filter(isGlobal)
                    .map(({ providers: relatedComponents, controllers: relatedRoutes }) => ({
                    relatedComponents: Array.from(relatedComponents),
                    relatedRoutes: Array.from(relatedRoutes),
                }))
                    .forEach(({ relatedComponents, relatedRoutes }) => {
                    allComponents = new Map([
                        ...allComponents,
                        ...relatedComponents,
                        ...relatedRoutes,
                    ]);
                });
            }
            const path = metatype
                ? Reflect.getMetadata(constants_1.MODULE_PATH, metatype)
                : undefined;
            return [
                ...channels,
                ...this.scanModuleComponents(allComponents, path, globalPrefix, operationIdFactory),
            ];
        }, []);
        const schemas = this.explorer.getSchemas();
        this.addExtraModels(schemas, extraModels);
        const normalizedChannels = this.transformer.normalizeChannels((0, lodash_1.flatten)(denormalizedChannels));
        return Object.assign(Object.assign({}, normalizedChannels), { components: { schemas } });
    }
    scanModuleComponents(components, modulePath, globalPrefix, operationIdFactory) {
        const denormalizedArray = [...components.values()].reduce((denormalized, comp) => {
            const object = this.explorer.explorerAsyncapiServices(comp, modulePath, globalPrefix, operationIdFactory);
            return [...denormalized, ...object];
        }, []);
        return (0, lodash_1.flatten)(denormalizedArray);
    }
    getModules(modulesContainer, include) {
        if (!include || (0, lodash_1.isEmpty)(include)) {
            return [...modulesContainer.values()];
        }
        return [...modulesContainer.values()].filter(({ metatype }) => include.some((item) => item === metatype));
    }
    getGlobalPrefix(app) {
        const internalConfigRef = app.config;
        return (internalConfigRef === null || internalConfigRef === void 0 ? void 0 : internalConfigRef.getGlobalPrefix()) || '';
    }
    addExtraModels(schemas, extraModels) {
        extraModels.forEach((item) => {
            this.schemaObjectFactory.exploreModelSchema(item, schemas);
        });
    }
}
exports.AsyncapiScanner = AsyncapiScanner;
//# sourceMappingURL=asyncapi.scanner.js.map