import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersService } from '../../features/social/users/users.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  transform(userId?: string, ..._args: unknown[]): Observable<string> {
    if (!userId) {
      return of('');
    }
    return this.usersService
      .getUsername(userId)
      .pipe(map((user) => user.username));
  }
}
