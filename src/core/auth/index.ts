import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: '',
  realm: '',
  clientId: ''
});

export const initialConfig = {
  onload: 'login-required'
};
