declare enum PawsEnum {
  left = 'left',
  right = 'right',
}
declare enum GendersEnum {
  male = 'male',
  female = 'female',
}
export declare abstract class Feline {
  id: number;
  name: string;
  age: number;
  gender: GendersEnum;
  dominantPaw: PawsEnum;
  tags: string[];
  birthDatetime: Date;
  constructor(initializer: Record<string, any>);
}
export {};
