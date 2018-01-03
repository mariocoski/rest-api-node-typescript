

export interface Options {
  baseUrl: string;
  paginatedData: any[];
  total: number;
  offset: number;
  limit: number;
}

export default (options: Options) => {
  const { baseUrl, total, limit, offset, paginatedData } = options;
  const pages =  Math.ceil(options.total / limit);
  return {
    _links: {
      first: `${baseUrl}?offset=0&limit=${limit}`,
      last: '',
      prev: '',
      next: '',
      self: `${baseUrl}?offset=${offset}&limit=${limit}`,
      baseUrl
    },
    total,
    count: paginatedData.length,
    perPage: Math.ceil(total/limit),
    pages,
    currentPage: 1,
    firstPage: 1,
    lastPage: 4,
    data: paginatedData
  }
}