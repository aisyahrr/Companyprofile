import { FiInstagram, FiLinkedin, FiFacebook, FiTwitter } from "react-icons/fi";

const Footer = () => (
  <footer className="bg-navy text-navy-foreground">
    <div className="container-main section-padding">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-extrabold mb-4">
            <span className="text-primary">Royal</span>Citra
          </h3>
          <p className="text-sm opacity-70 leading-relaxed">
            PT Royal Citra Abadi — Partner teknologi terpercaya untuk transformasi digital bisnis Anda.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Layanan</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>Pengembangan Website</li>
            <li>Aplikasi Mobile</li>
            <li>Desain UI/UX</li>
            <li>Cloud & Server</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Perusahaan</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><a href="#tentang" className="hover:text-primary transition">Tentang Kami</a></li>
            <li><a href="#tim" className="hover:text-primary transition">Tim</a></li>
            <li><a href="#kontak" className="hover:text-primary transition">Kontak</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Ikuti Kami</h4>
          <div className="flex gap-3">
            {[FiInstagram, FiLinkedin, FiFacebook, FiTwitter].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary text-primary-foreground transition"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm opacity-50">
        © {new Date().getFullYear()} PT Royal Citra Abadi. Seluruh hak cipta dilindungi.
      </div>
    </div>
  </footer>
);

export default Footer;
