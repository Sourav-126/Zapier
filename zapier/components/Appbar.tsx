"use client";

import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/primaryButton";

export const Appbar = () => {
  const router = useRouter();
  return (
    <div className="flex border-b border-slate-100/80 justify-between bg-slate-50 rounded-3xl ">
      <div className=" flex items-center px-4 py-3 font-bold  text-xl">
        Zapier
      </div>
      <div className="flex  ">
        <div className="pr-4">
          <LinkButton onClick={() => {}}> Contact Sales </LinkButton>
        </div>
        <div className="pr-4">
          <LinkButton
            onClick={() => {
              router.push("/signin");
            }}
          >
            {" "}
            Login{" "}
          </LinkButton>
        </div>
        <PrimaryButton
          onClick={() => {
            router.push("/signup");
          }}
          size="small"
        >
          SignUp
        </PrimaryButton>
      </div>
    </div>
  );
};
