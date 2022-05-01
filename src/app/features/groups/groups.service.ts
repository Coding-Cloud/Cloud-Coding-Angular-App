import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_RESOURCE_URI } from '../../shared/api-resource-uri/api-resource-uri';
import { Observable } from 'rxjs';
import {
  Group,
  GroupForm,
  GroupMembership
} from '../../shared/models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  getOwnedGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(API_RESOURCE_URI.GROUPS_OWNED);
  }

  getJoinedGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(API_RESOURCE_URI.GROUPS_MEMBER);
  }

  addGroup(group: GroupForm): Observable<string> {
    return this.http.post(
      API_RESOURCE_URI.GROUPS,
      { ...group },
      { responseType: 'text' }
    );
  }

  updateGroup(groupId: string, group: GroupForm): Observable<any> {
    return this.http.patch<any>(API_RESOURCE_URI.GROUPS + '/' + groupId, {
      ...group
    });
  }

  getGroupMemberships(groupId: string): Observable<GroupMembership[]> {
    return this.http.get<GroupMembership[]>(
      API_RESOURCE_URI.GROUP_MEMBERSHIPS_GROUP + '/' + groupId
    );
  }

  addGroupMembership(groupMembership: GroupMembership): Observable<any> {
    return this.http.post(
      API_RESOURCE_URI.GROUP_MEMBERSHIPS(
        groupMembership.groupId,
        groupMembership.userId
      ),
      { canEdit: groupMembership.canEdit }
    );
  }

  updateGroupMembership(groupMembership: GroupMembership): Observable<any> {
    return this.http.patch(
      API_RESOURCE_URI.GROUP_MEMBERSHIPS(
        groupMembership.groupId,
        groupMembership.userId
      ),
      {
        canEdit: groupMembership.canEdit
      }
    );
  }

  removeGroupMembership(groupMembership: GroupMembership): Observable<any> {
    return this.http.delete(
      API_RESOURCE_URI.GROUP_MEMBERSHIPS(
        groupMembership.groupId,
        groupMembership.userId
      )
    );
  }
  }

  getGroup(groupId: string): Observable<Group> {
    return this.http.get<Group>(API_RESOURCE_URI.GROUPS + '/' + groupId);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete<any>(API_RESOURCE_URI.GROUPS + '/' + groupId);
  }
}
