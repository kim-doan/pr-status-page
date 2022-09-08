import { atom, selector } from "recoil";

import PullRequest from "../models/PullRequest";

export const openPrState = atom<PullRequest[]>({
  key: "openPrState",
  default: [],
  dangerouslyAllowMutability: true,
});

export const closedPrState = atom<PullRequest[]>({
  key: "closedPrState",
  default: [],
  dangerouslyAllowMutability: true,
});

export const imminentState = atom<PullRequest[]>({
  key: "imminentState",
  default: [],
  dangerouslyAllowMutability: true,
});

interface monthMapValue {
  all: PullRequest[];
  good: PullRequest[];
  bad: PullRequest[];
}

export const prChartCategoriesState = selector({
  key: "prChartCategoryState",
  get: ({ get }) => {
    const closedPr = get(closedPrState);

    if (closedPr.length > 0) {
      const monthMap = new Map<number, monthMapValue>();

      // eslint-disable-next-line array-callback-return
      [...Array<number>(12).keys()].map((m) => {
        const month = m + 1;

        monthMap.set(month, {
          all: closedPr.filter(
            (pr) => new Date(pr.createdAt).getMonth() === month,
          ),
          good: closedPr.filter(
            (pr) =>
              new Date(pr.createdAt).getMonth() === month &&
              pr.imminentAt &&
              pr.imminentAt <= 2,
          ),
          bad: closedPr.filter(
            (pr) =>
              new Date(pr.createdAt).getMonth() === month &&
              pr.imminentAt &&
              pr.imminentAt > 2,
          ),
        });
      });

      return monthMap;
    }
  },
});
