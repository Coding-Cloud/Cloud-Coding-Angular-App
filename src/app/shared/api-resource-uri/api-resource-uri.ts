import { environment as env } from '../../../environments/environment';

export const API_RESOURCE_URI = {
  // Auth
  LOGIN: `${env.apiUrl}/auth/login`,
  REGISTER: `${env.apiUrl}/auth/register`,
  LOGOUT: `${env.apiUrl}/auth/logout`,
  PROJECTS: `${env.apiUrl}/projects`
};
