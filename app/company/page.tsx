// -------app/theCompany.tsx-------
import CompanyHero from "../components/hero/TheCompanyHero";

export const metadata = {
  title: "The Company — Reycom",
  description: "About Reycom Data Solusi — vision, mission, lines",
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen pt-[80px]"> 
      <CompanyHero />
      
    </main>
  );
}
