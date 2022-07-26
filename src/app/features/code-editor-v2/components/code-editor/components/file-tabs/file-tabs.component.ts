import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cc-file-tabs',
  templateUrl: './file-tabs.component.html',
  styleUrls: ['./file-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTabsComponent implements OnInit, OnDestroy {
  @Input() openedFile$: Observable<string> | undefined;
  subscriptions: Subscription[] = [];
  filename = '';
  fileIcon = 'description';

  constructor() {}

  ngOnInit(): void {
    if (this.openedFile$) {
      this.subscriptions.push(
        this.openedFile$.subscribe((inputName) => (this.filename = inputName))
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
