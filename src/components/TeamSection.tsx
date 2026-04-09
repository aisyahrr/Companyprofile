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
  <section id="tim" className="py-24 px-4 lg:px-8 mx-0 md:mx-12 bg-gradient-to-b from-background to-muted/30">
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
        <div>
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Tim Kami</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
            Orang Hebat di Balik <br />
            <span className="text-primary">Kesuksesan Kami</span>
          </h2>
        </div>

        <button className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:scale-105 transition">
          Lihat Semua
        </button>
      </div>

      {/* TEAM GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
          >
            {/* IMAGE */}
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-[360px] object-cover group-hover:scale-110 transition duration-700"
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition" />

            {/* CONTENT */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition">
              <h3 className="text-lg font-bold text-white">
                {member.name}
              </h3>
              <p className="text-sm text-white/70">
                {member.role}
              </p>
            </div>

            {/* LINKEDIN FLOAT */}
            <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-primary transition">
                <FiLinkedin size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* STATS - MODERN CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
        {[
          { value: "150+", label: "Klien" },
          { value: "300+", label: "Proyek" },
          { value: "98%", label: "Kepuasan" },
          { value: "10+", label: "Tahun" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-6 text-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-3xl font-extrabold text-primary">
              {s.value}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default TeamSection;