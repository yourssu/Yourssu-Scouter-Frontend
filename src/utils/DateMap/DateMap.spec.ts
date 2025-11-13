import { describe, expect, it } from 'vitest';

import { DateMap } from './DateMap';

describe('DateMap', () => {
  it('최초 생성 엔트리 테스트', () => {
    const initialEntries: [Date, number][] = [
      [new Date('2025-01-01T00:00:00Z'), 10],
      [new Date('2025-01-02T12:30:00Z'), 20],
    ];

    const map = new DateMap<number>({ initialEntries });

    expect(map.size).toBe(initialEntries.length);
    initialEntries.forEach(([date, value]) => {
      expect(map.get(date)).toBe(value);
    });
  });

  it('년 단위 정밀도 테스트', () => {
    const map = new DateMap<number>({ precision: '년' });

    map.set(new Date('2024-01-01'), 100);
    map.set(new Date('2024-12-31'), 200);

    expect(map.size).toBe(1);
    expect(map.get(new Date('2024-06-15'))).toBe(200);
  });

  it('월 단위 정밀도 테스트', () => {
    const map = new DateMap<number>({ precision: '월' });

    map.set(new Date('2025-11-01'), 100);
    map.set(new Date('2025-11-25'), 200);

    expect(map.size).toBe(1);
    expect(map.get(new Date('2025-11-10'))).toBe(200);
  });

  it('날 단위 정밀도 테스트', () => {
    const map = new DateMap<string>({ precision: '날' });

    const d1 = new Date('2025-11-13T00:00:00Z');
    const d2 = new Date('2025-11-13T23:59:59Z');

    map.set(d1, '낮');
    map.set(d2, '밤');

    expect(map.size).toBe(1);
    expect(map.get(d1)).toBe('밤');
  });

  it('시간 단위 정밀도 테스트', () => {
    const map = new DateMap<string>({ precision: '시간' });

    const d1 = new Date('2025-11-13T10:00:00Z');
    const d2 = new Date('2025-11-13T10:59:59Z');
    const d3 = new Date('2025-11-13T11:00:00Z');

    map.set(d1, 'A');
    map.set(d2, 'B');
    map.set(d3, 'C');

    expect(map.size).toBe(2);
    expect(map.get(d1)).toBe('B');
    expect(map.get(d3)).toBe('C');
  });

  it('분 단위 정밀도 테스트', () => {
    const map = new DateMap<string>({ precision: '분' });

    const d1 = new Date('2025-11-13T10:15:00Z');
    const d2 = new Date('2025-11-13T10:15:59Z');
    const d3 = new Date('2025-11-13T10:16:00Z');

    map.set(d1, 'X');
    map.set(d2, 'Y');
    map.set(d3, 'Z');

    expect(map.size).toBe(2);
    expect(map.get(d1)).toBe('Y');
    expect(map.get(d3)).toBe('Z');
  });

  it('초 단위 정밀도 테스트', () => {
    const map = new DateMap<string>({ precision: '초' });

    const d1 = new Date('2025-11-13T10:00:00.000Z');
    const d2 = new Date('2025-11-13T10:00:00.999Z');
    const d3 = new Date('2025-11-13T10:00:01.000Z');

    map.set(d1, 'A');
    map.set(d2, 'B');
    map.set(d3, 'C');

    expect(map.size).toBe(2);
    expect(map.get(d1)).toBe('B');
    expect(map.get(d3)).toBe('C');
  });

  it('기본(밀리초) 단위 정밀도 테스트', () => {
    const map = new DateMap<string>();

    const d1 = new Date('2025-11-01T00:00:00.000Z');
    const d2 = new Date('2025-11-01T00:00:00.500Z');

    map.set(d1, 'A');
    map.set(d2, 'B');

    expect(map.size).toBe(2);
    expect(map.get(d1)).toBe('A');
    expect(map.get(d2)).toBe('B');
  });

  it('범위 단위 정밀도 테스트 (예: { smallestUnit: "분", largestUnit: "시간" })', () => {
    const map = new DateMap<string>({ precision: { smallestUnit: '분', largestUnit: '시간' } });

    const d1 = new Date('2025-11-13T10:15:30Z'); // 10시 15분 30초
    const d2 = new Date('2025-11-13T10:15:59Z'); // 같은 분
    const d3 = new Date('2025-11-13T10:16:00Z'); // 다음 분
    const d4 = new Date('2025-11-13T11:00:00Z'); // 다음 시간

    map.set(d1, 'A');
    map.set(d2, 'B');
    map.set(d3, 'C');
    map.set(d4, 'D');

    // 분 단위로는 같은 키 취급 (10:15:30과 10:15:59)
    expect(map.size).toBe(3);
    expect(map.get(d1)).toBe('B'); // 같은 분에서는 마지막 set 값
    expect(map.get(d3)).toBe('C');
    expect(map.get(d4)).toBe('D');
  });

  it('범위 단위 정밀도 테스트 (예: { smallestUnit: "날", largestUnit: "년" })', () => {
    const map = new DateMap<number>({ precision: { smallestUnit: '날', largestUnit: '년' } });

    const d1 = new Date('2022-11-01T00:00:00Z');
    const d2 = new Date('2022-11-01T23:59:59Z');
    const d3 = new Date('2025-12-01T00:00:00Z');

    map.set(d1, 100);
    map.set(d2, 200);
    map.set(d3, 300);

    // 같은 달(2025-11)은 하나의 키로 간주
    expect(map.size).toBe(2);
    expect(map.get(d1)).toBe(200);
    expect(map.get(d3)).toBe(300);
  });

  it('범위 단위 정밀도 테스트 (예: { smallestUnit: "초", largestUnit: "분" })', () => {
    const map = new DateMap<string>({ precision: { largestUnit: '분', smallestUnit: '초' } });

    const d1 = new Date('2025-11-13T09:00:00.000Z');
    const d2 = new Date('2025-11-12T08:00:00.900Z');
    const d3 = new Date('2025-10-13T08:00:01.000Z');

    map.set(d1, 'X');
    map.set(d2, 'Y');
    map.set(d3, 'Z');

    // 같은 초 단위는 병합됨
    expect(map.size).toBe(2);
    expect(map.get(d1)).toBe('Y');
    expect(map.get(d3)).toBe('Z');
  });

  it('이전 값을 기반으로 새 값을 설정할 수 있어요', () => {
    const map = new DateMap<number>();
    const now = new Date();

    map.set(now, 10);
    map.set(now, (prev) => (prev ?? 0) + 5);

    expect(map.get(now)).toBe(15);
  });

  it('clear, delete, has, keys, values, entries가 동작해요', () => {
    const map = new DateMap<string>();
    const now = new Date();

    map.set(now, '데이터');

    expect(map.has(now)).toBe(true);
    expect([...map.keys()].length).toBe(1);
    expect([...map.values()]).toEqual(['데이터']);
    expect([...map.entries()][0][1]).toBe('데이터');

    expect(map.delete(now)).toBe(true);
    expect(map.size).toBe(0);

    map.set(now, '다시 추가');
    expect(map.size).toBe(1);

    map.clear();
    expect(map.size).toBe(0);
  });

  it('로컬 타임존이 달라도 같은 UTC 시각은 동일한 키로 동작해요', () => {
    const originalTZ = process.env.TZ;

    try {
      // UTC+9 (Asia/Seoul) 기준으로 DateMap 생성 및 값 저장
      process.env.TZ = 'Asia/Seoul';
      const map = new DateMap<string>();

      const utcISOString = '2025-11-13T10:00:00.000Z';

      // 같은 UTC 시각을 가리키는 Date 인스턴스 (각기 다른 생성 방식)
      const localFromIsoInSeoul = new Date(utcISOString); // 현재 TZ(Asia/Seoul)에서 생성
      const utcByTimestamp = new Date(Date.parse(utcISOString)); // timestamp 기반 생성

      map.set(localFromIsoInSeoul, 'value');

      // 타임존을 UTC로 변경한 뒤에도, 동일한 UTC 타임스탬프이면 같은 키로 조회되어야 해요.
      process.env.TZ = 'UTC';
      const sameUtcInUtcTZ = new Date(utcISOString);

      expect(map.get(sameUtcInUtcTZ)).toBe('value');
      expect(map.size).toBe(1);

      // entries의 key 또한 UTC 타임스탬프로 일관되게 보존되어야 해요.
      const [[storedDate]] = [...map.entries()];
      expect(storedDate.getTime()).toBe(sameUtcInUtcTZ.getTime());
      expect(storedDate.getTime()).toBe(localFromIsoInSeoul.getTime());
      expect(storedDate.getTime()).toBe(utcByTimestamp.getTime());
    } finally {
      // 테스트 완료 후 타임존 복구
      process.env.TZ = originalTZ;
    }
  });
});
