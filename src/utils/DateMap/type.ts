export type DateMapValueType<T> = T extends CallableFunction ? never : T;
export type DateMapSetterType<T> = T extends CallableFunction
  ? never
  : ((prev: T | undefined) => T) | T;

export type DateMapValueEntries<T> = [Date, DateMapValueType<T>][];
export type DateMapSetterEntries<T> = [Date, DateMapSetterType<T>][];

export const orderedPrecisions = ['밀리초', '초', '분', '시간', '날', '월', '년'] as const;
export type DateMapPrecisionType = (typeof orderedPrecisions)[number];

export type DateMapPrecisionRange = {
  largestUnit: DateMapPrecisionType;
  smallestUnit: DateMapPrecisionType;
};

export type DateMapOptions<T> = {
  initialEntries?: DateMapSetterEntries<T>;
  precision?: DateMapPrecisionRange | DateMapPrecisionType;
};
