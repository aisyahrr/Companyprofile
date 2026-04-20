import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiLock, FiUser, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { login } from "@/lib/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username dan password wajib diisi");
      return;
    }
    if (login(username.trim(), password)) {
      navigate(from, { replace: true });
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/40 p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-3">
            R
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">PT Royal Citra Abadi</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
            <FiAlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                placeholder="admin"
                maxLength={50}
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                placeholder="••••••••"
                maxLength={100}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Masuk
          </button>
        </form>

        <div className="mt-6 p-3 rounded-lg bg-secondary/60 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Demo Credentials:</p>
          <p>Username: <code className="text-primary">admin</code></p>
          <p>Password: <code className="text-primary">admin123</code></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
