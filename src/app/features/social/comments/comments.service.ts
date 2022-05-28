import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_RESOURCE_URI } from '../../../shared/api-resource-uri/api-resource-uri';
import {
  Comment,
  CreateComment,
  UpdateComment
} from '../../../shared/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getProjectComments(
    projectId: string
  ): Observable<{ comments: Comment[]; totalResults: number }> {
    return this.http.get<{ comments: Comment[]; totalResults: number }>(
      API_RESOURCE_URI.COMMENTS_PROJECT + '/' + projectId
    );
  }

  getUserPublicComments(
    userId: string
  ): Observable<{ comments: Comment[]; totalResults: number }> {
    return this.http.get<{ comments: Comment[]; totalResults: number }>(
      API_RESOURCE_URI.COMMENTS_USER + '/' + userId
    );
  }

  addComment(comment: CreateComment): Observable<string> {
    return this.http.post(
      API_RESOURCE_URI.COMMENTS,
      { ...comment },
      { responseType: 'text' }
    );
  }

  updateComment(comment: UpdateComment): Observable<void> {
    return this.http.patch<void>(API_RESOURCE_URI.COMMENTS + '/' + comment.id, {
      ...comment
    });
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(API_RESOURCE_URI.COMMENTS + '/' + commentId);
  }
}
