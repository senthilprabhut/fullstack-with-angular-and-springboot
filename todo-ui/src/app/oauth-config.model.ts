import { AuthConfig } from 'angular-oauth2-oidc';

/* -------------- OKTA AUTHORIZATION CONFIGURATION ------------ */
export const oauthConfig: AuthConfig = {

  // Authorization Server Issuer URL e.g https://dev-<SOME_NUMBER>.okta.com/oauth2/default
  issuer: 'https://dev-117675.okta.com/oauth2/default',

  // After login, the Authorization Server will redirect to this location
  redirectUri: window.location.origin + '/login',

  // URL of the SPA to redirect the user to after logout
  postLogoutRedirectUri: window.location.origin + '/logout',

  // Registered ClientID in the Authorization Server. No Client Secret Required
  clientId: '${OAUTH_CLIENT_ID}',

  // Use Authorization Code with PKCE
  responseType: 'code',

  // set the scope for the permissions the client should request
  scope: 'openid profile email',

  showDebugInformation: true

  // Disable PKCE. Not recommended
  // disablePKCI: true,

};
