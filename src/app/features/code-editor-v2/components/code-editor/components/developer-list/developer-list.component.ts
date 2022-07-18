import { CodeSocketService } from '../../../../services/code-socket.service';
import { BehaviorSubject } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { GetProjectService } from '../../../../services/project-api/get-project.service';
import { groupViewLink } from '../../../../../groups/groups-routing.module';
import { CameraCallInitService } from '../../../../services/camera-call/camera-call-init.service';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperListComponent implements OnInit {
  @ViewChild('collapsible') public collapsible:
    | ElementRef<HTMLButtonElement>
    | undefined;

  @ViewChild('collapsed') public collapsed:
    | ElementRef<HTMLDivElement>
    | undefined;

  @Input() projectUniqueName: string | undefined;

  groupId: string | undefined;

  iconChevronName = 'chevron_left';

  panelOpenState = false;

  conversationId: string | undefined;

  playersConnected$: BehaviorSubject<string[]> = new BehaviorSubject(Array());

  groupViewLink = groupViewLink;

  constructor(
    private codeSocketService: CodeSocketService,
    private router: Router,
    private getProjectService: GetProjectService,
    private cd: ChangeDetectorRef,
    private cameraCallInitService: CameraCallInitService
  ) {}

  ngOnInit(): void {
    if (this.projectUniqueName) {
      this.codeSocketService.listenPlayerConnected().subscribe((data) => {
        this.playersConnected$.next(data);
      });
      this.codeSocketService.sendPingToSayCanReceiveDevelopers(
        this.projectUniqueName
      );

      this.getProjectService
        .getProjectIdByUniqueName(this.projectUniqueName)
        .subscribe((project) => {
          this.groupId = project.groupId;
          this.cd.markForCheck();
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

  handleOpenCameraConv() {
    if (this.projectUniqueName)
      this.cameraCallInitService.initCameraCall(this.projectUniqueName);
  }
}
