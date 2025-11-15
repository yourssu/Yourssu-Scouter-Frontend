import {
  DateMapOptions,
  DateMapPrecisionRange,
  DateMapSetterEntries,
  DateMapSetterType,
  DateMapValueEntries,
  DateMapValueType,
  orderedPrecisions,
} from './type';

/**
 * @description
 * DateMap은 Date 객체를 키로 사용하는 특수한 Map 자료구조예요.
 * 동일한 날짜를 key로 하여, 값을 저장하거나 조회할 수 있도록 도와줘요.
 * key가 UTC로 정규화되기 때문에, 타임존의 영향을 받지 않고 동일한 시점을 기준으로 동작해요.
 * 또한 날짜 비교의 정밀도를 설정할 수 있어, 특정 단위(예: '날', '월', '년' 등)까지의 정밀도로 날짜를 비교하고 그룹화할 수 있어요.
 *
 * @template T - DateMap이 저장하는 값의 타입이에요. 함수 타입은 허용되지 않아요.
 *
 * @param {DateMapOptions<T>} [options] - DateMap이 어떻게 동작할지 설정하는 옵션이에요.
 * @param {DateMapValueEntries<T>} [options.initialEntries] - DateMap 생성시 추가할 초기 엔트리들의 배열이에요.
 * @param {DateMapPrecisionRange | DateMapPrecisionType} [options.precision] - 날짜를 비교할 때 사용할 정밀도 범위를 지정해요.
 * - 지정하지 않으면, 날짜 전체로 비교해요.
 * - 단일 값으로 지정하면, 해당 정밀도 미만의 값이 모두 무시돼요.
 * - 객체 형태 `{ smallestUnit, largestUnit }`로 지정하면, `smallestUnit` ~ `largestUnit` 사이의 정밀도만 비교에 사용돼요.
 *
 * @example
 * ```ts
 * const dayMap = new DateMap<string>({
 *   initialEntries: [
 *     [new Date("2025-11-13T08:00:00Z"), "아침 데이터"],
 *     [new Date("2025-11-13T22:00:00Z"), "밤 데이터"],
 *   ],
 *   precision: "날"
 * });
 *
 * console.log(dayMap.size); // 1
 * console.log(dayMap.get(new Date("2025-11-13T12:00:00Z"))); // "밤 데이터"
 * ```
 *
 * @example
 * ```ts
 * const rangeMap = new DateMap<number>({
 *   precision: { smallestUnit: "분", largestUnit: "시간" },
 * });
 *
 * rangeMap.set(new Date("2025-11-13T08:30:00Z"), 100);
 * rangeMap.set(new Date("2024-01-01T08:30:12Z"), (prev) => (prev ?? 0) + 200);
 *
 * console.log(rangeMap.size); // 1
 * console.log(rangeMap.get(new Date("2025-11-13T08:30:00Z"))); // 300
 * ```
 */
export class DateMap<T> {
  get size(): number {
    return this.map.size;
  }

  private map: Map<number, T>;
  private precisionRange: DateMapPrecisionRange;

  constructor(options?: DateMapOptions<T>) {
    this.precisionRange = this.makePrecisionRange(options?.precision);
    this.map = new Map<number, T>(
      options?.initialEntries?.map(([k, v]) => [this.normalizeKey(k), v]),
    );
    this.assertPrecisionRangeIsValid();
  }

  clear(): void {
    this.map.clear();
  }

  delete(key: Date): boolean {
    const ts = this.normalizeKey(key);
    return this.map.delete(ts);
  }

  entries(): DateMapValueEntries<T> {
    return Array.from(this.map.entries()).map(([ts, v]) => [
      new Date(ts),
      v as DateMapValueType<T>,
    ]);
  }

  get(key: Date): T | undefined {
    const ts = this.normalizeKey(key);
    return this.map.get(ts);
  }

  has(key: Date): boolean {
    const ts = this.normalizeKey(key);
    return this.map.has(ts);
  }

  keys(): IterableIterator<Date> {
    return Array.from(this.map.keys())
      .map((ts) => new Date(ts))
      [Symbol.iterator]();
  }

  set(key: Date, value: DateMapSetterType<T>): void {
    const ts = this.normalizeKey(key);
    const prevValue = this.map.get(ts);

    const newValue = typeof value === 'function' ? value(prevValue) : value;
    this.map.set(ts, newValue);
  }

  setAll(entries: DateMapSetterEntries<T>): void {
    for (const [date, value] of entries) {
      this.set(date, value);
    }
  }

  values(): IterableIterator<T> {
    return this.map.values();
  }

  private assertPrecisionRangeIsValid() {
    const { smallestUnit, largestUnit } = this.precisionRange;

    if (!orderedPrecisions.includes(smallestUnit) || !orderedPrecisions.includes(largestUnit)) {
      throw new Error(
        `DateMap: 정밀도 값이 올바르지 않아요: smallestUnit=${smallestUnit}, largestUnit=${largestUnit}`,
      );
    }

    if (orderedPrecisions.indexOf(smallestUnit) > orderedPrecisions.indexOf(largestUnit)) {
      throw new Error(
        `DateMap: 정밀도 범위가 올바르지 않아요: smallestUnit=${smallestUnit}, largestUnit=${largestUnit}`,
      );
    }
  }

  private makePrecisionRange(precision: DateMapOptions<T>['precision']): DateMapPrecisionRange {
    if (!precision) {
      return { smallestUnit: '밀리초', largestUnit: '년' };
    }

    if (typeof precision === 'string') {
      return { smallestUnit: precision, largestUnit: '년' };
    }

    return {
      smallestUnit: precision.smallestUnit,
      largestUnit: precision.largestUnit,
    };
  }

  private normalizeKey(key: Date): number {
    const newKey = new Date(key);

    const { smallestUnit, largestUnit } = this.precisionRange;

    switch (smallestUnit) {
      case '날':
        newKey.setUTCHours(0, 0, 0, 0);
        break;
      case '년':
        newKey.setUTCMonth(0, 1);
        newKey.setUTCHours(0, 0, 0, 0);
        break;
      case '분':
        newKey.setUTCSeconds(0, 0);
        break;
      case '시간':
        newKey.setUTCMinutes(0, 0, 0);
        break;
      case '월':
        newKey.setUTCDate(1);
        newKey.setUTCHours(0, 0, 0, 0);
        break;
      case '초':
        newKey.setUTCMilliseconds(0);
        break;
      default:
        break;
    }

    switch (largestUnit) {
      case '날':
        newKey.setUTCMonth(0);
        newKey.setUTCFullYear(0);
        break;
      case '밀리초':
        newKey.setUTCSeconds(0);
        newKey.setUTCMinutes(0);
        newKey.setUTCHours(0);
        newKey.setUTCDate(1);
        newKey.setUTCMonth(0);
        newKey.setUTCFullYear(0);
        break;
      case '분':
        newKey.setUTCHours(0);
        newKey.setUTCDate(1);
        newKey.setUTCMonth(0);
        newKey.setUTCFullYear(0);
        break;
      case '시간':
        newKey.setUTCDate(1);
        newKey.setUTCMonth(0);
        newKey.setUTCFullYear(0);
        break;
      case '월':
        newKey.setUTCFullYear(0);
        break;
      case '초':
        newKey.setUTCMinutes(0);
        newKey.setUTCHours(0);
        newKey.setUTCDate(1);
        newKey.setUTCMonth(0);
        newKey.setUTCFullYear(0);
        break;
    }

    return newKey.getTime();
  }
}
