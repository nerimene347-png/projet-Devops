import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlayCircle, Clock } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import PageHeader from "../components/ui/PageHeader";
import { getModules } from "../services/api";

const CATEGORIES = ["Toutes", "ISO 9001", "ISO 27001", "Sécurité SSI"];

const statutLabel = {
  termine: { label: "Terminé", color: "vert" },
  en_cours: { label: "En cours", color: "orange" },
  non_commence: { label: "À commencer", color: "gris" },
};

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [filtre, setFiltre] = useState("Toutes");

 useEffect(() => {
   getModules()
     .then((data) => {
       console.log("Données reçues :", data);
       setModules(data);
     })
     .catch((error) => {
       console.log("Erreur API :", error);
     });
 }, []);

  const filtres =
    filtre === "Toutes"
      ? modules
      : modules.filter((m) => m.categorie === filtre);

  return (
    <div>
      <PageHeader
        title="Modules e-learning"
        subtitle="Parcourez les modules de formation dédiés à la Qualité et à la Sécurité de l'Information."
      />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFiltre(c)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${filtre === c ? "bg-primary-700 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-primary-300"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtres.map((m) => (
          <Card
            key={m._id}
            className="flex flex-col hover:shadow-md hover:border-primary-300 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <Badge color={m.categorie === "ISO 27001" ? "orange" : "bleu"}>
                {m.categorie}
              </Badge>
              <Badge color={statutLabel[m.statut].color}>
                {statutLabel[m.statut].label}
              </Badge>
            </div>
            <h3 className="font-semibold text-slate-800 leading-snug mb-2">
              {m.titre}
            </h3>
            <p className="text-sm text-slate-500 mb-4 flex-1">
              {m.description}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
              <Clock size={13} /> {m.duree}
            </div>

            <ProgressBar value={m.progression} />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-500">
                {m.progression}% complété
              </span>
              <Link
                to={`/modules/${m.id}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-accent-600"
              >
                <PlayCircle size={16} />
                {m.progression > 0 ? "Continuer" : "Commencer"}
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
