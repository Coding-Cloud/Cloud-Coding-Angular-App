import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  emptyProject,
  Project,
  ProjectStatus
} from '../../../../shared/models/project.model';
import { navigation } from '../../../../app-routing.module';
import { projectsNavigation } from '../../projects-routing.module';

@Component({
  selector: 'cc-project-view-card',
  templateUrl: './project-view-card.component.html',
  styleUrls: ['./project-view-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectViewCardComponent {
  @Input() project: Project = emptyProject;

  projectsLinks = projectsNavigation;

  projectStatus = ProjectStatus;

  navigation = navigation;
}
