declare module 'process';

type ExcludeKey<K, ExcludedKey extends string> = K extends ExcludedKey ? never : K;

type Pagination = {
  total: number,
  limit: number,
  offset: number,
}

type PaginationResponse<N extends string, T> = {
  [key in ExcludeKey<N, 'pagination'>]: Array<T>;  
} & {
  pagination: Pagination
}

type PaginationResponseType<T> = T & {
  pagination: {
    total: number,
    limit: number,
    offset: number,
  }
}