import { UseQueryOptions } from "@tanstack/react-query";

import { RepositoryApi } from "apiClients/prStatusApi";
import Core from "core/Core";
import useQuery from "lib/hooks/useQuery";

import { QueryKeyT, REPO_QUERY_KEYS } from "../constant/queryKeys";
import Collaborator from "../models/Collaborator";

interface useCollaboratorDataProps {
  owner?: string;
  repo?: string;
  options?: UseQueryOptions<
    Collaborator[] | undefined,
    Error,
    Collaborator[] | undefined,
    QueryKeyT
  >;
}

const useCollaboratorData = ({
  owner,
  repo,
  options,
}: useCollaboratorDataProps) =>
  useQuery<Collaborator[] | undefined>(
    [REPO_QUERY_KEYS.COLLABORATOR_LIST, { owner, repo, options }],
    async () => {
      const core = new Core();
      const { apiConfig } = core;

      if (!owner || !repo) {
        return;
      }

      const response = await new RepositoryApi(apiConfig).searchCollaborators(
        owner,
        repo,
      );

      return response.data.map((item) => new Collaborator(item)) ?? [];
    },
    {
      ...options,
    },
  );

export default useCollaboratorData;
