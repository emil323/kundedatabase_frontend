import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
import { CALLBACK_URL, TENANT_ID,APP_ID } from '../../Settings';


export const adalConfig = {
  instance: 'https://login.microsoftonline.com/',
  tenant: TENANT_ID,
  clientId: APP_ID,
  endpoints: {
    api: 'https://graph.microsoft.com',
  },
  redirectUri: CALLBACK_URL,
  postLogoutRedirectUri: CALLBACK_URL,
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
 