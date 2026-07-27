import HeroSection from "@/components/hero/HeroSection";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Work from "@/components/projects/Work";
import Services from "@/components/services/Services";
import HowWeWork from "@/components/process/HowWeWork";
import Certificates from "@/components/certs/Certificates";
import Testimonials from "@/components/testimonials/Testimonials";
import FAQ from "@/components/faq/FAQ";
import BlogPreview from "@/components/blog/BlogPreview";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <About />
      <Skills />
      <Work />
      <Services />
      <HowWeWork />
      <Certificates />
      <Testimonials />
      <FAQ />
      <BlogPreview />
      <Contact />
      <Footer />
    </main>
  );
}
