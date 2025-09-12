import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { MEMBER_URI } from '@/constants/uri.ts';
import { MemberArraySchema, MemberState } from '@/query/member/schema.ts';

type MemberQueryParams = {
  partId: null | number;
  search: string;
};

export const memberOptions = (state: MemberState, params?: MemberQueryParams) => {
  const baseKey = ['members', state] as const;

  return queryOptions({
    queryKey: params ? [...baseKey, params] : baseKey,
    queryFn: async () => {
      const res = await api.get(`members/${MEMBER_URI[state]}`, {
        searchParams: params && {
          search: params.search,
          ...(params.partId && {
            partId: params.partId,
          }),
        },
      });
      const data = await res.json();
      return MemberArraySchema.parse(data);
    },
  });
};
