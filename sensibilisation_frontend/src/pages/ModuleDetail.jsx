import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  FileText,
  ListChecks,
  Award,
} from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import { getModuleById, getQuizByModuleId } from "../services/api";

export default function ModuleDetail() {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    getModuleById(id).then(setModule);
    getQuizByModuleId(id).then(setQuiz);
  }, [id]);

  if (!module) return <p className="text-slate-500">Chargement du module…</p>;

  return (
    <div className="max-w-4xl">
      <Link
        to="/modules"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-700 mb-5"
      >
        <ArrowLeft size={16} /> Retour aux modules
      </Link>

      <Badge color={module.categorie === "ISO 27001" ? "orange" : "bleu"}>
        {module.categorie}
      </Badge>
      <h1 className="text-2xl font-bold text-slate-900 mt-3 mb-2">
        {module.titre}
      </h1>
      <p className="text-slate-500 mb-6">{module.description}</p>

      {/* Lecteur / contenu */}
      <Card className="mb-5" padded={false}>
        <div className="aspect-video bg-slate-900 rounded-t-[var(--radius-card)] flex items-center justify-center">
          <button className="w-16 h-16 rounded-full accent-gradient flex items-center justify-center text-white hover:scale-105 transition-transform">
            <PlayCircle size={32} />
          </button>
        </div>
        <div className="p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">Contenu de formation</p>
            <p className="text-sm text-slate-500">
              {module.duree} • {module.type}
            </p>
          </div>
          <FileText className="text-slate-400" size={20} />
        </div>
      </Card>

      {/* Progression */}
      <Card className="mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600">Votre progression</span>
          <span className="font-semibold text-slate-800">
            {module.progression}%
          </span>
        </div>
        <ProgressBar value={module.progression} />
      </Card>

      {/* Quiz associé */}
      {quiz && (
        <Card className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
              <ListChecks size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-800">{quiz.titre}</p>
              <p className="text-sm text-slate-500">
                {quiz.nbQuestions} questions • {quiz.dureeMin} min • seuil de
                réussite {quiz.seuilReussite}%
              </p>
            </div>
          </div>
          <Link to={`/quiz/${quiz.id}`}>
            <Button variant="accent">Passer le quiz</Button>
          </Link>
        </Card>
      )}

      {module.progression === 100 && (
        <Card className="mt-5 flex items-center justify-between flex-wrap gap-4 bg-primary-50 border-primary-100">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white text-accent-600 flex items-center justify-center shrink-0">
              <Award size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Module terminé</p>
              <p className="text-sm text-slate-500">
                Votre attestation de participation est disponible.
              </p>
            </div>
          </div>
          <Link to="/attestations">
            <Button variant="primary">Voir l'attestation</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
