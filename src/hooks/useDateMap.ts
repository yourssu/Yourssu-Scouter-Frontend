import { useCallback, useState } from 'react';
import { usePreservedReference } from 'react-simplikit';

import { DateMap, DateMapOptions, DateMapSetterEntries, DateMapSetterType } from '@/utils/DateMap';

export type UseDateMapAction<T> = {
  remove: (key: Date) => void;
  reset: () => void;
  set: (key: Date, value: DateMapSetterType<T>) => void;
  setAll: (entries: DateMapSetterEntries<T>) => void;
};

type UseDateMapReturn<T> = [DateMap<T>, UseDateMapAction<T>];

/**
 * @description
 * DateMap을 리액트 상태로 관리하게 해주는 커스텀 훅이에요.
 * 효율적인 상태관리와 안정적인 액션 함수들을 제공해요.
 *
 * @template T - DateMap이 저장하는 값의 타입이에요. 함수 타입은 허용되지 않아요.
 * @param {DateMapOptions<T>} [options] - DateMap이 어떻게 동작할지 설정하는 옵션이에요. DateMap의 옵션과 동일해요.
 * @returns {UseDateMapReturn<T>} DateMap의 상태와 이를 다루기 위한 액션이 담긴 튜플이에요.
 *
 * @example
 * ```tsx
 * const [userMap, actions] = useDateMap<string>();
 * const now = new Date();
 *
 * // DateMap을 업데이트해요.
 * actions.set(now, 'hello');
 *
 * // DateMap에서 값을 가져와요.
 * console.log(userMap.get(now)); // 'hello'
 * ```
 */
export const useDateMap = <T>(
  options: DateMapOptions<T> = {
    initialEntries: [],
  },
): UseDateMapReturn<T> => {
  const [map, setMap] = useState(() => new DateMap<T>(options));

  const preservedOptions = usePreservedReference(options);

  const set = useCallback(
    (key: Date, value: DateMapSetterType<T>) => {
      setMap((prev) => {
        const nextMap = new DateMap<T>({
          ...preservedOptions,
          initialEntries: prev.entries(),
        });
        nextMap.set(key, value);
        return nextMap;
      });
    },
    [preservedOptions],
  );

  const setAll = useCallback(
    (entries: DateMapSetterEntries<T>) => {
      setMap((prev) => {
        const nextMap = new DateMap<T>({
          ...preservedOptions,
          initialEntries: prev.entries(),
        });
        nextMap.setAll(entries);
        return nextMap;
      });
    },
    [preservedOptions],
  );

  const remove = useCallback(
    (key: Date) => {
      setMap((prev) => {
        const nextMap = new DateMap<T>({
          ...preservedOptions,
          initialEntries: prev.entries(),
        });
        nextMap.delete(key);
        return nextMap;
      });
    },
    [preservedOptions],
  );

  const reset = useCallback(() => {
    setMap(() => new DateMap<T>(preservedOptions));
  }, [preservedOptions]);

  return [map, { set, setAll, remove, reset }] as const;
};
