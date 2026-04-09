import { motion } from "framer-motion";
import { FiLinkedin } from "react-icons/fi";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const team = [
  { name: "Sari Dewi", role: "CEO & Founder", img: team1 },
  { name: "Ahmad Rizky", role: "CTO", img: team2 },
  { name: "Ratna Ayu", role: "Lead Designer", img: team3 },
];

const TeamSection = () => (
  <section id="tim" className="py-20 px-4 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Tim Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Kenali Tim <span className="text-primary">Ahli</span> Kami
          </h2>
        </div>
        <button className="hidden md:flex gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition items-center gap-2">
          Lihat Semua
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,8%)]/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-bold text-navy-foreground">{member.name}</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{member.role}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground">
                <FiLinkedin size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    {/* Stats bar */}
    <div className="max-w-7xl mx-auto mt-14">
      <div className="bg-navy rounded-2xl py-8 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-navy-foreground">
          {[
            { value: "150+", label: "Klien" },
            { value: "300+", label: "Proyek" },
            { value: "98%", label: "Kepuasan" },
            { value: "10+", label: "Tahun" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-extrabold text-primary">{s.value}</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TeamSection;
