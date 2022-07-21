import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsContainerComponent } from './settings/settings-container.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  declarations: [SettingsContainerComponent, UserUpdateComponent],
  imports: [CommonModule, SharedModule, SettingsRoutingModule]
})
export class SettingsModule {}
