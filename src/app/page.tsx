import HeroSection from "@/components/hero/HeroSection";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Work from "@/components/projects/Work";
import Services from "@/components/services/Services";
import Testimonials from "@/components/testimonials/Testimonials";
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
      <Testimonials />
      <BlogPreview />
      <Contact />
      <Footer />
    </main>
  );
}
