import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogs = [
  {
    img: blog1,
    date: "15 Mar 2026",
    title: "Pentingnya Transformasi Digital untuk UMKM",
    excerpt: "Bagaimana teknologi dapat membantu UMKM bersaing di era digital...",
  },
  {
    img: blog2,
    date: "10 Mar 2026",
    title: "Tren Pengembangan Website 2026",
    excerpt: "Teknologi dan framework terbaru yang wajib diketahui developer...",
  },
  {
    img: blog3,
    date: "5 Mar 2026",
    title: "Strategi Digital Marketing yang Efektif",
    excerpt: "Tips dan trik meningkatkan ROI dari kampanye digital marketing...",
  },
];

const BlogSection = () => (
  <section id="blog" className="py-20 px-4 lg:px-8 bg-section-alt">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Blog</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
          Berita & <span className="text-primary">Blog</span> Terbaru
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-2xl overflow-hidden border hover:shadow-xl transition-shadow group cursor-pointer"
          >
            <div className="overflow-hidden">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                <FiCalendar size={12} />
                {blog.date}
              </div>
              <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{blog.excerpt}</p>
              <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Baca Selengkapnya <FiArrowRight size={14} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
