import { UseQueryOptions } from "@tanstack/react-query";

import { IssueApi } from "apiClients/prStatusApi";
import Core from "core/Core";
import { QueryKeyT } from "lib/constant/QueryKeyT";
import useQuery from "lib/hooks/useQuery";

import { PR_QUERY_KEYS } from "../constant/queryKeys";
import PullRequest from "../models/PullRequest";

interface usePullRequestDataProps {
  perPage?: number;
  state?: "open" | "closed";
  repoName?: string;
  options?: UseQueryOptions<
    PullRequestResponse | undefined,
    Error,
    PullRequestResponse | undefined,
    QueryKeyT
  >;
}

const usePullRequestData = ({
  perPage = 100,
  state = "open",
  repoName,
  options,
}: usePullRequestDataProps) =>
  useQuery<PullRequestResponse | undefined>(
    [PR_QUERY_KEYS.PR_LIST, { perPage, state, repoName, options }],
    async () => {
      const core = new Core();
      const { apiConfig } = core;

      if (!repoName) {
        return;
      }

      const openResParam = `is:pr state:open repo:meshkorea/${repoName}`;
      const openStateRes = await new IssueApi(apiConfig).searchPrIssues(
        perPage,
        openResParam,
      );

      const closedResParam = `is:pr state:closed repo:meshkorea/${repoName}`;
      const closedStateRes = await new IssueApi(apiConfig).searchPrIssues(
        10,
        closedResParam,
      );

      const imminentList =
        openStateRes.data?.items?.filter((item) => {
          const btMs =
            new Date(item.created_at!).getTime() - new Date().getTime();
          const btDays = Math.abs(btMs / (1000 * 60 * 60 * 24));

          return btDays > 1.5;
        }) ?? [];

      return {
        openCount: openStateRes.data.total_count,
        closedCount: closedStateRes.data.total_count,
        imminentCount: imminentList.length,
        openItems:
          openStateRes.data.items?.map((item) => new PullRequest(item)) ?? [],
        closedItems:
          closedStateRes.data.items?.map((item) => new PullRequest(item)) ?? [],
        imminentItems: imminentList?.map((item) => new PullRequest(item)) ?? [],
      } as PullRequestResponse;
    },
    {
      ...options,
    },
  );

export type PullRequestResponse = {
  openCount: number;
  closedCount: number;
  imminentCount: number;
  openItems?: PullRequest[];
  closedItems?: PullRequest[];
  imminentItems?: PullRequest[];
};

export default usePullRequestData;
