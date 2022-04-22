import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  declarations: [GroupListComponent],
  imports: [CommonModule, SharedModule, GroupsRoutingModule]
})
export class GroupsModule {}
