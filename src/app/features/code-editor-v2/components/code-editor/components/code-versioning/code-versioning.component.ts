import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output
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

  @Output() changeVersion = new EventEmitter<void>();

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

      this.codeSocketService
        .listenProjectVersionHasChanged()
        .subscribe((data) => {
          this.projectVersions$.next(data);
          this.changeVersion.emit();
          //console.log('listenProjectVersionHasChanged');
          //console.log(data);
        });

      this.getProjectService
        .getProjectIdByUniqueName(this.projectUniqueName)
        .subscribe((project) => {
          this.projectId = project.projectId;
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
    this.emitEventWhenVersionHasChanged();
    const numberVersionRollback =
      this.projectVersions$.value.length - indexVersion;
    this.projectVersionsService
      .changeProjectVersion({
        projectId: this.projectId,
        numberVersionRollback
      })
      .subscribe(() => {
        this.emitEventWhenVersionHasChanged();
      });
  }

  handleClickAddVersion(inputValue: string) {
    if (!this.projectUniqueName || !this.projectId) return;
    this.emitEventWhenVersionHasChanged();
    //return;
    this.projectVersionsService
      .addProjectVersion({
        projectId: this.projectId,
        title: inputValue
      })
      .subscribe(() => {
        this.emitEventWhenVersionHasChanged();
      });
  }

  emitEventWhenVersionHasChanged(): void {
    if (!this.projectUniqueName) return;
    console.log('emitEventWhenVersionHasChanged');
    this.codeSocketService.changeVersionEvent(this.projectUniqueName);
  }
}
