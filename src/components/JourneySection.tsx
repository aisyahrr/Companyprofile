import { motion } from "framer-motion";

const journeyStats = [
  { value: 95, label: "Kepuasan Klien" },
  { value: 88, label: "Proyek Tepat Waktu" },
  { value: 92, label: "Tingkat Retensi" },
];

const CircularProgress = ({ value }: { value: number }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)"
        className="transition-all duration-1000"
      />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-lg font-bold">
        {value}%
      </text>
    </svg>
  );
};

const JourneySection = () => (
  <section className="py-20 px-4 lg:px-12 bg-section-alt">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Perjalanan Kami</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
          Perjalanan Menuju <span className="text-primary">Kesuksesan</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-8">
        {journeyStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="text-center"
          >
            <div className=" mx-auto mb-4 justify-center items-center flex flex-col space-y-4">
              <CircularProgress value={stat.value} />
              <p className="font-semibold mt-3">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default JourneySection;
