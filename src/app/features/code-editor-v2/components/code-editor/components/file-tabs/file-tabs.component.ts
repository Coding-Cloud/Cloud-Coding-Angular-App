import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { files } from '../../../../../utils/file-icon';
import { extensions } from '../../../../../utils/extension-icon';

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

  constructor() {}

  get icon() {
    if (Object.keys(files).includes(this.filename)) {
      return files[this.filename as keyof typeof files];
    } else {
      let splited = this.filename.split('.');
      while (splited.length > 0) {
        splited = splited.slice(1);
        const ext = splited.join('.');
        if (ext && Object.keys(extensions).includes(ext)) {
          return extensions[ext as keyof typeof extensions];
        }
      }
      return 'file';
    }
  }

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
