import Image from "next/image";
import Hero from "./components/hero/Hero";
import { Main } from "./components/main/main";

export default function Home() {
  return (
    <div className="min-h-screen py-5 ">
      <Hero />
      <Main />
    </div>
  );
}
