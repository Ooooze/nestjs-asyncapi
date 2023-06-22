import { Cat, Lion, Message, Tiger } from '../class';
type AllFelines = Cat | Lion | Tiger;
export declare class FelineRto extends Message<AllFelines> {
  payload: Cat | Lion | Tiger;
}
export declare class FelineExtendedRto extends FelineRto {
  extra: string;
}
export {};
