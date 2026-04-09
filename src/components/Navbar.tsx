import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Tim", href: "#tim" },
  { label: "Blog", href: "#blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">RC</span>
          </div>
          <span className="text-lg font-extrabold">
            <span className="text-primary">Royal</span>Citra
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden lg:block">
          <a
            href="#kontak"
            className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition inline-block"
          >
            Hubungi Kami
          </a>
        </div>
        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-background border-t px-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary border-b border-border/50"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={() => setOpen(false)}
            className="block gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center mt-3"
          >
            Hubungi Kami
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
