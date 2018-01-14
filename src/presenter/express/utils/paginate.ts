export interface Options {
  baseUrl: string;
  paginatedData: any[];
  total: number;
  offset: number;
  limit: number;
}

const getPages = (total:number = 0, limit:number = 1) => {
  return total <= 1 ? 1 : Math.ceil(total/limit);
}

const getCurrentPage = (offset:number, limit:number): number => {
  return Math.ceil(offset/limit) + 1;
}

export interface GetLinksOptions {
  baseUrl: string;
  offset: number;
  limit: number;
  numberOfPages: number;
  currentPage: number;
}

const getLinks = ({baseUrl, offset, limit, currentPage, numberOfPages}: GetLinksOptions):any => {
  const lastPageOffset = (numberOfPages - 1) * limit;
  const nextPageOffset = (currentPage) * limit;
  const prevPageOffset = (currentPage - 2) * limit;
  return {
    first: `${baseUrl}?offset=0&limit=${limit}`,
    last: numberOfPages > 1 ? `${baseUrl}?offset=${lastPageOffset}&limit=${limit}` : null,
    prev: (currentPage - 1) > 0  ? `${baseUrl}?offset=${prevPageOffset}&limit=${limit}` : null,
    next: (currentPage + 1) <= numberOfPages ?`${baseUrl}?offset=${nextPageOffset}&limit=${limit}` : null,
    self: `${baseUrl}?offset=${offset}&limit=${limit}`,
    baseUrl
  }
}

export default (options: Options) => {
  const { baseUrl, total, limit, offset, paginatedData } = options;

  const numberOfPages: number = getPages(total, limit);
  const perPage: number = limit;
  const count: number = paginatedData.length;
  const currentPage: number = getCurrentPage(offset, limit);

  return {
    _links: getLinks({baseUrl, offset, limit, numberOfPages, currentPage}),
    total,
    count,
    numberOfPages,
    perPage: limit,
    firstPage: 1,
    currentPage,
    lastPage: numberOfPages,
    data: paginatedData
  }
}

