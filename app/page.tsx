import { sx } from "@/lib/css";
import { Starfield } from "@/components/Starfield";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Problem } from "@/components/Problem";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Outreach } from "@/components/Outreach";
import { Why } from "@/components/Why";
import { Results } from "@/components/Results";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <div style={sx("background:#060606;color:#fff;overflow:hidden;position:relative")}>
      <Starfield />
      <Nav />
      <Hero />
      <TrustStrip />
      <Problem />
      <Services />
      <Process />
      <Outreach />
      <Why />
      <Results />
      <Cta />
      <Faq />
      <Footer />
    </div>
  );
}
