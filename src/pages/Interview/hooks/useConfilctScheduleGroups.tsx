import { compareAsc } from 'date-fns';
import { useCallback, useMemo } from 'react';

import { Schedule } from '@/query/schedule/schema';

type ConflictScheduleGroup = Schedule[];

export const useConfilctScheduleGroups = (schedules: Schedule[]): ConflictScheduleGroup[] => {
  const makeKey = (e: Schedule) => `${e.startTime}-${e.endTime}`;

  const isSubset = useCallback((small: Schedule[], large: Schedule[]) => {
    const keySet = new Set(large.map((e) => makeKey(e)));
    return small.every((e) => keySet.has(makeKey(e)));
  }, []);

  return useMemo(() => {
    const result: ConflictScheduleGroup[] = [];
    const sortedSchedules = schedules.toSorted((a, b) => compareAsc(a.startTime, b.startTime));

    for (let i = 0; i < sortedSchedules.length; i++) {
      const seed = sortedSchedules[i];
      const group = [seed];

      for (let j = i + 1; j < sortedSchedules.length; j++) {
        const target = sortedSchedules[j];
        if (seed.endTime < target.startTime) {
          break;
        }
        group.push(target);
      }

      const hasConflict = group.length > 1;
      const isAlreadyGrouped = result.some((existingGroup) => isSubset(existingGroup, group));

      if (!isAlreadyGrouped && hasConflict) {
        result.push(group);
      }
    }

    return result;
  }, [schedules, isSubset]);
};
