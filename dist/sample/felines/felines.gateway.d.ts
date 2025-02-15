import { OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { Socket } from 'socket.io-client';
import { FelinesService } from './/felines.service';
import { CreateFelineDto } from './dto';
import { FelineRto } from './rto';
export declare class FelinesGateway
  implements OnGatewayInit, OnGatewayDisconnect
{
  private readonly felinesService;
  private readonly server;
  private readonly logger;
  constructor(felinesService: FelinesService);
  afterInit(nsp: Namespace): void;
  handleDisconnect(client: Socket): void;
  createFeline(client: Socket, createFelineDto: CreateFelineDto): Promise<void>;
  emitCreatedFeline(felineRto: FelineRto): Promise<void>;
}
