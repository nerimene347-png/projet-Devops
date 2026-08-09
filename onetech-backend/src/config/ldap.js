const ldap = require("ldapjs");
const { ldap: ldapConfig } = require("./env");

/**
 * Crée un nouveau client LDAP connecté au contrôleur de domaine Active Directory.
 * Un nouveau client est créé par tentative d'authentification (pas de pool partagé)
 * pour éviter qu'une session bindée avec les identifiants d'un utilisateur ne « fuite »
 * vers une autre requête.
 */
function createLdapClient() {
  const client = ldap.createClient({
    url: ldapConfig.url,
    timeout: 5000,
    connectTimeout: 5000,
    reconnect: false,
  });

  client.on("error", (err) => {
    // eslint-disable-next-line no-console
    console.error("Erreur de connexion LDAP :", err.message);
  });

  return client;
}

module.exports = { createLdapClient };
