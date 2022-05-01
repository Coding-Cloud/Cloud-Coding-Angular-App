import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UserSearchDialogComponent } from './user-search-dialog/user-search-dialog.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserSearchDialogComponent],
  imports: [CommonModule, SharedModule, UsersRoutingModule]
})
export class UsersModule {}
