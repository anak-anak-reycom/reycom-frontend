// app/line/healthcare/page.tsx
import HealthcareSlides from "./components/slides/Slides";

export const metadata = {
  title: "Healthcare Services",
  description: "Healthcare offerings and partners",
};

export default function HealthcarePage() {
  return (
    <main className="min-h-screen pt-[80px]">
      <HealthcareSlides />
    </main>
  );
}
