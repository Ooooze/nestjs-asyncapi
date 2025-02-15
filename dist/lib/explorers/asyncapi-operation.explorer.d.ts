import { Type } from '@nestjs/common';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
export declare const exploreAsyncApiOperationMetadata: (
  schemas: Record<string, SchemaObject>,
  _instance: object,
  _prototype: Type<unknown>,
  method: object,
) => {
  [x: string]:
    | string
    | {
        channel: any;
        type: any;
        operationId?: string;
        summary?: string;
        description?: string;
        tags?: import('../interface').AsyncTagObject[];
        externalDocs?: import('../interface').ExternalDocumentationObject;
        bindings?: Record<
          string,
          | import('../binding').AmqpOperationBinding
          | import('../binding').KafkaOperationBinding
        >;
        traits?: Record<
          string,
          import('../interface').AsyncOperationTraitObject
        >;
        message?: import('../interface').AsyncOperationMessage;
      };
  channel: string;
}[];
