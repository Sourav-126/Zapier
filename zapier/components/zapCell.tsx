"use client";
export const ZapCell = ({
  name,
  index,
  onClick,
}: {
  name?: string;
  index: number;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="border border-black pt-[-40px] py-8 px-8 flex w-[300px] justify-center cursor-pointer bg-white drop-shadow-2xl"
    >
      <div className="flex text-xl">
        <div className="font-bold">{index}.</div>
        <div>{name}</div>
      </div>
    </div>
  );
};
