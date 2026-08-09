import { utilisateurConnecte, signataires } from "../../data/mockData";

/**
 * Rendu visuel d'une attestation de participation, au format "document imprimable".
 * Utilisé dans une modale de prévisualisation et pour l'export PDF (impression navigateur).
 */
export default function CertificateTemplate({ module }) {
  const dateDuJour = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const numeroCertificat = `OTBS-${module.id.toUpperCase()}-${new Date().getFullYear()}`;

  return (
    <div className="bg-white w-full max-w-3xl mx-auto p-10 sm:p-14 border border-slate-200 rounded-xl shadow-sm relative overflow-hidden">
      {/* Bandeau décoratif */}
      <div className="absolute top-0 left-0 right-0 h-2 accent-gradient" />
      <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-primary-50" />

      {/* En-tête société */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl border border-slate-200 flex items-center justify-center p-2">
            <img
              src="/logo-onetech.png"
              alt="OneTech Business Solution"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="font-display font-bold text-slate-900 leading-tight">
              OneTech Business Solution
            </p>
            <p className="text-xs text-slate-500">
              Plateforme de sensibilisation Qualité & Sécurité de l'Information
            </p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[11px] text-slate-400">N° Certificat</p>
          <p className="text-xs font-semibold text-slate-600">
            {numeroCertificat}
          </p>
        </div>
      </div>

      {/* Titre */}
      <div className="text-center mb-10 relative">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase mb-2">
          Attestation de participation
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary-900">
          Certificat de sensibilisation
        </h1>
      </div>

      {/* Corps */}
      <div className="text-center mb-10 relative">
        <p className="text-slate-500 text-sm mb-1">
          Ce certificat est décerné à
        </p>
        <p className="font-display text-xl font-bold text-slate-900 mb-4">
          {utilisateurConnecte.nom}
        </p>
        <p className="text-slate-600 text-sm leading-relaxed max-w-xl mx-auto">
          pour avoir suivi avec succès le module{" "}
          <span className="font-semibold text-slate-800">
            « {module.titre} »
          </span>
          , d'une durée de {module.duree}, dans le cadre du programme de
          sensibilisation à la{" "}
          {module.categorie === "ISO 9001"
            ? "Qualité (ISO 9001)"
            : module.categorie === "ISO 27001"
              ? "Sécurité de l'Information (ISO 27001)"
              : "Sécurité SSI"}
          .
        </p>
        <p className="text-xs text-slate-400 mt-4">Délivré le {dateDuJour}</p>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-200 relative">
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-8">
            {signataires.drh.fonction}
          </p>
          <div className="border-t border-slate-300 pt-2 max-w-[160px] mx-auto">
            <p className="text-sm font-semibold text-slate-800">
              {signataires.drh.nom}
            </p>
            <p className="text-[11px] text-slate-400">Signature</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-8">
            {signataires.directeurGeneral.fonction}
          </p>
          <div className="border-t border-slate-300 pt-2 max-w-[160px] mx-auto">
            <p className="text-sm font-semibold text-slate-800">
              {signataires.directeurGeneral.nom}
            </p>
            <p className="text-[11px] text-slate-400">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}
