import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { UserSearchDialogComponent } from './user-search-dialog/user-search-dialog.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserViewComponent } from './user-view/user-view.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    UserSearchDialogComponent,
    UserViewComponent,
    UserSearchComponent
  ],
  exports: [UserSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    MatProgressBarModule
  ]
})
export class UsersModule {}
