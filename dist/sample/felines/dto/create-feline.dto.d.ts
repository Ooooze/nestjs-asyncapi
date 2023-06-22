import { Cat, Lion, Message, Tiger } from '../class';
type AllFelines = Cat | Lion | Tiger;
export declare class CreateFelineDto extends Message<AllFelines> {
  payload: Cat | Lion | Tiger;
}
export {};
