import '@tanstack/react-query';

type BaseKey =
  | 'applicantLastUpdatedTime'
  | 'applicants'
  | 'applicantStates'
  | 'departments'
  | 'memberLastUpdatedTime'
  | 'memberRoles'
  | 'members'
  | 'memberStates'
  | 'parts'
  | 'semesterNow'
  | 'semesters';

type QueryKey = readonly [BaseKey, ...ReadonlyArray<unknown>];

declare module '@tanstack/react-query' {
  interface Register {
    mutationKey: QueryKey;
    queryKey: QueryKey;
  }
}
