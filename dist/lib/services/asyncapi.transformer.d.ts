import { AsyncChannelsObject, DenormalizedDoc } from '../interface';
export declare class AsyncapiTransformer {
  normalizeChannels(
    denormalizedDocs: DenormalizedDoc[],
  ): Record<'channels', AsyncChannelsObject>;
}
