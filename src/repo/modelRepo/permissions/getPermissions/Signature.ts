import AsyncHandler from '../../../../utils/AsyncHandler';

interface Filter {

}

interface Options {
    filter: Filter
}

type Signature = AsyncHandler<Options, any[]>;

export default Signature;