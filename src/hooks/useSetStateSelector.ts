import { get, set } from 'es-toolkit/compat';
import { produce } from 'immer';
import { type Dispatch, type SetStateAction, useCallback } from 'react';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
    ? 'length' extends keyof T
      ? number extends T['length']
        ? number extends keyof T
          ? T[number]
          : undefined
        : undefined
      : undefined
    : undefined;

type FieldWithPossiblyUndefined<T, Key> =
  | Extract<T, undefined>
  | GetFieldType<Exclude<T, undefined>, Key>;

type IndexedFieldWithPossiblyUndefined<T, Key> =
  | Extract<T, undefined>
  | GetIndexedField<Exclude<T, undefined>, Key>;

type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof Exclude<T, undefined>
    ? Extract<T, undefined> | FieldWithPossiblyUndefined<Exclude<T, undefined>[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? FieldWithPossiblyUndefined<
            IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>,
            Right
          >
        : undefined
      : undefined
  : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>
        : undefined
      : IndexedFieldWithPossiblyUndefined<T, P>;

type GetFieldTypeStrictly<T, P> =
  GetFieldType<T, P> extends undefined ? never : Prettify<GetFieldType<T, P>>;

const getIn = <TObject, TPath extends string = string>(
  object: TObject,
  path: TPath,
): GetFieldTypeStrictly<TObject, TPath> => {
  return get(object, path as string);
};

export const useSetStateSelector = <
  TObject extends object,
  TPath extends string = string,
  TValue = GetFieldTypeStrictly<TObject, TPath>,
>(
  setValue: Dispatch<SetStateAction<TObject>>,
  path: TPath,
) => {
  const result: Dispatch<SetStateAction<TValue>> = useCallback(
    (update) => {
      setValue((prevValue) =>
        produce(prevValue, (draft) => {
          set(
            draft,
            path,
            typeof update === 'function'
              ? (update as (prvValue: TValue) => TValue)(getIn(draft, path) as TValue)
              : update,
          );
        }),
      );
    },
    [path, setValue],
  );
  return result;
};
