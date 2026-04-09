import { useState } from "react";
import { FiSend } from "react-icons/fi";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 px-4 lg:px-8 bg-section-alt">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
          Berlangganan untuk <span className="text-primary">Tips IT Ahli</span> & Penawaran Spesial
        </h2>
        <p className="text-muted-foreground text-sm mb-6">Dapatkan insight terbaru langsung di inbox Anda.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Terima kasih telah berlangganan!");
            setEmail("");
          }}
          className="flex gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Masukkan email Anda"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition text-sm flex items-center gap-2"
          >
            <FiSend size={16} />
            Kirim
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
