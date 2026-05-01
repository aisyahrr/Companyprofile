import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiLock, FiUser, FiEye, FiEyeOff, FiAlertCircle, FiShield } from "react-icons/fi";
import { login, ROLE_HOME } from "@/lib/auth";

const demoAccounts = [
  { role: "Super Admin", username: "superadmin", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { role: "Petugas", username: "petugas", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { role: "Admin NIDI", username: "nidi", color: "bg-violet-50 text-violet-700 border-violet-200" },
  { role: "Admin SLO", username: "slo", color: "bg-amber-50 text-amber-700 border-amber-200" },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fromState = (location.state as { from?: string })?.from;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username dan password wajib diisi");
      return;
    }
    const u = login(username.trim(), password);
    if (u) {
      navigate(fromState || ROLE_HOME[u.role], { replace: true });
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50 p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Left brand panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                <FiShield size={22} />
              </div>
              <span className="font-bold text-xl">CertHub</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-3">
              Integrated Certification Management
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Sistem manajemen sertifikasi NIDI & SLO terpadu untuk PT Royal Citra Abadi.
              Kelola alur dari Petugas, Admin NIDI, Admin SLO hingga Final Approval dalam satu
              platform.
            </p>
          </div>
          <div className="space-y-2 text-xs text-blue-100/80">
            <p className="font-semibold text-white">Demo Accounts (password: admin123)</p>
            {demoAccounts.map((a) => (
              <div key={a.username} className="flex items-center justify-between bg-white/10 backdrop-blur rounded-lg px-3 py-2">
                <span>{a.role}</span>
                <code className="text-white">{a.username}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Selamat Datang</h1>
            <p className="text-sm text-slate-500 mt-1">Masuk ke dashboard sertifikasi Anda</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <FiAlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm"
                  placeholder="superadmin / petugas / nidi / slo"
                  maxLength={50}
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm"
                  placeholder="••••••••"
                  maxLength={100}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Masuk
            </button>
          </form>

          <div className="lg:hidden mt-6 space-y-1.5 text-xs">
            <p className="font-semibold text-slate-700">Demo (password: admin123):</p>
            {demoAccounts.map((a) => (
              <div key={a.username} className={`flex justify-between rounded-md px-3 py-1.5 border ${a.color}`}>
                <span>{a.role}</span>
                <code>{a.username}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
