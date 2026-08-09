const ldap = require("ldapjs");
const { createLdapClient } = require("../config/ldap");
const { ldap: ldapConfig } = require("../config/env");
const ApiError = require("../utils/ApiError");

/**
 * Authentifie un utilisateur auprès d'Active Directory par bind LDAP direct,
 * puis récupère ses informations d'annuaire (nom, email, département).
 *
 * @param {string} username  sAMAccountName (ex: "sarra.benali")
 * @param {string} password  mot de passe du domaine
 * @returns {Promise<{username: string, nom: string, email: string, departement: string}>}
 */
async function authenticateWithActiveDirectory(username, password) {
  if (!username || !password) {
    throw new ApiError(400, "Identifiant et mot de passe requis.");
  }

  const userPrincipalName = ldapConfig.domainSuffix
    ? `${username}@${ldapConfig.domainSuffix}`
    : username;

  // 1) Bind avec les identifiants de l'utilisateur : c'est AD qui valide le mot de passe.
  await bindAs(userPrincipalName, password);

  // 2) Bind avec le compte de service pour rechercher les attributs de l'utilisateur.
  const attributs = await rechercherUtilisateur(username);

  return attributs;
}

function bindAs(bindDN, password) {
  return new Promise((resolve, reject) => {
    const client = createLdapClient();
    client.bind(bindDN, password, (err) => {
      client.unbind();
      if (err) {
        // ldapjs renvoie InvalidCredentialsError pour un mauvais mot de passe
        return reject(
          new ApiError(
            401,
            "Identifiant ou mot de passe Active Directory incorrect.",
          ),
        );
      }
      resolve();
    });
  });
}

function rechercherUtilisateur(username) {
  return new Promise((resolve, reject) => {
    const client = createLdapClient();

    client.bind(ldapConfig.bindDN, ldapConfig.bindPassword, (bindErr) => {
      if (bindErr) {
        client.unbind();
        return reject(
          new ApiError(
            500,
            "Le compte de service LDAP n'a pas pu se connecter à l'annuaire.",
          ),
        );
      }

      const opts = {
        filter: new ldap.EqualityFilter({
          attribute: "sAMAccountName",
          value: username,
        }),
        scope: "sub",
        attributes: [
          "cn",
          "displayName",
          "mail",
          "department",
          "sAMAccountName",
        ],
      };

      const resultats = [];
      client.search(ldapConfig.baseDN, opts, (searchErr, res) => {
        if (searchErr) {
          client.unbind();
          return reject(
            new ApiError(
              500,
              "Erreur lors de la recherche dans l'annuaire AD.",
            ),
          );
        }

        res.on("searchEntry", (entry) =>
          resultats.push(entry.pojo ? entry.pojo.attributes : entry.attributes),
        );
        res.on("error", (err) => {
          client.unbind();
          reject(new ApiError(500, `Erreur LDAP : ${err.message}`));
        });
        res.on("end", () => {
          client.unbind();
          if (resultats.length === 0) {
            return reject(
              new ApiError(
                404,
                "Utilisateur introuvable dans Active Directory.",
              ),
            );
          }
          resolve(mapAttributs(resultats[0], username));
        });
      });
    });
  });
}

// Convertit le format d'attributs ldapjs (tableau de {type, values}) en objet simple
function mapAttributs(attributsLdap, usernameFallback) {
  const get = (name) => {
    const attr = attributsLdap.find((a) => a.type === name);
    return attr && attr.values && attr.values[0] ? attr.values[0] : null;
  };

  return {
    username: (get("sAMAccountName") || usernameFallback).toLowerCase(),
    nom: get("displayName") || get("cn") || usernameFallback,
    email: get("mail") || `${usernameFallback}@onetechbs.com`,
    departement: get("department") || "Non renseigné",
  };
}

module.exports = { authenticateWithActiveDirectory };
