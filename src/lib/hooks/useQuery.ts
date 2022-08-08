import {
  QueryFunction,
  useQuery as useQueryOrigin,
  UseQueryOptions,
} from "@tanstack/react-query";

import { QueryKeyT } from "lib/constant/queryKeys";

const useQuery = <T>(
  queryKey: QueryKeyT,
  queryFn: QueryFunction<T, QueryKeyT>,
  options: UseQueryOptions<T, Error, T, QueryKeyT>,
) => {
  const { onError } = options;

  return useQueryOrigin<T, Error, T, QueryKeyT>(queryKey, queryFn, {
    ...options,
    useErrorBoundary: !onError,
  });
};

export default useQuery;
