import { useEffect, useState } from "react";
import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import { getNotifications } from "../services/api";

const ICONS = {
  info: { icon: Info, tone: "bg-primary-100 text-primary-700" },
  alerte: { icon: AlertTriangle, tone: "bg-accent-100 text-accent-600" },
  succes: { icon: CheckCircle2, tone: "bg-emerald-100 text-emerald-700" },
};

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getNotifications().then(setItems);
  }, []);

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Notifications"
        subtitle="Restez informé des nouveautés et échéances de formation."
      />
      <div className="space-y-3">
        {items.map((n) => {
          const { icon: Icon, tone } = ICONS[n.type];
          return (
            <Card
              key={n.id}
              className={`flex gap-4 ${!n.lu ? "border-primary-200 bg-primary-50/40" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tone}`}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-slate-800">{n.titre}</p>
                  {!n.lu && (
                    <span className="w-2 h-2 rounded-full bg-accent-500 shrink-0" />
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{n.message}</p>
                <p className="text-xs text-slate-400 mt-2">{n.date}</p>
              </div>
            </Card>
          );
        })}
        {items.length === 0 && (
          <p className="text-slate-500 text-sm">Aucune notification.</p>
        )}
      </div>
    </div>
  );
}
