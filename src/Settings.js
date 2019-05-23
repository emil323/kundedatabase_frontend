/*
*
* For using live API
*    https://dpkdapi.azurewebsites.net
* For using API running locally
*    http://localhost:8080
*
*/

export const API_URL = 'https://dpkdapi.azurewebsites.net'

/* const for ADAL authentication */
export const APP_ID = '36bdb668-3a4e-496d-bb39-b327fcfcaa32'
export const TENANT_ID = 'bc758dd0-ab53-4372-9a7c-e98a9620862c'
export const CALLBACK_URL = window.location.protocol + '//' + window.location.host

/* Const to determine what AD role that qualifies for Admin permissions */
export const ADMIN_ROLE = 'Admin'

/** Default settings */
export const MAX_FILE_PREVIEW_SIZE = 25000000