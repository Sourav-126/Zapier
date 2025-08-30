export const PrimaryButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: React.ReactNode;
  onClick: () => void;
  size: "small" | "medium" | "hard";
}) => {
  return (
    <div
      className={`${size == "small" ? "text-sm" : "text-lg"} ${
        size == "small"
          ? "mr-2 px-4 mt-4 mb-4   bg-amber-600 text-white"
          : "mx-8 my-10 px-7 "
      }  flex items-center rounded-lg  cursor-pointer `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
