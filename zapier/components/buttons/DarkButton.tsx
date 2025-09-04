export const DarkButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: React.ReactNode;
  onClick: () => void;
  size: "small";
}) => {
  return (
    <div
      className=" flex flex-col justify-center px-8 items-center   bg-purple-700 py-2 text-white  hover:shadow-lg rounded cursor-pointer "
      onClick={onClick}
    >
      {children}
    </div>
  );
};
