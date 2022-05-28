import { CodeSocketService } from '../../../../services/code-socket.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperListComponent implements OnInit {
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

  constructor(private codeSocketService: CodeSocketService) {}

  ngOnInit(): void {
    if (this.projectUniqueName) {
      this.codeSocketService.listenPlayerConnected().subscribe((data) => {
        this.playersConnected$.next(data);
      });
      this.codeSocketService.sendPingToSayCanReceiveDevelopers(
        this.projectUniqueName
      );
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
}
