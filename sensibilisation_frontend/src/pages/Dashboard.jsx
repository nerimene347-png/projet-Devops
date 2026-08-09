import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  CheckCircle2,
  ListChecks,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import PageHeader from "../components/ui/PageHeader";
import { getStatsGlobales, getModules } from "../services/api";
import { useAuth } from "../context/AuthContext";

const kpiConfig = [
  {
    key: "tauxCompletionGlobal",
    label: "Taux de complétion global",
    suffix: "%",
    icon: CheckCircle2,
    tone: "primary",
  },
  {
    key: "utilisateursActifs",
    label: "Collaborateurs actifs",
    suffix: "",
    icon: Users,
    tone: "accent",
  },
  {
    key: "modulesPublies",
    label: "Modules publiés",
    suffix: "",
    icon: GraduationCap,
    tone: "primary",
  },
  {
    key: "quizReussisPourcent",
    label: "Taux de réussite aux quiz",
    suffix: "%",
    icon: ListChecks,
    tone: "accent",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getStatsGlobales().then(setStats);
    getModules().then(setModules);
  }, []);

  const enCours = modules.filter((m) => m.statut !== "termine");

  return (
    <div>
      <PageHeader
        title={`Bonjour ${user.nom.split(" ")[0]} 👋`}
        subtitle="Voici un aperçu de la sensibilisation Qualité & Sécurité de l'Information."
      />

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpiConfig.map(({ key, label, suffix, icon: Icon, tone }) => (
          <Card key={key} className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-2">{label}</p>
              <p className="text-3xl font-bold text-slate-900">
                {stats ? stats[key] : "—"}
                {suffix}
              </p>
            </div>
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0
              ${tone === "primary" ? "bg-primary-100 text-primary-700" : "bg-accent-100 text-accent-600"}`}
            >
              <Icon size={20} strokeWidth={2.2} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Graphique évolution */}
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">
              Évolution des formations complétées
            </h3>
            <Badge color="bleu">6 derniers mois</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.evolutionMensuelle || []}>
                <defs>
                  <linearGradient
                    id="colorCompletions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#0e4d92" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0e4d92" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="mois"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="completions"
                  stroke="#0e4d92"
                  strokeWidth={2.5}
                  fill="url(#colorCompletions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Progression par département */}
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">
            Progression par département
          </h3>
          <div className="space-y-4">
            {(stats?.progressionParDepartement || []).map((d) => (
              <div key={d.departement}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-600">{d.departement}</span>
                  <span className="font-semibold text-slate-800">
                    {d.progression}%
                  </span>
                </div>
                <ProgressBar
                  value={d.progression}
                  colorClass="accent-gradient"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Modules en cours */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800">
            Vos modules à poursuivre
          </h3>
          <Link
            to="/modules"
            className="text-sm font-medium text-primary-700 flex items-center gap-1 hover:gap-1.5 transition-all"
          >
            Voir tout <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enCours.slice(0, 3).map((m) => (
            <Card
              key={m.id}
              className="hover:border-primary-300 transition-colors"
            >
              <Badge color={m.categorie === "ISO 27001" ? "orange" : "bleu"}>
                {m.categorie}
              </Badge>
              <h4 className="font-semibold text-slate-800 mt-3 mb-1 leading-snug">
                {m.titre}
              </h4>
              <p className="text-xs text-slate-500 mb-4">{m.duree}</p>
              <ProgressBar value={m.progression} />
              <p className="text-xs text-slate-500 mt-2">
                {m.progression}% complété
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
