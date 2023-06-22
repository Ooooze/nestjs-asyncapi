import { AsyncApiTemplateOptions } from '../interface';
export declare class AsyncapiGenerator {
  readonly templateOptions?: AsyncApiTemplateOptions;
  private readonly generator;
  constructor(templateOptions?: AsyncApiTemplateOptions);
  generate(contract: any): Promise<string>;
}
