export declare abstract class Message<T extends Record<string, any>> {
  correlationId: string;
  version: string;
  timestamp: Date;
  abstract payload: T;
  constructor(partialData: Record<string, any>);
}
