import Delivery from "@/components/Delivery";
import Faq from "@/components/Faq";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeightFinder from "@/components/HeightFinder";
import Hero from "@/components/Hero";
import MobileBar from "@/components/MobileBar";
import ModelSheetDialog from "@/components/ModelSheetDialog";
import PriceEstimator from "@/components/PriceEstimator";
import QuoteForm from "@/components/QuoteForm";
import Services from "@/components/Services";
import Steps from "@/components/Steps";
import { site } from "@/lib/site";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  legalName: site.legalName,
  taxID: site.ide,
  description: "Location de nacelles ciseaux électriques neuves de 5,80 à 12 m.",
  url: site.url,
  telephone: "+41 76 361 66 14",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    postalCode: site.postalCode,
    addressLocality: site.city,
    addressRegion: "JU",
    addressCountry: "CH",
  },
  geo: { "@type": "GeoCoordinates", latitude: 47.42933, longitude: 7.08091 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "13:30", closes: "17:30" },
  ],
  areaServed: "CH",
};

export default function Home() {
  return (
    <>
      <a className="skip" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu">
        <Hero />
        <HeightFinder />
        <Fleet />
        <PriceEstimator />
        <Services />
        <Delivery />
        <Steps />
        <Faq />
        <QuoteForm />
      </main>
      <Footer />
      <MobileBar />
      <ModelSheetDialog />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
    </>
  );
}
