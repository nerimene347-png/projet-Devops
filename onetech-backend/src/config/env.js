require("dotenv").config();

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    // eslint-disable-next-line no-console
    console.warn(`⚠️  Variable d'environnement manquante : ${name}`);
  }
  return value;
}

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",

  mongoUri: required(
    "MONGODB_URI",
    "mongodb://localhost:27017/onetech_bs_sensibilisation",
  ),

  jwtSecret: required("JWT_SECRET", "dev_secret_change_me"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",

  ldap: {
    url: required("LDAP_URL"),
    bindDN: required("LDAP_BIND_DN"),
    bindPassword: required("LDAP_BIND_PASSWORD"),
    baseDN: required("LDAP_BASE_DN"),
    domainSuffix: process.env.LDAP_DOMAIN_SUFFIX || "",
  },

  bootstrapAdmins: (process.env.BOOTSTRAP_ADMIN_USERNAMES || "")
    .split(",")
    .map((u) => u.trim().toLowerCase())
    .filter(Boolean),

  signataires: {
    drh: process.env.SIGNATAIRE_DRH_NOM || "DRH",
    directeurGeneral: process.env.SIGNATAIRE_DG_NOM || "Directeur Général",
  },
};
