import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CodeSocketService } from '../../../../services/code-socket.service';
import { ProjectVersionsService } from '../../../../services/project-api/project-versions.service';
import { GetProjectService } from '../../../../services/project-api/get-project.service';

@Component({
  selector: 'app-code-versioning',
  templateUrl: './code-versioning.component.html',
  styleUrls: ['./code-versioning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeVersioningComponent implements OnInit {
  @ViewChild('collapsible') public collapsible:
    | ElementRef<HTMLInputElement>
    | undefined;

  @ViewChild('collapsed') public collapsed:
    | ElementRef<HTMLDivElement>
    | undefined;

  @Input() projectUniqueName: string | undefined;

  iconChevronName = 'chevron_left';

  panelOpenState = false;

  playersConnected$: BehaviorSubject<string[]> = new BehaviorSubject(Array());

  projectVersions$: BehaviorSubject<string[]> = new BehaviorSubject(Array());

  projectId: string | undefined;

  constructor(
    private codeSocketService: CodeSocketService,
    private projectVersionsService: ProjectVersionsService,
    private getProjectService: GetProjectService
  ) {}

  ngOnInit(): void {
    if (this.projectUniqueName) {
      this.projectVersionsService
        .getProjectVersions({ projectUniqueName: this.projectUniqueName })
        .subscribe((data) => {
          this.projectVersions$.next(data);
        });

      this.codeSocketService.sendPingToSayCanReceiveDevelopers(
        this.projectUniqueName
      );

      this.getProjectService
        .getProjectIdByUniqueName(this.projectUniqueName)
        .subscribe((projectId) => {
          this.projectId = projectId;
        });
    }
  }

  handleClickOnCollapse() {
    this.collapsible?.nativeElement.classList.toggle('active');
    console.log(this.collapsed?.nativeElement.style.display);
    if (
      this.collapsed?.nativeElement.style.display !== 'block' &&
      this.collapsed
    ) {
      this.collapsed.nativeElement.style.display = 'block';
      this.iconChevronName = 'expand_more';
    } else if (this.collapsed) {
      this.collapsed.nativeElement.style.display = 'none';
      this.iconChevronName = 'chevron_left';
    }
  }

  handleClickRollback(indexVersion: number) {
    if (!this.projectUniqueName || !this.projectId) return;

    const numberVersionRollback =
      this.projectVersions$.value.length - indexVersion;
    console.log(indexVersion);
    this.projectVersionsService.changeProjectVersion({
      projectId: this.projectId,
      numberVersionRollback
    });
  }

  handleClickAddVersion(inputValue: string) {
    if (!this.projectUniqueName || !this.projectId) return;
    console.log(inputValue);
    this.projectVersionsService.addProjectVersion({
      projectId: this.projectId,
      title: inputValue
    });
  }
}
