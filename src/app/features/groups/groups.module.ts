import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupAddComponent } from './group-add/group-add.component';

@NgModule({
  declarations: [GroupListComponent, GroupAddComponent],
  imports: [CommonModule, SharedModule, GroupsRoutingModule]
})
export class GroupsModule {}
