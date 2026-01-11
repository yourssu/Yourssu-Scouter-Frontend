import { assert } from 'es-toolkit';
import { toPng } from 'html-to-image';
import { useCallback, useRef } from 'react';

import { Prettify } from '@/utils/type';

export type UseComponentToPngOptions = Prettify<Parameters<typeof toPng>[1] & {}>;

export type ComponentToPngConvertFn<T extends HTMLElement> = (
  option: ((el: T) => UseComponentToPngOptions) | UseComponentToPngOptions,
) => Promise<string>;

export const useComponentToPng = <T extends HTMLElement = HTMLElement>(
  globalOptions: UseComponentToPngOptions = {},
) => {
  const ref = useRef<T>();

  const refFn = useCallback((el: T) => {
    ref.current = el;
  }, []);

  const convert = useCallback<ComponentToPngConvertFn<T>>(
    (option) => {
      assert(!!ref.current, 'png로 변환하기 위한 element가 마운트되지 않았어요.');

      const convertOption = typeof option === 'function' ? option(ref.current) : option;

      return toPng(ref.current, { ...globalOptions, ...convertOption });
    },
    [globalOptions],
  );

  return [refFn, convert] as const;
};
