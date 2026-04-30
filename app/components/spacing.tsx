export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-8 px-5">{children}</div>;
};

export const FooterSpacing = () => {
  return <div className="h-16" />;
};
