import { AuthConfig } from 'angular-oauth2-oidc';

/* -------------- OKTA AUTHORIZATION CONFIGURATION ------------ */
export const oauthConfig: AuthConfig = {

  // Authorization Server Issuer URL e.g https://dev-<SOME_NUMBER>.okta.com/oauth2/default
  issuer: 'https://dev-117675.okta.com/oauth2/default',

  // After login, the Authorization Server will redirect to this location
  redirectUri: window.location.origin + '/login',

  // URL of the SPA to redirect the user to after logout
  postLogoutRedirectUri: window.location.origin + "/logout",

  // Registered ClientID in the Authorization Server. No Client Secret Required
  clientId: '0oa3e4kbo2qZReMi34x7',

  // Use Authorization Code with PKCE
  responseType: 'code',

  // set the scope for the permissions the client should request
  scope: 'openid profile email',

  showDebugInformation: true

  // Disable PKCE. Not recommended
  // disablePKCI: true,

};

// export class MyAlbumsResourceConfig {
//   static myalbums_resource_uri = 'http://localhost:8081'
//   static albums_uri = `${MyAlbumsResourceConfig.myalbums_resource_uri}/fakealbums/albums`
//   static photos_uri = `${MyAlbumsResourceConfig.myalbums_resource_uri}/fakealbums/mediaItems`
// }