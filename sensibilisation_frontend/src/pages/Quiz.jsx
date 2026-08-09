import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { quizzes } from "../data/mockData";

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [reponses, setReponses] = useState({});
  const [valide, setValide] = useState(false);

  useEffect(() => {
    setQuiz(quizzes.find((q) => q.id === id) || quizzes[0]);
  }, [id]);

  if (!quiz) return <p className="text-slate-500">Chargement du quiz…</p>;

  const choisir = (questionId, index) => {
    if (valide) return;
    setReponses((prev) => ({ ...prev, [questionId]: index }));
  };

  const score = quiz.questions.reduce(
    (acc, q) => acc + (reponses[q.id] === q.bonneReponse ? 1 : 0),
    0,
  );
  const pourcentage = Math.round((score / quiz.questions.length) * 100);
  const reussi = pourcentage >= quiz.seuilReussite;
  const toutesRepondues = quiz.questions.every(
    (q) => reponses[q.id] !== undefined,
  );

  const recommencer = () => {
    setReponses({});
    setValide(false);
  };

  return (
    <div className="max-w-3xl">
      <Link
        to="/modules"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-700 mb-5"
      >
        <ArrowLeft size={16} /> Retour
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 mb-1">{quiz.titre}</h1>
      <p className="text-slate-500 mb-6">
        {quiz.questions.length} questions • Seuil de réussite :{" "}
        {quiz.seuilReussite}%
      </p>

      {valide && (
        <Card
          className={`mb-6 ${reussi ? "bg-primary-50 border-primary-100" : "bg-red-50 border-red-100"}`}
        >
          <div className="flex items-center gap-4">
            {reussi ? (
              <CheckCircle2 className="text-primary-700" size={32} />
            ) : (
              <XCircle className="text-red-500" size={32} />
            )}
            <div>
              <p className="font-semibold text-slate-800">
                {reussi ? "Quiz réussi !" : "Quiz non validé"}
              </p>
              <p className="text-sm text-slate-500">
                Score : {score}/{quiz.questions.length} ({pourcentage}%)
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-5">
        {quiz.questions.map((q, qi) => (
          <Card key={q.id}>
            <p className="font-semibold text-slate-800 mb-4">
              {qi + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.choix.map((choix, i) => {
                const estChoisi = reponses[q.id] === i;
                const estCorrecte = i === q.bonneReponse;
                let style = "border-slate-200 hover:border-primary-300";
                if (valide) {
                  if (estCorrecte) style = "border-primary-500 bg-primary-50";
                  else if (estChoisi) style = "border-red-300 bg-red-50";
                } else if (estChoisi) {
                  style = "border-primary-500 bg-primary-50";
                }
                return (
                  <button
                    key={i}
                    onClick={() => choisir(q.id, i)}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors flex items-center justify-between ${style}`}
                  >
                    {choix}
                    {valide && estCorrecte && (
                      <CheckCircle2
                        size={16}
                        className="text-primary-600 shrink-0"
                      />
                    )}
                    {valide && estChoisi && !estCorrecte && (
                      <XCircle size={16} className="text-red-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        {valide ? (
          <Button variant="outline" icon={RotateCcw} onClick={recommencer}>
            Recommencer
          </Button>
        ) : (
          <Button
            variant="accent"
            disabled={!toutesRepondues}
            onClick={() => setValide(true)}
          >
            Valider mes réponses
          </Button>
        )}
      </div>
    </div>
  );
}
