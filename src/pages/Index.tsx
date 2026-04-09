import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import WhyTrustSection from "@/components/WhyTrustSection";
import PortfolioSection from "@/components/PortfolioSection";
import JourneySection from "@/components/JourneySection";
import QuoteSection from "@/components/QuoteSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <WorkProcessSection />
    <WhyTrustSection />
    <PortfolioSection />
    <JourneySection />
    <QuoteSection />
    <TestimonialsSection />
    <TeamSection />
    <BlogSection />
    <FAQSection />
    <SubscribeSection />
    <Footer />
  </div>
);

export default Index;
