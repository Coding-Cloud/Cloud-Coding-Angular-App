import { CodeSocketService } from '../../../../services/code-socket.service';
import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
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

  iconChevronName = 'chevron_left';

  panelOpenState = false;

  playersConnected$: Observable<string[]> | undefined;

  constructor(private codeSocketService: CodeSocketService) {}

  ngOnInit(): void {
    this.playersConnected$ = this.codeSocketService.listenPlayerConnected();
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
