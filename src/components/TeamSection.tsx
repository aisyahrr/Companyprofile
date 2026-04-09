import { motion } from "framer-motion";
import { FiLinkedin, FiMail } from "react-icons/fi";

const team = [
  { name: "Ahmad Rizky", role: "CEO & Founder", initials: "AR" },
  { name: "Sari Dewi", role: "CTO", initials: "SD" },
  { name: "Budi Santoso", role: "Lead Developer", initials: "BS" },
  { name: "Ratna Ayu", role: "UI/UX Designer", initials: "RA" },
];

const TeamSection = () => (
  <section id="tim" className="section-padding">
    <div className="container-main">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Tim Kami</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
          Para <span className="text-primary">Ahli</span> di Balik Kesuksesan
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 text-center border shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center text-primary-foreground text-xl font-bold">
              {member.initials}
            </div>
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{member.role}</p>
            <div className="flex justify-center gap-3">
              <button className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:bg-primary hover:text-primary-foreground transition">
                <FiLinkedin size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:bg-primary hover:text-primary-foreground transition">
                <FiMail size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
