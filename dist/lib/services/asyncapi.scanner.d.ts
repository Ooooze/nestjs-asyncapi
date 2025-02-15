import { INestApplicationContext } from '@nestjs/common';
import { AsyncApiDocument, AsyncApiDocumentOptions } from '../interface';
export declare class AsyncapiScanner {
  private readonly transformer;
  private readonly explorer;
  private readonly modelPropertiesAccessor;
  private readonly swaggerTypesMapper;
  private readonly schemaObjectFactory;
  scanApplication(
    app: INestApplicationContext,
    options: AsyncApiDocumentOptions,
  ): Omit<AsyncApiDocument, 'asyncapi' | 'info'>;
  private scanModuleComponents;
  private getModules;
  private getGlobalPrefix;
  private addExtraModels;
}
