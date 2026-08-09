import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, AlertCircle } from "lucide-react";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erreurLocale, setErreurLocale] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreurLocale(null);
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setErreurLocale(
        err.message || "Connexion impossible. Vérifiez vos identifiants.",
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 brand-gradient text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -right-10 bottom-10 w-64 h-64 rounded-full accent-gradient opacity-20" />
        <div className="flex items-center gap-3 relative">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm">
            <img
              src="/logo-onetech.png"
              alt="OneTech Business Solution"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-display font-bold text-lg">
            OneTech Business Solution
          </span>
        </div>
        <div className="relative">
          <h2 className="font-display text-3xl font-bold leading-tight mb-3">
            Sensibiliser, former,
            <br />
            sécuriser l'information.
          </h2>
          <p className="text-white/70 max-w-sm">
            Plateforme interactive dédiée à la Qualité (ISO 9001) et à la
            Sécurité de l'Information (ISO 27001) au sein de votre organisation.
          </p>
        </div>
        <p className="text-xs text-white/50 relative">
          © 2026 OneTech Business Solution — Tous droits réservés.
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Connexion</h1>
          <p className="text-slate-500 mb-8 text-sm">
            Authentification via votre compte Active Directory de l'entreprise.
          </p>

          {erreurLocale && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-3 py-2.5 mb-4">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{erreurLocale}</span>
            </div>
          )}

          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Identifiant Active Directory
          </label>
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2.5 mb-4 focus-within:border-primary-500 transition-colors">
            <Mail size={16} className="text-slate-400" />
            <input
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="prenom.nom"
              className="outline-none text-sm w-full"
            />
          </div>

          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Mot de passe
          </label>
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2.5 mb-2 focus-within:border-primary-500 transition-colors">
            <Lock size={16} className="text-slate-400" />
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="outline-none text-sm w-full"
            />
          </div>

          <p className="text-xs text-slate-400 mb-6">
            Ce sont les mêmes identifiants que ceux utilisés pour ouvrir une
            session Windows au bureau.
          </p>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
