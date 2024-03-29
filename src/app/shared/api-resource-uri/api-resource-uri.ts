import { environment as env } from '../../../environments/environment';

export const API_RESOURCE_URI = {
  // Auth
  AUTH: `${env.apiUrl}/auth`,
  AUTH_ME: `${env.apiUrl}/auth/me`,
  AUTH_PASSWORD: `${env.apiUrl}/auth/password`,
  AUTH_SIGNIN: `${env.apiUrl}/auth/signin`,
  AUTH_SIGNOUT: `${env.apiUrl}/auth/logout`,
  AUTH_SIGNUP: `${env.apiUrl}/auth/signup`,
  COMMENTS: `${env.apiUrl}/comments`,
  COMMENTS_PROJECT: `${env.apiUrl}/comments/project`,
  COMMENTS_USER: `${env.apiUrl}/comments/user`,
  CONVERSATIONS: `${env.apiUrl}/conversations`,
  CONVERSATIONS_FRIENDSHIP: `${env.apiUrl}/conversations/friendship`,
  CONVERSATIONS_GROUP: `${env.apiUrl}/conversations/group`,
  CONVERSATION_SOCKET: `${env.socketUrl}/social-network`,
  FOLLOWERS_FOLLOWERS: (userId: string) =>
    `${env.apiUrl}/followers/${userId}/followers`,
  FOLLOWERS_FOLLOWINGS: (userId: string) =>
    `${env.apiUrl}/followers/${userId}/followings`,
  FOLLOWERS_IS_FOLLOWING: (userId: string) =>
    `${env.apiUrl}/followers/${userId}/is-following`,
  FOLLOWERS_FOLLOW: `${env.apiUrl}/followers`,
  GROUP_MEMBERSHIPS: (groupId: string, userId: string) =>
    `${env.apiUrl}/group-memberships/${groupId}/${userId}`,
  FRIEND_REQUESTS: `${env.apiUrl}/friend-requests`,
  FRIEND_REQUESTS_SEND: `${env.apiUrl}/friend-requests/send`,
  FRIEND_REQUESTS_ACCEPT: `${env.apiUrl}/friend-requests/accept`,
  FRIEND_REQUESTS_CANCEL: `${env.apiUrl}/friend-requests/cancel`,
  FRIEND_REQUESTS_REJECT: `${env.apiUrl}/friend-requests/reject`,
  FRIEND_REQUESTS_RECEIVED: `${env.apiUrl}/friend-requests/received`,
  FRIEND_REQUESTS_SENT: `${env.apiUrl}/friend-requests/sent`,
  FRIENDSHIPS: `${env.apiUrl}/friendships`,
  GROUP_MEMBERSHIPS_GROUP: `${env.apiUrl}/group-memberships/group`,
  GROUP_MEMBERSHIPS_USER: `${env.apiUrl}/group-memberships/user`,
  GROUPS: `${env.apiUrl}/groups`,
  GROUPS_MEMBER: `${env.apiUrl}/groups/member`,
  GROUPS_OWNED: `${env.apiUrl}/groups/owned`,
  MESSAGES: `${env.apiUrl}/messages`,
  PROJECTS: `${env.apiUrl}/projects`,
  PROJECTS_OWNED: `${env.apiUrl}/projects/owned`,
  PROJECTS_JOINED: `${env.apiUrl}/projects/joined`,
  PROJECTS_SEARCH: `${env.apiUrl}/projects/search`,
  PROJECTS_USER: (userId: string) =>
    `${env.apiUrl}/projects/${userId}/projects`,
  PROJECTS_GROUP: `${env.apiUrl}/projects/group`,
  PROJECTS_UPDATE_GROUP: (projectId: string, groupId: string) =>
    `${env.apiUrl}/projects/${projectId}/${groupId}`,
  PROJECTS_REMOVE_GROUP: (projectId: string) =>
    `${env.apiUrl}/projects/${projectId}/remove-group`,
  PROJECTS_NAME: (projectId: string) =>
    `${env.apiUrl}/projects/${projectId}/name`,
  USERNAME: (id: string) => `${env.apiUrl}/users/${id}/name`,
  USERS: `${env.apiUrl}/users`,
  USERS_SEARCH: `${env.apiUrl}/users/search`
};
