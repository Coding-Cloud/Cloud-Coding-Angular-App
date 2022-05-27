import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resource-uri';
import {
  Comment,
  CreateComment,
  UpdateComment
} from '../../../shared/models/comment.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getProjectComments(
    projectId: string
  ): Observable<{ comments: Comment[]; totalResults: number }> {
    return of({
      comments: [
        {
          id: '16541',
          projectId: '7b0d1dcb-cb28-436c-83f1-6bc718381d7b',
          ownerId: 'f5367555-5080-4704-b29c-906bd7565fa4',
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'codemirror',
                content: [
                  {
                    type: 'text',
                    text: 'function max(a, b) {\n  return a > b ? a : b\n}'
                  }
                ]
              }
            ]
          }),
          createdAt: new Date()
        },
        {
          id: '1123',
          projectId: '7b0d1dcb-cb28-436c-83f1-6bc718381d7b',
          ownerId: '650803f3-078b-4852-9959-7d29199120ab',
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'codemirror',
                content: [
                  {
                    type: 'text',
                    text: 'function max(a, b) {\n  return a > b ? a : b\n}'
                  }
                ]
              }
            ]
          }),
          createdAt: new Date()
        }
      ],
      totalResults: 2
    });

    return this.http.get<{ comments: Comment[]; totalResults: number }>(
      API_RESOURCE_URI.COMMENTS_PROJECT + '/' + projectId
    );
  }

  getUserPublicComments(
    userId: string
  ): Observable<{ comments: Comment[]; totalResults: number }> {
    return of({
      comments: [
        {
          id: '16541',
          projectId: '7b0d1dcb-cb28-436c-83f1-6bc718381d7b',
          ownerId: userId,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'codemirror',
                content: [
                  {
                    type: 'text',
                    text: 'function max(a, b) {\n  return a > b ? a : b\n}'
                  }
                ]
              }
            ]
          }),
          createdAt: new Date()
        },
        {
          id: '1123',
          projectId: '7b0d1dcb-cb28-436c-83f1-6bc718381d7b',
          ownerId: userId,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'codemirror',
                content: [
                  {
                    type: 'text',
                    text: 'function max(a, b) {\n  return a > b ? a : b\n}'
                  }
                ]
              }
            ]
          }),
          createdAt: new Date()
        }
      ],
      totalResults: 2
    });

    return this.http.get<{ comments: Comment[]; totalResults: number }>(
      API_RESOURCE_URI.COMMENTS_USER + '/' + userId
    );
  }

  addComment(comment: CreateComment): Observable<string> {
    return of(uuidv4());
    return this.http.post(
      API_RESOURCE_URI.COMMENTS,
      { ...comment },
      { responseType: 'text' }
    );
  }

  updateComment(comment: UpdateComment): Observable<void> {
    return of();
    return this.http.put<void>(API_RESOURCE_URI.COMMENTS, { ...comment });
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(API_RESOURCE_URI.COMMENTS + '/' + commentId);
  }
}
