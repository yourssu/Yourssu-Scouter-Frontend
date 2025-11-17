import { isNil, omitBy } from 'es-toolkit';
import { SearchParamsOption } from 'ky';

/**
 * @description
 * 객체에서 값이 `null` 또는 `undefined`인 필드를 제거하고, `SearchParamsOption` 타입으로 변환해요.
 *
 * @param params - searchParams로 사용할 객체
 * @returns `null` 또는 `undefined`인 필드가 제거된 `SearchParamsOption` 객체
 */
export const compactSearchParams = (params: Record<string, any>) => {
  return omitBy(params, isNil) as SearchParamsOption;
};
