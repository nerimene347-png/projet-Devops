import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleRoute from "./components/auth/RoleRoute";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModuleDetail from "./pages/ModuleDetail";
import Quiz from "./pages/Quiz";
import Videos from "./pages/Videos";
import BonnesPratiques from "./pages/BonnesPratiques";
import Statistiques from "./pages/Statistiques";
import Utilisateurs from "./pages/Utilisateurs";
import Notifications from "./pages/Notifications";
import Attestations from "./pages/Attestations";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/modules" element={<Modules />} />
              <Route path="/modules/:id" element={<ModuleDetail />} />
              <Route path="/quiz/:id" element={<Quiz />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/bonnes-pratiques" element={<BonnesPratiques />} />
              <Route path="/statistiques" element={<Statistiques />} />
              <Route
                element={
                  <RoleRoute
                    rolesAutorises={[
                      "Administrateur",
                      "DRH",
                      "Directeur Général",
                    ]}
                  />
                }
              >
                <Route path="/utilisateurs" element={<Utilisateurs />} />
              </Route>
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/attestations" element={<Attestations />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
