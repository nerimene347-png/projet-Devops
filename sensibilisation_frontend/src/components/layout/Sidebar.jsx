import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  ListChecks,
  Video,
  ShieldCheck,
  BarChart3,
  Users,
  Bell,
  Award,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ROLES_GESTION_UTILISATEURS = [
  "Administrateur",
  "DRH",
  "Directeur Général",
];

const links = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/modules", label: "E-learning", icon: GraduationCap },
  { to: "/quiz", label: "Quiz", icon: ListChecks },
  { to: "/videos", label: "Vidéos", icon: Video },
  { to: "/bonnes-pratiques", label: "Bonnes pratiques", icon: ShieldCheck },
  { to: "/statistiques", label: "Statistiques", icon: BarChart3 },
  {
    to: "/utilisateurs",
    label: "Utilisateurs",
    icon: Users,
    rolesAutorises: ROLES_GESTION_UTILISATEURS,
  },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/attestations", label: "Attestations", icon: Award },
];

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const linksVisibles = links.filter(
    (l) => !l.rolesAutorises || (user && l.rolesAutorises.includes(user.role)),
  );

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-72 brand-gradient text-white flex flex-col z-40 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 p-1.5 shadow-sm">
            <img
              src="/logo-onetech.png"
              alt="OneTech Business Solution"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="font-display font-bold text-[14px] leading-tight">
              OneTech Business Solution
            </p>
            <p className="text-[11px] text-white/60 leading-tight mt-0.5">
              Sensibilisation ISO 9001 · ISO 27001
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-5 space-y-1">
          {linksVisibles.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-white text-primary-700 shadow-sm"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} strokeWidth={2.1} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-white/10">
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-xs text-white/70 mb-2">Progression globale</p>
            <div className="w-full bg-white/15 rounded-full h-1.5 overflow-hidden mb-1.5">
              <div
                className="h-1.5 rounded-full accent-gradient"
                style={{ width: "68%" }}
              />
            </div>
            <p className="text-[11px] text-white/60">
              68% des collaborateurs formés
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
