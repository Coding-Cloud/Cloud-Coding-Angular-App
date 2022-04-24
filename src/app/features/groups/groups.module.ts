import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupAddComponent } from './group-add/group-add.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupEditComponent } from './group-edit/group-edit.component';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupAddComponent,
    GroupViewComponent,
    GroupEditComponent
  ],
  imports: [CommonModule, SharedModule, GroupsRoutingModule]
})
export class GroupsModule {}
