export const LinkButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="mr-3 my-4 px-2 py-2 text-slate-600  cursor-pointer font-normal  hover:bg-slate-300 rounded-lg "
      onClick={onClick}
    >
      {children}
    </div>
  );
};
