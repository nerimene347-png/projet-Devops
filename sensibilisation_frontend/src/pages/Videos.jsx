import { useEffect, useState } from "react";
import { PlayCircle, Clock } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import PageHeader from "../components/ui/PageHeader";
import { getModules } from "../services/api";

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getModules().then((data) =>
      setVideos(data.filter((m) => m.type === "video")),
    );
  }, []);

  return (
    <div>
      <PageHeader
        title="Vidéos de sensibilisation"
        subtitle="Contenus courts et pratiques pour ancrer les bons réflexes au quotidien."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((v) => (
          <Card
            key={v.id}
            padded={false}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gradient-to-br from-primary-900 to-primary-600 flex items-center justify-center relative">
              <button className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-primary-700 hover:scale-105 transition-transform">
                <PlayCircle size={28} />
              </button>
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                <Clock size={11} /> {v.duree}
              </span>
            </div>
            <div className="p-4">
              <Badge color="orange">{v.categorie}</Badge>
              <h3 className="font-semibold text-slate-800 mt-2 leading-snug">
                {v.titre}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{v.description}</p>
            </div>
          </Card>
        ))}
        {videos.length === 0 && (
          <p className="text-slate-500 text-sm">
            Aucune vidéo disponible pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
