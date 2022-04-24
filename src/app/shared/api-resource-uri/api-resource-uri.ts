import { environment as env } from '../../../environments/environment';

export const API_RESOURCE_URI = {
  // Auth
  AUTH_SIGNIN: `${env.apiUrl}/auth/signin`,
  AUTH_SIGNUP: `${env.apiUrl}/auth/signup`,
  AUTH_SIGNOUT: `${env.apiUrl}/auth/signout`,
  AUTH_ME: `${env.apiUrl}/auth/me`,
  GROUPS: `${env.apiUrl}/groups`,
  PROJECTS: `${env.apiUrl}/projects`,
  PROJECTS_OWNED: `${env.apiUrl}/projects/owned`,
  MESSAGES: `${env.apiUrl}/messages`,
  USERS: `${env.apiUrl}/users`,
  USERNAME: (id: string) => `${env.apiUrl}/users/${id}/name`,
  GROUP_MEMBERSHIP_GROUP_ID: `${env.apiUrl}/group-memberships/group`
};
