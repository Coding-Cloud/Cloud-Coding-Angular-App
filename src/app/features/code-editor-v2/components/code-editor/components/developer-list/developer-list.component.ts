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

  panelOpenState = false;

  playersConnected$: Observable<string[]> | undefined;

  constructor(private codeSocketService: CodeSocketService) {}

  ngOnInit(): void {
    this.playersConnected$ = this.codeSocketService.listenPlayerConnected();
  }

  handleClickOnCollapse($event: any) {
    console.log($event);
    this.collapsible?.nativeElement.classList.toggle('active');
    const content = this.collapsible?.nativeElement.nextElementSibling;
    if (this.collapsed?.nativeElement.style.display === 'block') {
      this.collapsed.nativeElement.style.display = 'none';
    } else if (this.collapsed) {
      this.collapsed.nativeElement.style.display = 'block';
    }
  }
}
