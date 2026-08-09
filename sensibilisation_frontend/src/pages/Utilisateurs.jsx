import { useEffect, useState } from "react";
import { Search, UserPlus, MoreVertical } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import PageHeader from "../components/ui/PageHeader";
import { getUtilisateurs } from "../services/api";

export default function Utilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    getUtilisateurs().then(setUtilisateurs);
  }, []);

  const filtres = utilisateurs.filter((u) =>
    `${u.nom} ${u.departement} ${u.role}`
      .toLowerCase()
      .includes(recherche.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="Gestion des utilisateurs"
        subtitle="Suivez l'engagement des collaborateurs dans le parcours de sensibilisation."
        action={
          <Button variant="accent" icon={UserPlus}>
            Ajouter un utilisateur
          </Button>
        }
      />

      <Card padded={false}>
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 max-w-sm">
            <Search size={16} className="text-slate-400" />
            <input
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher un utilisateur..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="px-5 py-3 font-medium">Collaborateur</th>
                <th className="px-5 py-3 font-medium">Département</th>
                <th className="px-5 py-3 font-medium">Rôle</th>
                <th className="px-5 py-3 font-medium">Progression</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtres.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold flex items-center justify-center shrink-0">
                        {u.nom
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{u.nom}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">
                    {u.departement}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{u.role}</td>
                  <td className="px-5 py-3.5 w-40">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={u.progression} height="h-1.5" />
                      <span className="text-xs text-slate-500 shrink-0">
                        {u.progression}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge color={u.statut === "actif" ? "vert" : "gris"}>
                      {u.statut === "actif" ? "Actif" : "Inactif"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
