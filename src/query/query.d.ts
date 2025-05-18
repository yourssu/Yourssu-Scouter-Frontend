import '@tanstack/react-query';

type BaseKey =
  | 'members'
  | 'memberRoles'
  | 'memberStates'
  | 'applicants'
  | 'applicantStates'
  | 'parts'
  | 'semesters'
  | 'departments';

type QueryKey = readonly [BaseKey, ...ReadonlyArray<unknown>];

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
  }
}
