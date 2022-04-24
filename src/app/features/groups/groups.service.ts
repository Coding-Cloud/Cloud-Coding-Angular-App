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

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(API_RESOURCE_URI.GROUPS);
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

  getGroup(groupId: string): Observable<Group> {
    return this.http.get<Group>(API_RESOURCE_URI.GROUPS + '/' + groupId);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete<any>(API_RESOURCE_URI.GROUPS + '/' + groupId);
  }

  getGroupMemberships(groupId: string): Observable<GroupMembership[]> {
    return this.http.get<GroupMembership[]>(
      API_RESOURCE_URI.GROUP_MEMBERSHIP_GROUP_ID + '/' + groupId
    );
  }
}
