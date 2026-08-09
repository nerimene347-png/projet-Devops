import { useEffect, useState } from "react";
import { Award, Download, Eye, X } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import CertificateTemplate from "../components/ui/CertificateTemplate";
import { getModules } from "../services/api";

export default function Attestations() {
  const [terminees, setTerminees] = useState([]);
  const [apercu, setApercu] = useState(null);

  useEffect(() => {
    getModules().then((data) =>
      setTerminees(data.filter((m) => m.statut === "termine")),
    );
  }, []);

  const imprimer = () => window.print();

  return (
    <div>
      <PageHeader
        title="Mes attestations"
        subtitle="Téléchargez vos attestations de participation, signées par la DRH et le Directeur Général."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {terminees.map((m) => (
          <Card key={m.id} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl accent-gradient text-white flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div className="flex-1">
              <Badge
                color={m.categorie === "ISO 27001" ? "orange" : "bleu"}
                className="mb-1.5"
              >
                {m.categorie}
              </Badge>
              <p className="font-semibold text-slate-800 leading-snug">
                {m.titre}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Attestation générée automatiquement
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                onClick={() => setApercu(m)}
              >
                Aperçu
              </Button>
            </div>
          </Card>
        ))}
        {terminees.length === 0 && (
          <p className="text-slate-500 text-sm">
            Aucune attestation pour le moment. Terminez un module pour en
            obtenir une.
          </p>
        )}
      </div>

      {/* Modale de prévisualisation / impression du certificat */}
      {apercu && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-slate-900/60 p-4 overflow-y-auto print:bg-white print:p-0">
          <div className="w-full max-w-3xl my-8 print:my-0">
            <div className="flex justify-end gap-2 mb-3 print:hidden">
              <Button
                variant="accent"
                size="sm"
                icon={Download}
                onClick={imprimer}
              >
                Télécharger en PDF
              </Button>
              <button
                onClick={() => setApercu(null)}
                className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>
            <CertificateTemplate module={apercu} />
          </div>
        </div>
      )}
    </div>
  );
}
