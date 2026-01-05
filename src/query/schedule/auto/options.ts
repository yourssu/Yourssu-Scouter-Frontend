import { queryOptions } from '@tanstack/react-query';
import z from 'zod';

import { api } from '@/apis/api.ts';
import { AutoScheduleArraySchema } from '@/query/schedule/schema';

interface Option {
  duration: 30 | 60; // 면접 시간을 분 단위로 넣어줘요.
  partId: number;
  size: number; // 시간표 후보군을 몇 개 던져줄지 정해요.
  strategy: 'MAX' | 'MIN'; // 일정의 분산 정도를 정해요. MAX로 지정하면 최대한 분산되게, MIN이면 최대한 몰려있게 생성해요.
}

export const autoScheduleOptions = ({ partId, ...option }: Option) => {
  return queryOptions({
    queryKey: ['schedules', 'auto', partId],
    queryFn: async () => {
      const data = await api
        .get(`recruiter/schedule/auto/${partId}`, {
          searchParams: option,
        })
        .json();
      /* 
        시간표 자동생성 API는 여러개의 후보군을 던져줘요.
        각 후보군에 대한 스키마가 `AutoScheduleArraySchema` 라서,
        z.array(AutoScheduleArraySchema)로 응답 밸리데이션을 수행해요. 
      */
      return z.array(AutoScheduleArraySchema).parse(data);
    },
  });
};
