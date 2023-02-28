import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'https://auth.orion.messier-g.com.br',
  realm: 'Orion',
  clientId: 'OrionWebClient'
});

export const initialConfig = {
  onload: 'login-required'
};
