import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const works = [
  { img: portfolio1, title: "Dashboard Analytics", category: "Web Development" },
  { img: portfolio2, title: "Aplikasi E-Commerce", category: "Mobile App" },
  { img: portfolio3, title: "Website Korporat", category: "Web Design" },
];

const PortfolioSection = () => (
  <section id="portofolio" className="py-20 px-4 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Portofolio</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
          Jelajahi Showcase{" "}
          <span className="text-primary">Karya Unggulan</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work, i) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="rounded-2xl overflow-hidden mb-4 relative">
              <img
                src={work.img}
                alt={work.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
            </div>
            <span className="text-xs text-primary font-semibold uppercase tracking-wider">{work.category}</span>
            <h3 className="font-bold text-lg mt-1">{work.title}</h3>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <button className="gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:opacity-90 transition text-sm">
          Lihat Semua Proyek <FiArrowRight />
        </button>
      </div>
    </div>
  </section>
);

export default PortfolioSection;
