import { INestApplication, INestApplicationContext } from '@nestjs/common';
import {
  AsyncApiDocument,
  AsyncApiDocumentOptions,
  AsyncApiTemplateOptions,
} from './interface';
export declare class AsyncApiModule {
  private static readonly logger;
  static createDocument(
    app: INestApplicationContext,
    config: Omit<AsyncApiDocument, 'channels'>,
    options?: AsyncApiDocumentOptions,
  ): AsyncApiDocument;
  static composeHtml(
    contract: AsyncApiDocument,
    templateOptions?: AsyncApiTemplateOptions,
  ): Promise<string>;
  static setup(
    path: string,
    app: INestApplication,
    document: AsyncApiDocument,
    templateOptions?: AsyncApiTemplateOptions,
  ): Promise<void>;
}
