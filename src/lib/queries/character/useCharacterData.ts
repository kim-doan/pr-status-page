import { UseQueryOptions } from "@tanstack/react-query";

import { CharacterResult, DefaultApi } from "apiClients/characterSampleApi";
import { QueryKeyT, QUERY_KEYS } from "lib/constant/queryKeys";
import useQuery from "lib/hooks/useQuery";

interface useCharacterDataProps {
  page: number;
  options?: UseQueryOptions<CharacterResult, Error, CharacterResult, QueryKeyT>;
}

const useCharacterData = ({ page, options }: useCharacterDataProps) =>
  useQuery<CharacterResult>(
    [QUERY_KEYS.CHARACTER_LIST, { page }],
    async () => {
      const response = await new DefaultApi().searchCharacter(page);
      return response.data;
    },
    {
      ...options,
    },
  );

export default useCharacterData;
