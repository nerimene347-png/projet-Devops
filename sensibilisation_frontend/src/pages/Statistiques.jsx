import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import { getStatsGlobales } from "../services/api";

const COLORS = ["#0e4d92", "#2f7fd6", "#f5821f", "#ff9d42", "#94a3b8"];

const repartitionModules = [
  { name: "ISO 9001", value: 2 },
  { name: "ISO 27001", value: 2 },
  { name: "Sécurité SSI", value: 2 },
];

export default function Statistiques() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStatsGlobales().then(setStats);
  }, []);

  return (
    <div>
      <PageHeader
        title="Statistiques"
        subtitle="Suivi analytique de la sensibilisation Qualité & Sécurité au sein de l'organisation."
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">
            Progression par département
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.progressionParDepartement || []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="departement"
                  tick={{ fontSize: 11, fill: "#64748b" }}
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
                <Bar
                  dataKey="progression"
                  fill="#0e4d92"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-800 mb-4">
            Répartition des modules par thématique
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={repartitionModules}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {repartitionModules.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold text-slate-800 mb-4">
          Évolution mensuelle des formations complétées
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats?.evolutionMensuelle || []}>
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
              <Bar dataKey="completions" fill="#f5821f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
