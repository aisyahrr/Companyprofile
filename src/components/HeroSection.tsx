import { motion } from "framer-motion";
import { FiArrowRight, FiCode, FiLayout, FiSmartphone, FiImage } from "react-icons/fi";
import heroBg from "@/assets/hero-bg.jpg";

const tags = [
  { icon: FiCode, label: "Pengembangan Website" },
  { icon: FiLayout, label: "Desain UI/UX" },
  { icon: FiSmartphone, label: "Aplikasi Mobile" },
  { icon: FiImage, label: "Desain Grafis" },
];

const HeroSection = () => (
  <section id="beranda" className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Tim Royal Citra Abadi" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-[hsl(220,25%,8%)]/75" />
    </div>
    <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-28 pb-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl"
      >
        <p className="text-primary font-semibold text-sm mb-4 tracking-wide">SOLUSI DIGITAL TERPERCAYA</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ color: 'white' }}>
          Kreativitas Bertemu{" "}
          <span className="text-primary">Teknologi</span>{" "}
          Terdepan
        </h1>
        <p className="text-base md:text-lg mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>
          PT Royal Citra Abadi menghadirkan solusi teknologi informasi terbaik untuk mendorong pertumbuhan bisnis Anda.
        </p>
        <a
          href="#layanan"
          className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:opacity-90 transition text-sm"
        >
          Jelajahi Layanan <FiArrowRight />
        </a>
      </motion.div>
    </div>
    {/* Tags bar at bottom */}
    <div className="absolute bottom-0 left-0 right-0 gradient-primary">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex overflow-x-auto justify-center gap-0">
          {tags.map((tag) => (
            <div
              key={tag.label}
              className="flex items-center gap-2 px-6 py-3.5 text-primary-foreground text-sm font-medium whitespace-nowrap border-r border-primary-foreground/20 last:border-r-0"
            >
              <tag.icon size={16} />
              {tag.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
