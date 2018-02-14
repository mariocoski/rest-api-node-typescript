import AsyncHandler from '../../../../utils/AsyncHandler';

export interface OrderItem {
  readonly [key: string] : string;  
}

export interface Options {
  readonly limit?: number;
  readonly offset?: number;
  readonly order?: string;
}

type Signature = AsyncHandler<Options, any[]>;

export default Signature;