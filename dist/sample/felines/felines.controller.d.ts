import { ClientProxy } from '@nestjs/microservices';
import { CreateFelineDto } from './dto';
import { Feline } from '#sample/felines/class';
import { JournalingDataDto } from '#sample/felines/dto/journaling-data.dto';
import { FelinesService } from '#sample/felines/felines.service';
export declare class FelinesController {
  private readonly client;
  private readonly felinesService;
  private logger;
  constructor(client: ClientProxy, felinesService: FelinesService);
  journal(dataForJournaling: JournalingDataDto): Promise<void>;
  createFeline(createFelineDto: CreateFelineDto): Promise<void>;
  publishCreatedFeline(feline: Feline): import('rxjs').Observable<any>;
  do(): Promise<void>;
}
