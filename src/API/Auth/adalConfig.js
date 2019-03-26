import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
import { CALLBACK_URL } from '../../Settings';

export const adalConfig = {
  instance: 'https://login.microsoftonline.com/',
  tenant: 'bc758dd0-ab53-4372-9a7c-e98a9620862c',
  clientId: '36bdb668-3a4e-496d-bb39-b327fcfcaa32',
  endpoints: {
    api: 'https://graph.microsoft.com',
  },
  redirectUri: CALLBACK_URL,
  cacheLocation: 'localStorage',
  resource: 'https://graph.microsoft.com/'
}
 
export const authContext = new AuthenticationContext(adalConfig);


export const hasRoles = (authContext) => {
  const user = authContext.getCachedUser()
  return user !== null && user.profile !== null && user.profile.roles !== undefined //WTF
} 


export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);
 
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
 