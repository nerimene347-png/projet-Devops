import { useEffect, useState } from "react";
import { ShieldCheck, ChevronRight } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import PageHeader from "../components/ui/PageHeader";
import { getModules } from "../services/api";

export default function BonnesPratiques() {
  const [fiches, setFiches] = useState([]);

  useEffect(() => {
    getModules().then((data) =>
      setFiches(data.filter((m) => m.type === "bonne_pratique")),
    );
  }, []);

  return (
    <div>
      <PageHeader
        title="Bonnes pratiques"
        subtitle="Fiches synthétiques à consulter et à appliquer au quotidien."
      />
      <div className="space-y-3 max-w-3xl">
        {fiches.map((f) => (
          <Card
            key={f.id}
            className="flex items-center gap-4 hover:border-primary-300 transition-colors cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div className="flex-1">
              <Badge color="orange" className="mb-1.5">
                {f.categorie}
              </Badge>
              <p className="font-semibold text-slate-800">{f.titre}</p>
              <p className="text-sm text-slate-500">{f.description}</p>
            </div>
            <ChevronRight className="text-slate-300" size={20} />
          </Card>
        ))}
        {fiches.length === 0 && (
          <p className="text-slate-500 text-sm">
            Aucune fiche disponible pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
