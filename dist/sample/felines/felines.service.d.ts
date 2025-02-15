import { Feline } from './class';
import { CreateFelineDto } from './dto';
export declare class FelinesService {
  private readonly felines;
  get(id: number): Promise<Feline>;
  delete(id: number): Promise<boolean>;
  create(createFelineDto: CreateFelineDto): Promise<Feline>;
}
