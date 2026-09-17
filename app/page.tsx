import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { PricingSection } from "@/components/pricing/PricingSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { CONTACT } from "@/content/contact";
import { PLANS, formatPrice } from "@/content/pricing";
import { SITE_URL } from "@/lib/site";

/** ProfessionalService JSON-LD — only fields backed by real content. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Landora",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Landing pages modernas, rápidas e estratégicas, criadas para transformar visitantes em clientes.",
  ...(CONTACT.phone && { telephone: CONTACT.phone }),
  ...(CONTACT.email && { email: CONTACT.email }),
  priceRange: `${formatPrice(PLANS[0].price)}–${formatPrice(PLANS[PLANS.length - 1].price)}`,
  areaServed: "PT",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Planos Landora",
    itemListElement: PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.tagline,
      price: plan.price,
      priceCurrency: "EUR",
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-authored content — not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <Hero />
        <ProjectsSection />
        <ServicesSection />
        <ProcessSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
