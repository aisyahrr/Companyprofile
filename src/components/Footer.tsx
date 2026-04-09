import { FiInstagram, FiLinkedin, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const Footer = () => (
  <footer className="bg-navy text-navy-foreground">
    <div className="max-w-7xl mx-auto py-16 px-4 lg:px-8">
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
          Mari <span className="text-primary">Terhubung</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">RC</span>
              </div>
              <span className="font-extrabold">
                <span className="text-primary">Royal</span>Citra
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              PT Royal Citra Abadi — Partner teknologi terpercaya untuk transformasi digital bisnis Anda.
            </p>
          </div>
          {/* Layanan */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Layanan</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li className="hover:text-primary transition cursor-pointer">Pengembangan Website</li>
              <li className="hover:text-primary transition cursor-pointer">Aplikasi Mobile</li>
              <li className="hover:text-primary transition cursor-pointer">Desain UI/UX</li>
              <li className="hover:text-primary transition cursor-pointer">Cloud & Server</li>
            </ul>
          </div>
          {/* Kontak */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <FiMapPin size={14} className="mt-1 flex-shrink-0 text-primary" />
                Jl. Jendral Sudirman No. 123, Jakarta Selatan
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <FiPhone size={14} className="flex-shrink-0 text-primary" />
                +62 21 1234 5678
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <FiMail size={14} className="flex-shrink-0 text-primary" />
                info@royalcitraabadi.co.id
              </div>
            </div>
          </div>
          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Ikuti Kami</h4>
            <div className="flex gap-3">
              {[FiInstagram, FiLinkedin, FiFacebook, FiTwitter].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-[hsl(220,20%,14%)] border border-[hsl(220,20%,20%)] flex items-center justify-center hover:gradient-primary hover:bg-primary text-navy-foreground transition"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[hsl(220,20%,16%)] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
        <p>© {new Date().getFullYear()} PT Royal Citra Abadi. Seluruh hak cipta dilindungi.</p>
        <div className="flex gap-4">
          <span className="hover:text-primary transition cursor-pointer">Kebijakan Privasi</span>
          <span className="hover:text-primary transition cursor-pointer">Syarat & Ketentuan</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
