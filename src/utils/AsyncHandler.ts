type AsyncHandler<Options, Response> = (opts: Options) => Promise<Response>;

export default AsyncHandler;