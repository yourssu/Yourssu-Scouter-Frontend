export const locationTypes = ['동방', '비대면', '강의실', '기타'] as const;

export type LocationType = (typeof locationTypes)[number];
