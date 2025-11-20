interface PageLayoutProps {
  title?: string;
}

export const PageLayout = ({ children, title }: React.PropsWithChildren<PageLayoutProps>) => {
  return (
    <div className="flex size-full flex-col">
      {!!title && <h1 className="typo-h3_sb_32 m-10 mb-4">{title}</h1>}
      {children}
    </div>
  );
};
