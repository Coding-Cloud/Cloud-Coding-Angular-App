import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-editor-picture',
  templateUrl: './editor-picture.component.html',
  styleUrls: ['./editor-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorPictureComponent implements OnInit {
  @Input() code$ = new BehaviorSubject('');
  @Input() type: string | null = null;
  urlPathTrustImage: SafeUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.code$.subscribe(
      (code) =>
        (this.urlPathTrustImage = this.sanitizer.bypassSecurityTrustUrl(
          `data:image/${this.type};base64,${code}`
        ))
    );
  }
}
