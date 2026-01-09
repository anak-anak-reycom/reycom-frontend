import Image from "next/image";
import Hero from "./components/hero/Hero";
import { Main } from "./components/main/main";
import { CardDetail } from "./components/card/card";

export default function Home() {
  return (
    <div className="min-h-screen py-5 ">
      <Hero />
      <Main />
      <CardDetail />
      
    </div>
  );
}
