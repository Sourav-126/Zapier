import { Icons } from "@/app/icons";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="flex justify-between items-center px-8 py-12">
      <div className="flex flex-col gap-4 max-w-lg">
        <span className="text-xs uppercase tracking-wide text-gray-500">
          SCALE AGENTS WITH ZAPIER
        </span>
        <div className="font-bold text-5xl">
          Automate as fast as you can type
        </div>
        <div className="text-md font-light">
          Build and ship AI workflows in minutes—no IT bottlenecks, no
          complexity. Just results.
        </div>
        <div className="flex gap-3 mt-4">
          <button className="px-4 py-2 rounded-lg bg-amber-600 text-white cursor-pointer">
            Start Free with Email
          </button>
          <button className="px-4 py-2 rounded-lg border flex cursor-pointer gap-2 ">
            <Icons.Google /> Continue With Google
          </button>
        </div>
      </div>

      <div className="w-1/2 flex justify-center">
        <Image
          src="https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745602193/Homepage/hero-illo_orange_ilrzpu.png"
          alt="HeroSection1"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  );
};
