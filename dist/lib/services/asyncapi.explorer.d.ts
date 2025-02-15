import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { DenormalizedDoc } from '../interface';
export declare class AsyncApiExplorer {
  private readonly metadataScanner;
  private readonly schemas;
  private readonly schemaRefsStack;
  private operationIdFactory;
  explorerAsyncapiServices(
    wrapper: InstanceWrapper<any>,
    modulePath?: string,
    globalPrefix?: string,
    operationIdFactory?: (controllerKey: string, methodKey: string) => string,
  ): DenormalizedDoc[];
  getSchemas(): Record<string, SchemaObject>;
  private generateDenormalizedDocument;
}
