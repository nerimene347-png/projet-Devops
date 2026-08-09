import { getToken, clearSession } from "./authStorage";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body, isBlob = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    clearSession();
    if (window.location.pathname !== "/login") window.location.href = "/login";
    throw new Error("Session expirée. Veuillez vous reconnecter.");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      data.message || `Erreur ${res.status} lors de l'appel à ${path}`,
    );
  }

  if (isBlob) return res.blob();
  if (res.status === 204) return null;
  return res.json();
}

// --- Auth ---
export function login(username, password) {
  return request("/auth/login", {
    method: "POST",
    body: { username, password },
  });
}
export function getCurrentUser() {
  return request("/auth/me");
}

// --- Modules ---
export function getModules() {
  return request("/modules");
}
export function getModuleById(id) {
  return request(`/modules/${id}`);
}
export function updateModuleProgression(id, { progression, statut }) {
  return request(`/modules/${id}/progression`, {
    method: "PATCH",
    body: { progression, statut },
  });
}

// --- Quiz ---
export function getQuizByModuleId(moduleId) {
  return request(`/quizzes?moduleId=${moduleId}`);
}
export function getQuizById(id) {
  return request(`/quizzes/${id}`);
}
export function submitQuizResult(quizId, reponses) {
  return request(`/quizzes/${quizId}/submit`, {
    method: "POST",
    body: { reponses },
  });
}

// --- Statistiques ---
export function getStatsGlobales() {
  return request("/statistiques");
}

// --- Utilisateurs ---
export function getUtilisateurs() {
  return request("/utilisateurs");
}
export function changerRoleUtilisateur(id, role) {
  return request(`/utilisateurs/${id}/role`, {
    method: "PATCH",
    body: { role },
  });
}
export function changerStatutUtilisateur(id, statut) {
  return request(`/utilisateurs/${id}/statut`, {
    method: "PATCH",
    body: { statut },
  });
}

// --- Notifications ---
export function getNotifications() {
  return request("/notifications");
}
export function marquerNotificationLue(id) {
  return request(`/notifications/${id}/lu`, { method: "PATCH" });
}

// --- Attestations ---
export function getMesAttestations() {
  return request("/attestations");
}
export async function telechargerAttestationPdf(
  moduleId,
  nomFichier = "attestation.pdf",
) {
  const blob = await request(`/attestations/${moduleId}/pdf`, { isBlob: true });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomFichier;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
