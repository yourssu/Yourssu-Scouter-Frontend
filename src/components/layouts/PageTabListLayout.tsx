/* 
  Todo: 추후 탭 기능까지 구현해야 함
*/
export const PageTabListLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="border-line-basicLight flex items-center border-b pl-6">{children}</div>;
};
