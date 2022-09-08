import { UseQueryOptions } from "@tanstack/react-query";

import { RepositoryApi } from "apiClients/prStatusApi";
import Core from "core/Core";
import { QueryKeyT } from "lib/constant/QueryKeyT";
import useQuery from "lib/hooks/useQuery";

import { REPO_QUERY_KEYS } from "../constant/queryKeys";
import Repository from "../models/Repository";

interface useRepositoryDataProps {
  perPage?: number;
  q?: string;
  sort?: string;
  order?: string;
  options?: UseQueryOptions<Repository[], Error, Repository[], QueryKeyT>;
}

const useRepositoryData = ({
  perPage = 100,
  q = "meshkorea in:name fe in:topics",
  sort = "updated",
  order = "desc",
  options,
}: useRepositoryDataProps) =>
  useQuery<Repository[]>(
    [REPO_QUERY_KEYS.REPO_LIST, { perPage, q, sort, order, options }],
    async () => {
      const core = new Core();
      const { apiConfig } = core;

      const response = await new RepositoryApi(apiConfig).searchRepositories(
        perPage,
        q,
        sort,
        order,
      );
      return response.data.items?.map((item) => new Repository(item)) ?? [];
    },
    {
      ...options,
    },
  );

export default useRepositoryData;
