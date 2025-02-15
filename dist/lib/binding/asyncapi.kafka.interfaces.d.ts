import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
export interface KafkaServerBinding {
  schemaRegistryUrl: string;
  schemaRegistryVendor: string;
  bindingVersion: string;
}
export interface KafkaChannelBinding {
  topic: string;
  partitions: number;
  replicas: number;
  bindingVersion: string;
}
export interface KafkaOperationBinding {
  groupId?: SchemaObject;
  clientId?: SchemaObject;
  bindingVersion?: string;
}
export interface KafkaMessageBinding {
  key?: SchemaObject;
  bindingVersion?: string;
}
