const PDFDocument = require("pdfkit");
const path = require("path");
const { signataires } = require("../config/env");

const LOGO_PATH = path.join(
  __dirname,
  "..",
  "..",
  "assets",
  "logo-onetech.png",
);
const BLEU = "#0e4d92";
const ORANGE = "#f5821f";
const GRIS = "#64748b";

/**
 * Génère le PDF de l'attestation et le renvoie sous forme de flux (stream) directement
 * dans la réponse HTTP fournie (res). Le contrôleur se charge des en-têtes de réponse.
 */
function genererPdfAttestation({ utilisateur, module, numero }, res) {
  const doc = new PDFDocument({ size: "A4", margin: 60 });
  doc.pipe(res);

  // Bandeau supérieur orange
  doc.rect(0, 0, doc.page.width, 10).fill(ORANGE);

  // En-tête société
  try {
    doc.image(LOGO_PATH, 60, 40, { width: 60 });
  } catch (e) {
    // Le logo est optionnel : si absent, on continue sans bloquer la génération.
  }
  doc
    .fillColor(BLEU)
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("OneTech Business Solution", 135, 50)
    .fontSize(9)
    .fillColor(GRIS)
    .font("Helvetica")
    .text(
      "Plateforme de sensibilisation Qualité & Sécurité de l'Information",
      135,
      68,
    );

  doc
    .fontSize(8)
    .fillColor(GRIS)
    .text(`N° Certificat : ${numero}`, 0, 50, { align: "right" });

  // Titre
  doc.moveDown(4);
  doc
    .fontSize(10)
    .fillColor(ORANGE)
    .font("Helvetica-Bold")
    .text("ATTESTATION DE PARTICIPATION", {
      align: "center",
      characterSpacing: 2,
    });
  doc.moveDown(0.5);
  doc
    .fontSize(22)
    .fillColor(BLEU)
    .font("Helvetica-Bold")
    .text("Certificat de sensibilisation", { align: "center" });

  // Corps
  doc.moveDown(2.5);
  doc
    .fontSize(11)
    .fillColor(GRIS)
    .font("Helvetica")
    .text("Ce certificat est décerné à", { align: "center" });
  doc.moveDown(0.4);
  doc
    .fontSize(16)
    .fillColor("#0f1b2b")
    .font("Helvetica-Bold")
    .text(utilisateur.nom, { align: "center" });
  doc.moveDown(0.8);

  const categorieLabel =
    module.categorie === "ISO 9001"
      ? "Qualité (ISO 9001)"
      : module.categorie === "ISO 27001"
        ? "Sécurité de l'Information (ISO 27001)"
        : "Sécurité SSI";

  doc
    .fontSize(11)
    .fillColor("#334155")
    .font("Helvetica")
    .text(
      `pour avoir suivi avec succès le module « ${module.titre} », d'une durée de ${module.duree}, ` +
        `dans le cadre du programme de sensibilisation à la ${categorieLabel}.`,
      { align: "center", width: doc.page.width - 160, lineGap: 4 },
    );

  doc.moveDown(1);
  doc
    .fontSize(9)
    .fillColor(GRIS)
    .text(
      `Délivré le ${new Date().toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}`,
      { align: "center" },
    );

  // Signatures
  const yLigne = doc.page.height - 180;
  doc
    .moveTo(60, yLigne)
    .lineTo(doc.page.width - 60, yLigne)
    .strokeColor("#e2e8f0")
    .stroke();

  const colWidth = (doc.page.width - 120) / 2;

  doc
    .fontSize(8)
    .fillColor(GRIS)
    .font("Helvetica")
    .text("DRH", 60, yLigne + 20, {
      width: colWidth,
      align: "center",
      characterSpacing: 1,
    });
  doc
    .fontSize(11)
    .fillColor("#0f1b2b")
    .font("Helvetica-Bold")
    .text(signataires.drh, 60, yLigne + 70, {
      width: colWidth,
      align: "center",
    });
  doc
    .moveTo(60 + colWidth / 2 - 60, yLigne + 65)
    .lineTo(60 + colWidth / 2 + 60, yLigne + 65)
    .strokeColor("#cbd5e1")
    .stroke();

  doc
    .fontSize(8)
    .fillColor(GRIS)
    .font("Helvetica")
    .text("DIRECTEUR GÉNÉRAL", 60 + colWidth, yLigne + 20, {
      width: colWidth,
      align: "center",
      characterSpacing: 1,
    });
  doc
    .fontSize(11)
    .fillColor("#0f1b2b")
    .font("Helvetica-Bold")
    .text(signataires.directeurGeneral, 60 + colWidth, yLigne + 70, {
      width: colWidth,
      align: "center",
    });
  doc
    .moveTo(60 + colWidth + colWidth / 2 - 60, yLigne + 65)
    .lineTo(60 + colWidth + colWidth / 2 + 60, yLigne + 65)
    .strokeColor("#cbd5e1")
    .stroke();

  doc.end();
}

module.exports = { genererPdfAttestation };
