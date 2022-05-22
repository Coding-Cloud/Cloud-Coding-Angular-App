import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SocialRoutingModule } from './social-routing.module';
import { SocialHomeComponent } from './social-home/social-home.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [SocialHomeComponent],
  imports: [CommonModule, SharedModule, SocialRoutingModule, UsersModule]
})
export class SocialModule {}
