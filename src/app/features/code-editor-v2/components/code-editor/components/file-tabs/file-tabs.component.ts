import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { files } from '../../../../../utils/file-icon';
import { extensions } from '../../../../../utils/extension-icon';

@Component({
  selector: 'cc-file-tabs',
  templateUrl: './file-tabs.component.html',
  styleUrls: ['./file-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTabsComponent implements OnInit {
  @Input() openedFile$: BehaviorSubject<string> | undefined;
  filename = '';

  constructor(private cd: ChangeDetectorRef) {}

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
    this.openedFile$?.subscribe((filename) => {
      this.filename = filename;
      this.cd.markForCheck();
    });
  }
}
