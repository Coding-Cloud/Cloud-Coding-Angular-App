import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UserSearchDialogComponent } from './user-search-dialog/user-search-dialog.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserViewComponent } from './user-view/user-view.component';

@NgModule({
  declarations: [UserSearchDialogComponent, UserViewComponent],
  imports: [CommonModule, SharedModule, UsersRoutingModule]
})
export class UsersModule {}
