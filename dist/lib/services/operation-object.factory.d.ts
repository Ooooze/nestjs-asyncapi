import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  AsyncApiOperationOptionsRaw,
  AsyncOperationObject,
} from '../interface';
export declare class OperationObjectFactory {
  private readonly modelPropertiesAccessor;
  private readonly swaggerTypesMapper;
  private readonly schemaObjectFactory;
  create(
    operation: AsyncApiOperationOptionsRaw,
    produces: string[],
    schemas: Record<string, SchemaObject>,
  ): AsyncOperationObject;
  private getDtoName;
}
