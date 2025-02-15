import { INestApplicationContext } from '@nestjs/common';
import { AsyncApiDocument } from '#lib';
export declare function makeAsyncapiDocument(
  app: INestApplicationContext,
): Promise<AsyncApiDocument>;
