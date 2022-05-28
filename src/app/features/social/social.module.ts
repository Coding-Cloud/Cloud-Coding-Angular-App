import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SocialRoutingModule } from './social-routing.module';
import { SocialHomeComponent } from './social-home/social-home.component';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { CommentsModule } from './comments/comments.module';

@NgModule({
  declarations: [SocialHomeComponent],
  imports: [
    SharedModule,
    CommonModule,
    SocialRoutingModule,
    CommentsModule,
    UsersModule,
    ProjectsModule
  ]
})
export class SocialModule {}
