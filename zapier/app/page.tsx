import { Appbar } from "@/components/Appbar";
import { HeroSection } from "@/components/HeroSection";
import { HeroSection2 } from "./HeroSec2";

export default function Home() {
  return (
    <main className="">
      <Appbar />
      <HeroSection />
      <HeroSection2 />
    </main>
  );
}
