import { useEffect, useState } from "react";
import { Menu, Search, Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getNotifications } from "../../services/api";

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [nonLues, setNonLues] = useState(0);

  useEffect(() => {
    getNotifications()
      .then((data) => setNonLues(data.filter((n) => !n.lu).length))
      .catch(() => {});
  }, []);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3 flex-1">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            onClick={onMenuClick}
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-full max-w-sm">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un module, un utilisateur..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/notifications"
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {nonLues > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-500 ring-2 ring-white" />
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setMenuOuvert((v) => !v)}
              className="flex items-center gap-2.5 pl-3 border-l border-slate-200"
            >
              <div className="w-9 h-9 rounded-full bg-primary-700 text-white text-sm font-semibold flex items-center justify-center">
                {user.avatarInitiales}
              </div>
              <div className="hidden sm:block leading-tight text-left">
                <p className="text-sm font-semibold text-slate-800">
                  {user.nom}
                </p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
            </button>

            {menuOuvert && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOuvert(false)}
                />
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={15} /> Déconnexion
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
