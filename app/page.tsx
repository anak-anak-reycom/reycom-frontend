import Image from "next/image";
import Hero from "./components/hero/Hero";
import { Main } from "./components/main/main";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-white">
      <Hero />
      <Main />
    </div>
  );
}
